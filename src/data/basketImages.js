const basketImageCount = 4;

export const basketImages = Array.from(
  { length: basketImageCount },
  (_, index) => `/production-hub/product-doc-images/basket/basket-${String(index + 1).padStart(3, "0")}.jpg`,
);
