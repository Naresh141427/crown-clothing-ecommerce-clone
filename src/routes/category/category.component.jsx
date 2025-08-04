import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";

import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";

import { CategoryTitle, CategoryContainer } from "./category.styels";
import { useSelector } from "react-redux";
import { categoriesSelector, selectCategoriesIsLoading } from "../../store/categories/categories.selector";

const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(categoriesSelector)
    const isLoading = useSelector(selectCategoriesIsLoading)
    console.log(isLoading);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <Fragment>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            {
                isLoading ? <Spinner /> : (
                    <CategoryContainer>
                        {products &&
                            products.map((product) => (
                                <ProductCard key={product.id} product={product} title={category} />
                            ))}
                    </CategoryContainer>
                )
            }

        </Fragment>
    );
};

export default Category;
