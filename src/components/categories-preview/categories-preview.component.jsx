import { Fragment } from "react"
import { useSelector } from "react-redux"


import { categoriesSelector, selectCategoriesIsLoading } from "../../store/categories/categories.selector"

import CategoryPreview from "../category-preview/category-preview.component"
import Spinner from "../spinner/spinner.component"

const CategoriesPreview = () => {
    const categoriesMap = useSelector(categoriesSelector)
    const isLoading = useSelector(selectCategoriesIsLoading)

    return (
        <Fragment>
            {
                isLoading ? <Spinner /> : (

                    Object.keys(categoriesMap).map(title => {
                        const products = categoriesMap[title]
                        return <CategoryPreview key={title} title={title} product={products} />
                    })

                )
            }


        </Fragment>
    )
}

export default CategoriesPreview