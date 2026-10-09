// 引入通用样式
import './stylesheets/main.scss'
// import "./modules/post"
import "./modules/axios-utils"
// 使用rem.js
import "./modules/rem"

//引入swiper.min.css样式文件
// import "swiper/dist/css/swiper.min.css"
import {RouterProvider} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from "./store"

// import "video-react/dist/video-react.css";
import {createRoot} from "react-dom/client";
import {router} from "@/router";
import {unstableSetRender} from "antd-mobile";

unstableSetRender((node, container: any) => {
    container._reactRoot ||= createRoot(container)
    const root = container._reactRoot
    root.render(node)
    return async () => {
        await new Promise((resolve) => setTimeout(resolve, 0))
        root.unmount()
    }
})

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
)