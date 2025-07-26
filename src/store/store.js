import { compose, createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";
import { rootReducers } from "./root-reducer";


const loggerMiddleware = (state) => next => action => {
    if (!action.type) next(action)
    console.log("action type: ", action.type);
    console.log("action payload:  ", action.payload);
    console.log("Prvious State: ", state.getState());
    next(action)
    console.log("next State: ", state.getState());
}

const middleWares = [loggerMiddleware]

const composedEnhancers = compose(applyMiddleware(...middleWares))

export const store = createStore(rootReducers, undefined, composedEnhancers)