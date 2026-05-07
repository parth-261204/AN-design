const traysImageCount = 2;

export const traysImages = Array.from(
  { length: traysImageCount },
  (_, index) => `/production-hub/product-doc-images/trays/trays-${String(index + 1).padStart(3, "0")}.jpg`,
);
