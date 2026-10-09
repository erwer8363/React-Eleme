import {Outlet} from "react-router-dom";
import AppFooter from "@/components/commons/AppFooter";

export default function MainLayout() {
    return (
        <>
            <Outlet/>
            <AppFooter/>
        </>
    )
}