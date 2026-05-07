const bowlsImageCount = 28;

export const bowlsImages = Array.from(
  { length: bowlsImageCount },
  (_, index) => `/production-hub/product-doc-images/bowls/bowls-${String(index + 1).padStart(3, "0")}.jpg`,
);
