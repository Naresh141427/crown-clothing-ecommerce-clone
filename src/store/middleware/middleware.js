export const loggerMiddleware = (store) => (next) => (action) => {
    if (!action.type) return next(action);

    console.log("ACTION TYPE:", action.type);
    console.log("ACTION PAYLOAD:", action.payload);
    console.log("PREVIOUS STATE:", store.getState());

    next(action);

    console.log("NEXT STATE:", store.getState());
};