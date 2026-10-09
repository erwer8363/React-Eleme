import React, {Component} from 'react'
import "./index.scss"
import HomeDetailBanner from "../../../../../commons/HomeDetailBanner"
import SaleDetail from "../Order/SaleDetail"

class HdOrder extends Component {
    render() {
        return (
            <div>
                <HomeDetailBanner></HomeDetailBanner>
                <SaleDetail></SaleDetail>
            </div>
        )
    }
}

export default HdOrder