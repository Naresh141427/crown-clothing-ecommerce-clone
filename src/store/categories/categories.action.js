import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES } from "./categories.action-types";

export const setCategoriesMap = categories => createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP, categories)