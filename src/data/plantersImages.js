const plantersImageCount = 26;

export const plantersImages = Array.from(
  { length: plantersImageCount },
  (_, index) => `/production-hub/product-doc-images/planters/planters-${String(index + 1).padStart(3, "0")}.jpg`,
);
