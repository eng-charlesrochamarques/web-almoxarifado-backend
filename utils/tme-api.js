const crypto = require("node:crypto");

const API_BASE_URL = "https://api.tme.eu";
const DEFAULT_COUNTRY = "DE";
const DEFAULT_LANGUAGE = "EN";
const DEFAULT_CURRENCY = "EUR";

function normalizeTmeProduct(product, priceStockData = {}) {
  const priceProduct = priceStockData.ProductList?.[0] || {};
  const firstPrice = priceProduct.PriceList?.[0] || {};

  return {
    id: `tme-${product.Symbol}`,
    imageUrl: "",
    supplier: "TME",
    manufacturer: product.Producer || "",
    manufacturerPartNumber: product.OriginalSymbol || product.Symbol || "",
    description: product.Description || product.ProductInformationPage || "",
    availability: priceProduct.Amount ?? 0,
    unitPrice: firstPrice.PriceValue ?? 0,
    currency:
      priceStockData.Currency || process.env.TME_CURRENCY || DEFAULT_CURRENCY,
    productUrl: normalizeUrl(product.ProductInformationPage),
  };
}

function selectBestProduct(products, query) {
  const normalizedQuery = normalizePart(query);

  return (
    products.find((product) =>
      [product.Symbol, product.OriginalSymbol, product.CustomerSymbol].some(
        (value) => normalizePart(value) === normalizedQuery,
      ),
    ) || products[0]
  );
}

function signRequest(url, flatParams, appSecret) {
  const signatureBase = [
    "POST",
    percentEncode(url),
    percentEncode(normalizeParams(flatParams)),
  ].join("&");

  return crypto
    .createHmac("sha1", appSecret)
    .update(signatureBase)
    .digest("base64");
}

function normalizeParams(flatParams) {
  return [...flatParams]
    .map(([key, value]) => [percentEncode(key), percentEncode(value)])
    .sort(([leftKey, leftValue], [rightKey, rightValue]) =>
      leftKey === rightKey
        ? leftValue.localeCompare(rightValue)
        : leftKey.localeCompare(rightKey),
    )
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
}

function flattenParams(params) {
  const pairs = [];

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item, index) => pairs.push([`${key}[${index}]`, item]));
    } else {
      pairs.push([key, value]);
    }
  });

  return pairs;
}

function formEncode(flatParams) {
  return flatParams
    .map(([key, value]) => `${percentEncode(key)}=${percentEncode(value)}`)
    .join("&");
}

function percentEncode(value) {
  return encodeURIComponent(String(value ?? "")).replace(
    /[!'()*]/g,
    (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`,
  );
}

function normalizePart(value) {
  return String(value || "")
    .replace(/[\s_-]+/g, "")
    .toUpperCase();
}

function normalizeUrl(value) {
  const url = String(value || "");

  if (url.startsWith("//")) {
    return `https:${url}`;
  }

  return url;
}

function callTme(action, params = {}) {
  const token = process.env.TME_TOKEN;
  const appSecret = process.env.TME_APPLICATION_SECRET;

  if (!token || !appSecret) {
    return Promise.reject(
      new Error("Credenciais da TME nao configuradas no servidor"),
    );
  }

  const url = `${API_BASE_URL}/${action}.json`;
  const requestParams = {
    Token: token,
    Country: process.env.TME_COUNTRY || DEFAULT_COUNTRY,
    Language: process.env.TME_LANGUAGE || DEFAULT_LANGUAGE,
    ...params,
  };

  if (action === "Products/GetPricesAndStocks") {
    requestParams.Currency = process.env.TME_CURRENCY || DEFAULT_CURRENCY;
  }

  const flatParams = flattenParams(requestParams);
  const signature = signRequest(url, flatParams, appSecret);

  flatParams.push(["ApiSignature", signature]);

  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formEncode(flatParams),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      return response.json();
    })
    .then((payload) => {
      if (payload.Status !== "OK") {
        throw new Error(
          payload.Error || payload.Status || "Resposta invalida da TME",
        );
      }

      return payload.Data;
    });
}

function searchTmeProducts(query) {
  return callTme("Products/Search", {
    SearchPlain: query,
    SearchPage: 1,
    SearchWithStock: true,
  }).then((searchData) => {
    const product = selectBestProduct(searchData.ProductList || [], query);

    if (!product) {
      return [];
    }

    return callTme("Products/GetPricesAndStocks", {
      SymbolList: [product.Symbol],
    }).then((priceStockData) => [normalizeTmeProduct(product, priceStockData)]);
  });
}

module.exports = {
  searchTmeProducts,
};
