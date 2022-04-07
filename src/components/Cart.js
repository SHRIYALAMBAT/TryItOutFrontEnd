import React, { createContext, useReducer, useEffect } from "react";
import "../stylesheets/cart.css";
// import { Products } from "./products";
import { useState } from "react";
import axios from "axios";
import ContextCart from "./ContextCart";
import { reducer } from "./reducer";

export const CartContext = createContext();

const Cart = () => {
  const [Products, setProducts] = useState([]);
  // console.log("hee");
  useEffect(async () => {
    let url = "http://localhost:8080/get-all-cartProducts/" + 3;

    let res = await axios.post(url, {});
    //console.log(res.data);
    setProducts(res.data);
  }, []);
  const [products, setproducts] = useState([]);

  Products.map(
    (item, index) =>
      (products[index] = {
        id: item.productId,
        title: item.brand,
        description: item.name,
        img: "http://" + item.productImg,
        quantity: item.quantity,
        price: item.price,
        size: item.size,
        colour: item.colour,
      })
  );

  console.log(products);

  const initialState = {
    item: products,
    totalAmount: 0,
    totalItem: 0,
  };

  // const [item, setItem] = useState(products);
  const [state, dispatch] = useReducer(reducer, initialState);

  // to delete the indv. elements from an Item Cart
  const removeItem = (id) => {
    return dispatch({
      type: "REMOVE_ITEM",
      payload: id,
    });
  };

  // clear the cart
  const clearCart = () => {
    return dispatch({ type: "CLEAR_CART" });
  };

  // increment the item
  const increment = (id) => {
    return dispatch({
      type: "INCREMENT",
      payload: id,
    });
  };

  // decrement the item
  const decrement = (id) => {
    return dispatch({
      type: "DECREMENT",
      payload: id,
    });
  };

  // we will use the useEffect to update the data
  useEffect(() => {
    dispatch({ type: "GET_TOTAL" });
    // console.log("Awesome");
  }, [state.item]);

  return (
    <CartContext.Provider
      value={{ ...state, removeItem, clearCart, increment, decrement }}
    >
      <ContextCart />
    </CartContext.Provider>
  );
};

export default Cart;
