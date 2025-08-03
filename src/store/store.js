import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";

import { rootReducers } from "./root-reducer";
import storage from "redux-persist/lib/storage"

const loggerMiddleware = (store) => (next) => (action) => {
    if (!action.type) return next(action);

    console.log("ACTION TYPE:", action.type);
    console.log("ACTION PAYLOAD:", action.payload);
    console.log("PREVIOUS STATE:", store.getState());

    next(action);

    console.log("NEXT STATE:", store.getState());
};


const persistConfig = {
    key: 'root',
    storage,
    blacklist: ["user"]
}

const persistedReducer = persistReducer(persistConfig, rootReducers)
const middleWares = [loggerMiddleware]

const composedEnhancers = compose(applyMiddleware(...middleWares))

export const store = createStore(persistedReducer, undefined, composedEnhancers)

export const persistor = persistStore(store)