const candleSticksDocumentImageCount = 30;

export const candleSticksDocumentImages = Array.from(
  { length: candleSticksDocumentImageCount },
  (_, index) => `/production-hub/product-doc-images/candle-sticks-docs/candle-sticks-${String(index + 1).padStart(3, "0")}.jpg`,
);
