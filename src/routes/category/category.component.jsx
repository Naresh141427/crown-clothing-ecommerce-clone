import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";

import ProductCard from "../../components/product-card/product-card.component";

import { CategoryTitle, CategoryContainer } from "./category.styels";
import { useSelector } from "react-redux";
import { categoriesSelector } from "../../store/categories/categories.selector";

const Category = () => {
    const { category } = useParams();
    console.log("redner/re-render category component");
    const categoriesMap = useSelector(categoriesSelector)
    const [products, setProducts] = useState([]);

    useEffect(() => {
        console.log("effect got fired from category component");
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <Fragment>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            <CategoryContainer>
                {products &&
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} title={category} />
                    ))}
            </CategoryContainer>
        </Fragment>
    );
};

export default Category;
