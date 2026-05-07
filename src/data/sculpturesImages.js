const sculpturesImageCount = 4;

export const sculpturesImages = Array.from(
  { length: sculpturesImageCount },
  (_, index) => `/production-hub/product-doc-images/sculptures/sculptures-${String(index + 1).padStart(3, "0")}.jpg`,
);
