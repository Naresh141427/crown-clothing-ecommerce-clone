import { useDispatch, useSelector } from 'react-redux';


import {
    CheckoutItemContainer,
    ImageContainer,
    Name,
    Quantity,
    Arrow,
    Value,
    Price,
    RemoveButton,
} from './checkout-item.styles';
import { addItemsToCart, clearCartItems, removeItemsFromCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

const CheckoutItem = ({ cartItem }) => {
    const cartItems = useSelector(selectCartItems)
    const { name, imageUrl, price, quantity } = cartItem;
    const dispatch = useDispatch()

    const clearItemHandler = () => dispatch(clearCartItems(cartItems, cartItem));
    const addItemHandler = () => dispatch(addItemsToCart(cartItems, cartItem));
    const removeItemHandler = () => dispatch(removeItemsFromCart(cartItems, cartItem));

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <Name>{name}</Name>
            <Quantity>
                <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addItemHandler}>&#10095;</Arrow>
            </Quantity>
            <Price>{price * quantity}</Price>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    );
};

export default CheckoutItem;
