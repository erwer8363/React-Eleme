import "./index.scss"
import {useEffect} from 'react'
import {NavLink, useLocation} from 'react-router'
import {useAtomValue, useSetAtom} from "jotai";
import {activeItemAtom} from "@/atoms/find.ts";

interface FindNav {
    id: number;
    path: string;
    icon: string;
    title: string;
    name: string;
}

// Find 页导航是固定的，不走接口
const navs: FindNav[] = [
    {id: 1, path: "/find/coin", icon: "usd", title: "金币", name: "coin"},
    {id: 2, path: "/find/record", icon: "file-o", title: "兑换记录", name: "record"}
]

const NavBar = () => {
    const activeItem = useAtomValue(activeItemAtom)
    const changeActiveItem = useSetAtom(activeItemAtom)
    const {pathname} = useLocation()

    // 路径不匹配时回落到第一项（与迁移前行为一致）
    useEffect(() => {
        changeActiveItem(navs.find(item => item.path === pathname)?.id ?? 1)
    }, [changeActiveItem, pathname])

    return (
        <div className="headerBox">
            {navs.map(item => (
                <NavLink key={item.id} to={item.path}>
                    <div className={"headerItem " + item.name + " " + (item.id === activeItem ? "active" : "")}>
                        <i className={"fa fa-" + item.icon}></i>
                        <span>{item.title}</span>
                    </div>
                </NavLink>
            ))}
        </div>
    )
}

export default NavBar
