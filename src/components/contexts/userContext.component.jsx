import { createContext, useEffect, useReducer } from "react"
import { createAuthUserWithEmailAndPassword, onAuthStateChangedListener } from "../../utils/firebase/firebase.utils"


export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})

const INITIAL_STATE = {
    currentUser: null
}

export const USER_ACTION_TYPE = {
    SET_CURRENT_USER: "SET_CURRENT_USER"
}

const userReducer = (state, action) => {
    // console.log("dispatched");
    // console.log(action);
    const { type, payload } = action

    switch (type) {
        case USER_ACTION_TYPE.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            throw new Error(`unhandled type: ${type} in userREducer`)

    }
}



export const UserProvider = ({ children }) => {
    // const [currentUser, setCurrentUser] = useState(null)
    const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE)
    // console.log(currentUser);
    const setCurrentUser = user => {
        dispatch({ type: USER_ACTION_TYPE.SET_CURRENT_USER, payload: user })
    }
    const value = { currentUser, setCurrentUser }



    useEffect(() => {
        const unSubscribe = onAuthStateChangedListener((user) => {
            if (user) createAuthUserWithEmailAndPassword(user)
            setCurrentUser(user)

        })
        return unSubscribe
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}