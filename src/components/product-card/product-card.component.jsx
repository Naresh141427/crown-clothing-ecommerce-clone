import { useContext } from 'react';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { CartContext } from '../contexts/cart.context';
import {
    ProductCardContainer,
    Footer,
    Name,
    Price
} from './product-card.styles';

const ProductCard = ({ product }) => {
    const { addItemToCart } = useContext(CartContext);
    const { name, price, imageUrl } = product;

    const addproductToCart = () => addItemToCart(product);

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
