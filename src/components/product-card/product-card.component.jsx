
import { useDispatch, useSelector } from 'react-redux';


import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import {
    ProductCardContainer,
    Footer,
    Name,
    Price
} from './product-card.styles';
import { addItemsToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

const ProductCard = ({ product }) => {
    const cartitems = useSelector(selectCartItems)
    const dispatch = useDispatch()
    const { name, price, imageUrl } = product;

    const addproductToCart = () => {

        return dispatch(addItemsToCart(cartitems, product))
    };

    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={`${name}`} />
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button onClick={addproductToCart} buttonType={BUTTON_TYPE_CLASSES.inverted}>
                Add to cart
            </Button>
        </ProductCardContainer>
    );
};

export default ProductCard;
