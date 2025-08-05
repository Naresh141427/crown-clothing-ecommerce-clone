import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";

import { rootReducers } from "./root-reducer";
import storage from "redux-persist/lib/storage"
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ["cart"]
}

const sagaMiddleWare = createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, rootReducers)
const middleWares = [process.env.NODE_ENV !== "production" && logger, sagaMiddleWare].filter(Boolean)


const composeEnchancers = (process.env.NODE_ENV !== "production" && window && window.__REDUX__DEVTOOLS_EXTENSION_COMPOSE__) || compose

const composedEnhancers = composeEnchancers(applyMiddleware(...middleWares))

export const store = createStore(persistedReducer, undefined, composedEnhancers)

sagaMiddleWare.run(rootSaga)

export const persistor = persistStore(store)