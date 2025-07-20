import { Outlet } from "react-router-dom"
import Nav from "../../routes/navigation/nav.component.jsx"


const MainLayOut = ()=>{
    return(
        <>
            <Nav/>
            <Outlet/>
        </>
    )
}

export default MainLayOut