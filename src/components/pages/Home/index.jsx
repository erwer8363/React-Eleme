import React, {Component} from 'react'
import "./index.scss"

import Header from './Header'
import Banners from './banners'
import SetMeal from './SetMeal'
import StoreList from './storeList'
import StoreInfo from './storeInfo'

class Home extends Component {
    render() {
        return (
            <div id="home">
                <Header></Header>
                <Banners></Banners>
                <SetMeal></SetMeal>
                <StoreList></StoreList>
                <StoreInfo></StoreInfo>
            </div>
        )
    }
}

export default Home