//product related APIs call
import { privateAxios, publicAxios } from "./axios.service";

//create product without category
export const createProductWithOutCategory = (product) => {
  return privateAxios
    .post(`/products`, product)
    .then((response) => response.data);
};

//create product with category
export const createProductInCategory = (product, categoryId) => {
  return privateAxios
    .post(`/categories/${categoryId}/products`, product)
    .then((response) => response.data);
};

//add product image
export const addProductImage = (file, productId) => {
  const formData = new FormData();
  formData.append("productImage", file);
  return privateAxios
    .post(`/products/image/${productId}`, formData)
    .then((response) => response.data);  
};

//update product image
export const updateProductImage = (file,productId) => {
  const formData = new FormData();
  formData.append("productImage", file);
  return privateAxios
    .put(`/products/image/${productId}`, formData)
    .then((response) => response.data);
};

//get product
export const getAllProducts = (
  pageNumber = 0,
  pageSize = 10,
  sortBy = "addedDate",
  sortDir = "asc"
) => {
  return privateAxios
    .get(
      `/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
    )
    .then((response) => response.data);
};

//get all live product
export const getAllLiveProducts = (
  pageNumber = 0,
  pageSize = 10,
  sortBy = "addedDate",
  sortDir = "asc"
) => {
  return privateAxios
    .get(
      `/products/live?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
    )
    .then((response) => response.data);
};

//delete the product
export const deleteProduct = (productId) => {
  return privateAxios.delete(`/products/${productId}`)
  .then((response) => response.data);
}

//update product
export const updateProduct = (product,productId) => {
  return privateAxios.put(`/products/${productId}`,product)
  .then((response) => response.data);
}

//update product category
export const updateProductCategory = (categoryId,productId) => {
  return privateAxios.put(`/categories/${categoryId}/products/${productId}`)
  .then((response) => response.data);
}

//search product service
export const searchProduct = (query) => {
  return privateAxios.get(`/products/search/${query}`)
  .then((response) => response.data);
}

//get single product
export const getProduct = (productId) => {
  return privateAxios.get(`/products/${productId}`).then((res)=>res.data);
}
 
//get products of category 
export const getProductsOfCategories = (
  categoryId,
  pageNumber = 0,
  pageSize = 10,
  sortBy = "addedDate",
  sortDir = "asc"
) => {
  return privateAxios.get(`/categories/${categoryId}/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`).then((res)=>res.data);
}