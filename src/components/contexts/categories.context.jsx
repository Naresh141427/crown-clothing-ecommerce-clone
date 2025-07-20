import { createContext, useState, useEffect } from "react"
import { getCollectionAndDocumentsDetails } from "../../utils/firebase/firebase.utils.js";

// import SHOP_DATA from "../../shop-data.js"

export const CategoriesContext = createContext({
    categoriesMap: {}
});

export const CatogoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({})
    // useEffect(() => {
    //     addCollectionAndDocuments("categories", SHOP_DATA)
    // }, [])

    useEffect(() => {
        const getDeatils = async () => {
            const categoriesMap = await getCollectionAndDocumentsDetails("categories")
            setCategoriesMap(categoriesMap)

        }
        getDeatils()
    }, [])
    const value = { categoriesMap }

    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}