const cakeStandImageCount = 4;

export const cakeStandImages = Array.from(
  { length: cakeStandImageCount },
  (_, index) => `/production-hub/product-doc-images/cake-stand/cake-stand-${String(index + 1).padStart(3, "0")}.jpg`,
);
