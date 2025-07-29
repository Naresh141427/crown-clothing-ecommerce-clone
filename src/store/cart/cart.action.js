

import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.action-types";



export const selectIsCartOPenAction = bool => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)

const updateCartItemsquantity = (cartItems, cartItem, delta) => {
    console.log(cartItems, cartItem, delta);
    const existingCartItem = cartItems.find(item => item.id === cartItem.id)
    if (existingCartItem) {
        return cartItems.map(item => item.id === cartItem.id ? { ...item, quantity: item.quantity + delta } : item)
    }
    return [...cartItems, { ...cartItem, quantity: 1 }]
}

const removeItem = (cartItems, itemtoRemove) => cartItems.filter(cartItem => cartItem.id !== itemtoRemove.id)

export const addItemsToCart = (cartItems, productToAdd) => {
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, updateCartItemsquantity(cartItems, productToAdd, 1))
}

export const removeItemsFromCart = (cartItems, productToRemove) => {
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, removeItem(cartItems, productToRemove))
}

