import { createContext, useState, useEffect } from 'react';

// const addCartItem = (cartItems, productToAdd) => {
//     const existingCartItem = cartItems.find(
//         (cartItem) => cartItem.id === productToAdd.id
//     );

//     if (existingCartItem) {
//         return cartItems.map((cartItem) =>
//             cartItem.id === productToAdd.id
//                 ? { ...cartItem, quantity: cartItem.quantity + 1 }
//                 : cartItem
//         );
//     }

//     return [...cartItems, { ...productToAdd, quantity: 1 }];
// };

// const removeCartItem = (cartItems, cartItemToRemove) => {
//     const existingCartItem = cartItems.find(
//         (cartItem) => cartItem.id === cartItemToRemove.id
//     );
//     if (existingCartItem.quantity === 1) {
//         return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
//     }

//     return cartItems.map((cartItem) =>
//         cartItem.id === cartItemToRemove.id
//             ? { ...cartItem, quantity: cartItem.quantity - 1 }
//             : cartItem
//     );
// };

// const clearCartItem = (cartItems, cartItemToClear) =>
//     cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

const updateCartItemsquantity = (cartItems, cartItem, delta) => {
    const existingCartItem = cartItems.find(item => item.id === cartItem.id)
    if (existingCartItem) {
        return cartItems.map(item => item.id === cartItem.id ? { ...item, quantity: item.quantity + delta } : item)
    }
    return [...cartItems, { ...cartItem, quantity: 1 }]
}

const removeItem = (cartItems, itemtoRemove) => cartItems.filter(cartItem => cartItem.id !== itemtoRemove.id)

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemToCart: () => { },
    clearItemFromCart: () => { },
    cartCount: 0,
    cartTotal: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
        );
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
        setCartCount(newCartCount)
        setCartTotal(newCartTotal)
    }, [cartItems]);

    // useEffect(() => {
    //     const newCartTotal = cartItems.reduce(
    //         (total, cartItem) => total + cartItem.quantity * cartItem.price,
    //         0
    //     );
    //     setCartTotal(newCartTotal);
    // }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(updateCartItemsquantity(cartItems, productToAdd, 1));
    };

    const removeItemToCart = (cartItemToRemove) => {
        if (cartItemToRemove.quantity === 1) {
            setCartItems(removeItem(cartItems, cartItemToRemove))
        } else {
            setCartItems(updateCartItemsquantity(cartItems, cartItemToRemove, -1));
        }
    };

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(removeItem(cartItems, cartItemToClear));
    };

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        removeItemToCart,
        clearItemFromCart,
        cartItems,
        cartCount,
        cartTotal,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};