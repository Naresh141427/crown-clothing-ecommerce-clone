import { takeLatest, all, call, put } from "redux-saga/effects";
import { USER_ACTION_TYPE } from "./user.action.type";
import { signInSuccess, signInFailed, signUpSuccess, signUpailed, signOutSuccess, signOutFailed } from "./user.action";

import { getCurrentUser, createUserDocumentFromAuth, signInWithGooglePopUp, signInAuthUserWithEmailAndPassword, createAuthUserWithEmailAndPassword, signOutUser } from "../../utils/firebase/firebase.utils";


export function* signOut() {
    try {
        yield call(signOutUser)
        yield put(signOutSuccess())
    } catch (err) {
        yield put(signOutFailed(err))
    }
}

export function* getSnapShotFromUserAuth(userAuth, additionalDetails) {
    try {
        const userSnapShot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails)
        yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }))

    } catch (err) {
        yield put(signInFailed(err))
    }
}


export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser)
        if (!userAuth) return
        yield call(getSnapShotFromUserAuth, userAuth)

    } catch (err) {
        yield put(signInFailed(err))
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield call(signInWithGooglePopUp)
        yield call(getSnapShotFromUserAuth, user)
    } catch (err) {
        yield put(signInFailed(err))

    }

}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield call(signInAuthUserWithEmailAndPassword, email, password)
        yield call(getSnapShotFromUserAuth, user)

    } catch (err) {
        yield put(signInFailed(err))
    }

}

export function* signUp({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield call(createAuthUserWithEmailAndPassword, email, password)
        yield put(signUpSuccess(user, { displayName }))
    } catch (err) {
        yield put(signUpailed(err))
    }

}

export function* onSignUpStart() {
    yield takeLatest(USER_ACTION_TYPE.SIGN_UP_START, signUp)
}


export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPE.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
    yield call(getSnapShotFromUserAuth, user, additionalDetails)
}

export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPE.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onCheckUSerSession() {
    yield takeLatest(USER_ACTION_TYPE.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignUpSuccess() {
    yield takeLatest(USER_ACTION_TYPE.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* onSignOutStart() {
    yield takeLatest(USER_ACTION_TYPE.SIGN_OUT_START, signOut)
}

export function* userSagas() {
    yield all([call(onCheckUSerSession), call(onGoogleSignInStart), call(onEmailSignInStart), call(onSignUpStart), call(onSignUpSuccess), call(onSignOutStart)])
}