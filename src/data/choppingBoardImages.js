const choppingBoardImageCount = 2;

export const choppingBoardImages = Array.from(
  { length: choppingBoardImageCount },
  (_, index) => `/production-hub/product-doc-images/chopping-board/chopping-board-${String(index + 1).padStart(3, "0")}.jpg`,
);
