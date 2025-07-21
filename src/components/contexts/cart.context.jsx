import { createContext, useReducer } from 'react';


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


const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

const CART_ACTION_TYPE = {
    SET_CART_ITEM: "SET_CART_ITEM",
    SET_IS_CART_OPEN: "SET_IS_CART_OPEN"
}

const cartReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case CART_ACTION_TYPE.SET_CART_ITEM:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPE.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`unhandled type of: ${type} in the cartReducer`)
    }
}

const updateCartItemReducer = (newCartItems) => {
    const reducerCartCount = newCartItems.reduce(
        (total, cartItem) => total + cartItem.quantity,
        0
    );
    const reducerCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
    return {
        cartItems: newCartItems,
        cartCount: reducerCartCount,
        cartTotal: reducerCartTotal
    }


}




export const CartProvider = ({ children }) => {
    // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    // const [cartCount, setCartCount] = useState(0);
    // const [cartTotal, setCartTotal] = useState(0);
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)
    const { isCartOpen, cartItems, cartCount, cartTotal } = state

    // useEffect(() => {
    //     updateCartItemReducer(cartItems)
    // }, [cartItems]);

    // useEffect(() => {
    //     const newCartTotal = cartItems.reduce(
    //         (total, cartItem) => total + cartItem.quantity * cartItem.price,
    //         0
    //     );
    //     setCartTotal(newCartTotal);
    // }, [cartItems]);



    const addItemToCart = (productToAdd) => {
        const newState = updateCartItemReducer(updateCartItemsquantity(cartItems, productToAdd, 1));
        dispatch({ type: "SET_CART_ITEM", payload: newState })

    };

    const removeItemToCart = (cartItemToRemove) => {
        if (cartItemToRemove.quantity === 1) {
            const newState = updateCartItemReducer(removeItem(cartItems, cartItemToRemove))
            dispatch({ type: "SET_CART_ITEM", payload: newState })
        } else {
            const newState = updateCartItemReducer(updateCartItemsquantity(cartItems, cartItemToRemove, -1));
            dispatch({ type: "SET_CART_ITEM", payload: newState })
        }
    };

    const clearItemFromCart = (cartItemToClear) => {
        const newState = updateCartItemReducer(removeItem(cartItems, cartItemToClear));
        dispatch({ type: "SET_CART_ITEM", payload: newState })
    };
    const setIsCartOpen = (bool) => dispatch({ type: "SET_IS_CART_OPEN", payload: bool })

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