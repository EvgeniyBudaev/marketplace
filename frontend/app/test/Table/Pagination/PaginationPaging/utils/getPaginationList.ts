type TGetPaginationList = (pageCount: number, currentPage: number, amountPages: number) => number[];

export const getPaginationList: TGetPaginationList = (pageCount, currentPage, amountPages) => {
  const isMin = pageCount > amountPages * 2;
  const isMax = pageCount - currentPage < amountPages * 2;

  if (isMin && isMax) {
    return Array.from({ length: amountPages * 2 }, (_, i) => pageCount - i).reverse();
  }

  if (isMin) {
    const prefixArray = Array.from({ length: amountPages }, (_, i) => currentPage + i);
    const postfixArray = Array.from({ length: amountPages }, (_, i) => pageCount - i).reverse();

    return prefixArray.concat(postfixArray);
  }

  return Array.from(Array(pageCount).keys());
};
