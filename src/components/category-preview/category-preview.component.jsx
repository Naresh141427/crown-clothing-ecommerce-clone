import ProductCard from "../product-card/product-card.component";
import {
    CategoryPreviewContainer,
    Title,
    Preview,
} from "./category-preview.styles";

const CategoryPreview = ({ title, product }) => {
    return (
        <CategoryPreviewContainer>
            <Title to={title}>{title.toUpperCase()}</Title>
            <Preview>
                {
                    product
                        .filter((_, index) => index < 4)
                        .map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                }
            </Preview>
        </CategoryPreviewContainer>
    );
};

export default CategoryPreview;
