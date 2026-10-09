import {createHashRouter, Navigate, type RouteObject} from "react-router-dom";
import {Find, Home, Mine, Order} from "@/components/pages";
import All from "@/components/pages/Home/Hpage/ALL";
import Rice from "@/components/pages/Home/Hpage/Rice";
import Coin from "@/components/pages/Find/Hpage/Coin";
import Record from "@/components/pages/Find/Hpage/Record";
import Login from "@/components/pages/Mine/Login";
import User from "@/components/pages/Mine/User";
import FindList from "@/components/pages/Find/findList";
import Cities from "@/components/pages/Home/CityList";
import HomeDetail from "@/components/pages/Home/HomeDetail";
import MineIndex from "@/components/pages/Mine/MineIndex";
import HdOrder from "@/components/pages/Home/HomeDetail/HPage/Order";
import HdBusiness from "@/components/pages/Home/HomeDetail/HPage/Business";
import HdComment from "@/components/pages/Home/HomeDetail/HPage/Comment";
import MainLayout from "@/layouts/MainLayout.tsx";

export const routes: RouteObject[] = [
    {path: '/', element: <Navigate to="/home" replace/>},
    {
        element: <MainLayout/>,
        children: [
            {path: 'home', element: <Home/>},
            {path: 'order', element: <Order/>},
            {path: 'eleme/all', element: <All/>},
            {path: 'eleme/rice', element: <Rice/>},
            {
                path: 'find',
                element: <Find/>,
                children: [
                    {index: true, element: <Navigate to="coin" replace/>},
                    {path: 'coin', element: <Coin/>},
                    {path: 'record', element: <Record/>},
                ]
            },
            {
                path: 'mine',
                element: <Mine/>,
                children: [
                    {index: true, element: <MineIndex/>},
                    {path: 'login', element: <Login/>},
                    {path: 'user', element: <User/>},
                ]
            }
        ]
    },
    // 不带底部栏的页面
    {path: 'findlist/:id', element: <FindList/>},
    {path: 'cities', element: <Cities/>},
    {
        path: 'homedetail',
        element: <HomeDetail/>, // 内部放 <Outlet />
        children: [
            {index: true, element: <Navigate to="order" replace/>},
            {path: 'order', element: <HdOrder/>},
            {path: 'business', element: <HdBusiness/>},
            {path: 'comment', element: <HdComment/>},
        ],
    },

    {path: '*', element: <Navigate to="/home" replace/>},
]

export const router = createHashRouter(routes)