import "./index.scss"
import {Outlet} from "react-router"
import NavBar from "./NavBar"

const Find = () => {
    return (
        <div className="find">
            <div className="top">
                <NavBar/>
            </div>
            <Outlet/>
        </div>
    )
}

export default Find
