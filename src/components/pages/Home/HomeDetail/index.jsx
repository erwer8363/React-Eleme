import React, {Component} from 'react'
import "./index.scss"
import {NavBar} from 'antd-mobile';
import HomeDetailNav from '../../../../components/commons/HomeDetailNav';
import {Outlet} from "react-router-dom"
import {withRouter} from "@/utils/withRouter";

class HomeDetail extends Component {

    render() {
        return (
            <div>
                <div className="detail-top">
                    <NavBar className="detail-left"
                            onBack={() => this.props.navigate("/", {replace: true})}
                    >
                    </NavBar>

                    <div className="detail-title-box">
                        <div className="detail-title-img">
                            <img src="./u=1275900944,311098575&fm=26&gp=0.jpg" alt=""/>
                        </div>
                        <div className="title-detail">
                            <h2>
                                <span>中国好凉皮</span>
                                <i className="fa fa-arrow-right"></i>
                            </h2>
                            <div className="detail-box">
                                <span>评价4.3</span>
                                <span>月售</span>
                                <span>商家配送约</span>
                            </div>

                        </div>
                        <div className="sum-detail">
                            <div className="img-detail">
                                <span className="sale-detail">“满减”<span>满减</span></span>
                                <span className="num-detail">满四十减1</span>
                            </div>
                            <div className="sale">
                                “3”个优惠
                            </div>
                        </div>
                        <p>公告：本店香锅不单炒，套餐必点！单加菜品需与套餐同时点！</p>
                    </div>
                </div>
                <HomeDetailNav/>

                <Outlet/>
            </div>
        )
    }
}

export default withRouter(HomeDetail)