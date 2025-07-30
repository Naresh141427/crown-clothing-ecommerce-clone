

import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.action-types";



export const selectIsCartOPenAction = bool => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)

const filterCartItems = (cartItems, itemtoRemove) => cartItems.filter(cartItem => cartItem.id !== itemtoRemove.id)


const updateCartItemsquantity = (cartItems, productToUpdate, delta) => {
    const existingCartItem = cartItems.find((item) => item.id === productToUpdate.id);

    if (existingCartItem) {
        const newQuantity = existingCartItem.quantity + delta;

        if (newQuantity <= 0) {
            return cartItems.filter((item) => item.id !== productToUpdate.id);
        }

        return cartItems.map((item) =>
            item.id === productToUpdate.id ? { ...item, quantity: newQuantity } : item
        );
    }
    if (delta > 0) {
        return [...cartItems, { ...productToUpdate, quantity: 1 }];
    }

    return cartItems;
};



export const addItemsToCart = (cartItems, productToAdd) => {
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, updateCartItemsquantity(cartItems, productToAdd, 1))
}

export const removeItemsFromCart = (cartItems, productToRemove) => {

    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, updateCartItemsquantity(cartItems, productToRemove, -1))
}

export const clearCartItems = (cartItems, itemToClear) => {
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, filterCartItems(cartItems, itemToClear))
}