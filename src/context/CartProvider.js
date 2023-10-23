import React, { useState } from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { addItemToCart, getCart, removeItemFromCart } from '../services/cart.service';
import CartContext from './CartContext'
import UserContext from './UserContext';

const CartProvider = ({children}) => {

    const {isLogin,userData} = useContext(UserContext)
    const [cart,setCart] = useState(null);
    const [heading,setHeading] = useState("INif")

    //load user cart initially
    const loadUserCart = async (userId) => {
       try {
          const data = await getCart(userId);
          setCart({...data})
          console.log(data)
       } catch (error) {
          console.log(error)
          setCart({ items: []})
       }
       console.log(cart)
    }

    const addItem = async (quantity,productId,next) => {
        if(!isLogin){
            Swal.fire('Not Logged In','You are not logged in. Try to login first then after add the product.','error')
            return
        }
        try {
            const result = await addItemToCart(
                userData.user.userId,
                productId,
                quantity
            )
            setCart({...result})
            next()
            
        } catch (error) {
           console.log(error);
           toast.error("Error while adding product") 
        }
    }

    const removeItem = async (cartItemId) => {
        try {
            const result = await removeItemFromCart(
                userData.user.userId,
                cartItemId 
            )
            const newCartItems = cart.items.filter(
                (item) => item.cartItemId !== cartItemId
              );
              console.log(newCartItems);
              setCart({
                ...cart,
                items: newCartItems,
              });
        } catch (error) {
            console.log(error)
            toast.error("Error while removing item")
        }
    }

   useEffect(()=>{
      console.log(userData?.user?.userId)
      if(isLogin){
         //get User cart
        loadUserCart(userData?.user?.userId)
      } 
   },[isLogin])

  return (
    <CartContext.Provider
      value={{cart,setCart,addItem,removeItem}}
    >
        {children}
    </CartContext.Provider>
  )
}

export default CartProvider