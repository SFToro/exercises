export const filterProducts = ({ products, filters }) => {
  const filteredProducts = products.filter(({ price, category }) => {
    if (filters.category === "all") {
      return price < filters.price;
    } else {
      return price < filters.price && category === filters.category;
    }
  });
  return filteredProducts;
};
