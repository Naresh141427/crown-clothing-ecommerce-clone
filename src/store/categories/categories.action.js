import { getCollectionAndDocumentsDetails } from "../../utils/firebase/firebase.utils";
import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES } from "./categories.action-types";

const fetchCategoriesStart = () => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)
const fetchCategoriesSucess = (categories) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories)
const fetchCategoriesFailed = (error) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error)

export const fetchCategoriesAsync = () => async dispatch => {
    dispatch(fetchCategoriesStart())
    try {
        const categoriesArray = await getCollectionAndDocumentsDetails("categories")
        dispatch(fetchCategoriesSucess(categoriesArray))

    } catch (error) {
        dispatch(fetchCategoriesFailed(error))
    }
} 