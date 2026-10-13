import "./index.scss"
import Swiper from "swiper"
import {Pagination} from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import {useAtomValue, useSetAtom} from "jotai";
import {bannersAtom, loadBannersAtom} from "@/atoms/find.ts";
import {useEffect} from "react";

const Banner = () => {
    const banners = useAtomValue(bannersAtom)
    const loadBanner = useSetAtom(loadBannersAtom)

    // 数据为空时才请求
    useEffect(() => {
        if (banners.length) return
        loadBanner().catch(console.error)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadBanner])

    // 数据渲染后再初始化 Swiper，卸载或数据变化时销毁，避免实例泄漏
    useEffect(() => {
        if (!banners.length) return
        const swiper = new Swiper(".home-banner", {
            modules: [Pagination],
            loop: true,
            pagination: {
                el: ".swiper-pagination"
            }
        })
        return () => {
            swiper.destroy(true, true)
        }
    }, [banners])

    return (
        <div className="home-banner swiper-container">
            <div className="swiper-wrapper find-wrapper">
                {banners.map(item => (
                    <div key={item.id} className="swiper-slide find-slide">
                        <img width="100%" src={item.src} alt=""/>
                    </div>
                ))}
            </div>
            <div className="swiper-pagination"></div>
        </div>
    )
}
export default Banner;
