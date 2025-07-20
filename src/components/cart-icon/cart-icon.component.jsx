import { useContext } from "react";
import { CartContext } from "../contexts/cart.context";

import ShoppingIcon from "../../assets/shopping-bag.svg";

import {
    CartIconContainer,
    ShoppingIconStyle,
    ItemCount
} from "./cart-icon.styles";

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

    const toggleCartOpen = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <CartIconContainer onClick={toggleCartOpen}>
            <ShoppingIconStyle src={ShoppingIcon} alt="shopping bag icon" />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;
