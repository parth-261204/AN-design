const napkinRingsImageCount = 8;

export const napkinRingsImages = Array.from(
  { length: napkinRingsImageCount },
  (_, index) => `/production-hub/product-doc-images/napkin-rings/napkin-rings-${String(index + 1).padStart(3, "0")}.png`,
);
