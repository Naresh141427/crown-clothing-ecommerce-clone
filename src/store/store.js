import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";

import { rootReducers } from "./root-reducer";
import storage from "redux-persist/lib/storage"
import logger from "redux-logger";
import { thunk } from "redux-thunk";



const persistConfig = {
    key: 'root',
    storage,
    whitelist: ["cart"]
}

const persistedReducer = persistReducer(persistConfig, rootReducers)
const middleWares = [process.env.NODE_ENV !== "production" && logger, thunk].filter(Boolean)


const composeEnchancers = (process.env.NODE_ENV !== "production" && window && window.__REDUX__DEVTOOLS_EXTENSION_COMPOSE__) || compose

const composedEnhancers = composeEnchancers(applyMiddleware(...middleWares))

export const store = createStore(persistedReducer, undefined, composedEnhancers)

export const persistor = persistStore(store)