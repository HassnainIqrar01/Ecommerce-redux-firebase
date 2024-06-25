const BASE_URL = "https://dummyjson.com/products";

export const getAllProducts = () => {
  return fetch(BASE_URL).then((res) => res.json());
};

export const getProductsByCategory = (category) => {
  return fetch(`${BASE_URL}/category/${category}`).then((res) => res.json());
};

export const getProductById = (id) => {
  return fetch(`${BASE_URL}/${id}`).then((res) => res.json());
};
