//User related APIs call
import { privateAxios, publicAxios } from "./axios.service";

//Add Category API
export const addCategory = (category) => {
  return privateAxios
    .post("/categories", category)
    .then((response) => response.data);
};

//get all categories
export const getCategories = (currentPage = 0,pageSize = 10) => {
  return publicAxios
    .get(`/categories?pageNumber=${currentPage}&pageSize=${pageSize}`)
    .then((response) => response.data);
};

//delete category
export const deleteCategory = (categoryId) => {
  return privateAxios
    .delete(`/categories/${categoryId}`)
    .then((response) => response.data);
};

//update category
export const updateCategory = (category) => {
  return privateAxios
    .put(`/categories/${category.categoryId}`, category)
    .then((response) => response.data);
};
