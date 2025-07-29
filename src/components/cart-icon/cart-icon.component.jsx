import { useSelector, useDispatch } from "react-redux";

import ShoppingIcon from "../../assets/shopping-bag.svg";

import {
    CartIconContainer,
    ShoppingIconStyle,
    ItemCount
} from "./cart-icon.styles";
import { selectIsCartOPenAction } from "../../store/cart/cart.action";
import { selectCartCount, selectIsCartOPen } from "../../store/cart/cart.selector";

const CartIcon = () => {
    const isCartOpen = useSelector(selectIsCartOPen)
    const cartCount = useSelector(selectCartCount)
    const dispatch = useDispatch()

    const toggleCartOpen = () => {
        dispatch(selectIsCartOPenAction(!isCartOpen));
    };

    return (
        <CartIconContainer onClick={toggleCartOpen}>
            <ShoppingIconStyle src={ShoppingIcon} alt="shopping bag icon" />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;
