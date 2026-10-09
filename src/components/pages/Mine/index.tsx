import React from 'react'
import {Outlet} from "react-router-dom"
import "./index.scss"

const Mine = () => {
    return (
        <div>
            <Outlet/>
        </div>
    )
}

export default Mine;