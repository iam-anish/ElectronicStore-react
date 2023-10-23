// export const BASE_URL = `http://localhost:9091`
// export const BASE_URL = `http://172.16.101.22:9091`
export const BASE_URL = `https://electronicstore-production.up.railway.app`
export const PRODUCT_PAGE_SIZE = 2

export const getCategoryImageUrl = (categoryId) => {
    return `${BASE_URL}/category/image/${categoryId}`;
}

export const getUserImageUrl = (userId) => {
    return `${BASE_URL}/users/image/${userId}`;
}

export const getProductImageUrl = (productId) => {
   return `${BASE_URL}/products/image/${productId}`;
}

export const formDate = (timeInLongs) => {
    if (!timeInLongs) {
        return null
    }
    return new Date(timeInLongs).toLocaleString();
}