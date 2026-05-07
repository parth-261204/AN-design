const furnitureImageCount = 53;

export const furnitureImages = Array.from(
  { length: furnitureImageCount },
  (_, index) => `/production-hub/product-doc-images/furniture/furniture-${String(index + 1).padStart(3, "0")}.jpg`,
);
