import { privateAxios } from "./axios.service";
//all function calling api related to order

//get orders
export const getAllOrders = async (pageNumber, pageSize, sortBy, sortDir) => {
  let result = await privateAxios.get(
    `/orders?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
  );
  return result.data;
};

//update orders
export const updateOrder = async (order,orderId) => {
    const result = await privateAxios.put(`/orders/${orderId}`,order);
    return result.data;
}

//create order
export const createOrder = async (orderDetail) => {
     const result = await privateAxios.post(`/orders`,orderDetail)
     return result.data;
}

//get orders of users
export const getOrdersOfUser = async (userId) => {
   const result = await privateAxios.get(`/orders/user/${userId}`)
   return result.data;
}