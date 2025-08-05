import { takeLatest, all, call, put } from "redux-saga/effects"

import { getCollectionAndDocumentsDetails } from "../../utils/firebase/firebase.utils"
import { fetchCategoriesSucess, fetchCategoriesFailed } from "./categories.action"

import { CATEGORIES_ACTION_TYPES } from "./categories.action-types"


export function* fetchCategoriesAsync() {
    try {
        const categoriesArray = yield call(getCollectionAndDocumentsDetails, "categories")
        yield put(fetchCategoriesSucess(categoriesArray))

    } catch (error) {
        yield put(fetchCategoriesFailed(error))
    }
}

export function* onFechCategories() {
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)

}

export function* categoriesSaga() {
    yield all([call(onFechCategories)])
}