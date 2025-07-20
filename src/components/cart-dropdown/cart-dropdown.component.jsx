import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../contexts/cart.context';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import {
    CartDropdownContainer,
    CartItems,
    EmptyMessage,
    CheckoutButtonWrapper
} from './cart-dropdown.styles';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    };

    return (
        <CartDropdownContainer>
            {cartItems.length ? (
                <CartItems>
                    {cartItems.map((item) => (
                        <CartItem key={item.id} cartItem={item} />
                    ))}
                </CartItems>
            ) : (
                <EmptyMessage>Your cart is empty</EmptyMessage>
            )}

            <CheckoutButtonWrapper>
                <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
            </CheckoutButtonWrapper>
        </CartDropdownContainer>
    );
};

export default CartDropdown;
