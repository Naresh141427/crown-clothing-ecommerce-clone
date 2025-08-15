// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithRedirect, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs, where, orderBy, limit } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAIj2WQ6xEFXsVFIsxWRDkm_t_B18IBDyk",
    authDomain: "clothing-app-54241.firebaseapp.com",
    projectId: "clothing-app-54241",
    storageBucket: "clothing-app-54241.firebasestorage.app",
    messagingSenderId: "251342691492",
    appId: "1:251342691492:web:5e0503bc7707ad39705a31"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopUp = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const db = getFirestore()


// setting the collection details in the firestore
export const addCollectionAndDocuments = async (collectionName, objectsToAdd) => {
    const collectionRef = collection(db, collectionName)
    const bacth = writeBatch(db)
    objectsToAdd.forEach(object => {
        const documentRef = doc(collectionRef, object.title.toLowerCase())
        bacth.set(documentRef, object)
    })
    await bacth.commit()
    // console.log("done");
}


// getting the collection details form firestore

export const getCollectionAndDocumentsDetails = async (colllectionName) => {
    try {
        const collectionRef = collection(db, colllectionName)

        // without condition

        // const querySnapshot = await getDocs(collectionRef)
        // const products = querySnapshot.docs.map(doc => doc.data())
        // return products


        // with condiions using mean with query

        const q = query(collectionRef)
        const querySnapShot = await getDocs(q)
        const categoriesArray = querySnapShot.docs.map(doc => doc.data())
        return categoriesArray
        // const categoriesMap = querySnapShot.docs.reduce((acc, docSnapShot) => {
        //     const { title, items } = docSnapShot.data()
        //     acc[title.toLowerCase()] = items
        //     return acc
        // }, {})

        // const q = query(collectionRef, orderBy("title"))
        // const querySnapshot = await getDocs(q)
        // console.log(querySnapshot);
        // const categoriesMap = querySnapshot.docs.map(doc => doc.data())

        // const q = query(collectionRef, limit(3))
        // const querySnapshot = await getDocs(q)

        // const categoriesMap = querySnapshot.docs.map(doc => doc.data())


        // const q = query(collectionRef, where("title", "==", "Hats"))
        // const querySnapshot = await getDocs(q)

        // const categoriesMap = querySnapshot.docs.map(doc => doc.data())
        // return categoriesMap
    } catch (e) {
        console.log("error while getting deatils", e.message);
    }
}
export const createUserDocumentFromAuth = async (userAuth, additionalDetails = {}) => {
    if (!userAuth) return
    const userDocRef = doc(db, "users", userAuth.uid)
    // console.log(userDocRef);
    const userSnapShot = await getDoc(userDocRef)
    // console.log(userSnapShot);
    // console.log(userSnapShot.exists());

    if (!userSnapShot.exists()) {
        const { displayName, email } = userAuth
        console.log(displayName)
        const createdAt = new Date()
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalDetails
            })
        } catch (err) {
            console.error("error creating user", err.message)
        }
    }
    return userSnapShot


}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return
    return createUserWithEmailAndPassword(auth, email, password)
}
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return
    return signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)


export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unSubscribe = onAuthStateChanged(
            auth,
            userAuth => {
                unSubscribe()
                resolve(userAuth)
            },
            reject
        )
    })
}