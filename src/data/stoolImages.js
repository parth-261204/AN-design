const stoolImageCount = 4;

export const stoolImages = Array.from(
  { length: stoolImageCount },
  (_, index) => `/production-hub/product-doc-images/stool/stool-${String(index + 1).padStart(3, "0")}.jpg`,
);
