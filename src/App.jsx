import { Route, Routes } from "react-router-dom"

import Home from "./routes/home/home.component"
import MainLayOut from "./components/mainlayout/mainlayout"
import Authentication from "./routes/authentication/authentication.component"
import Shop from "./components/shop/shop.component"
import CheckOut from "./routes/checkout/checkout.component"
import { addCollectionAndDocuments } from "./utils/firebase/firebase.utils"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { checkUserSession } from "./store/user/user.action"

import SHOP_DATA from "./shop-data"


const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(checkUserSession())

  }, [])
  useEffect(() => {
    document.title = "Crown Clothing | React E-commerce";
  }, []);

  useEffect(() => {
    const addingCollections = async (SHOP_DATA) => {
      await addCollectionAndDocuments("categories", SHOP_DATA)
    }
    addingCollections(SHOP_DATA)
  }, [])
  return (
    <Routes>
      <Route path="/" element={<MainLayOut />}>
        <Route index element={<Home />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="checkout" element={<CheckOut />} />
      </Route>
    </Routes>

  )

}

export default App