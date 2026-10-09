import React, {Component} from 'react'
import {Outlet} from "react-router-dom"
import "./index.scss"

class Mine extends Component {

    render() {
        return (
            <div>
                <Outlet/>
            </div>
        )
    }
}

export default Mine;