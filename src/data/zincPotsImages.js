const zincPotsImageCount = 22;

export const zincPotsImages = Array.from(
  { length: zincPotsImageCount },
  (_, index) => `/production-hub/product-doc-images/zinc-pots/zinc-pots-${String(index + 1).padStart(3, "0")}.jpg`,
);
