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

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
)