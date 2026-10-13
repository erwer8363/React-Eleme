import "./index.scss"
import {NavLink} from "react-router"
import {useAtomValue, useSetAtom} from "jotai";
import {addHomeSpecialsAtom, hasMoreAtom, loadSpecialsAtom, specialPageAtom, specialsAtom} from "@/atoms/find.ts";
import {useEffect, useState} from "react";

const Specials = () => {
    const specials = useAtomValue(specialsAtom)
    const specialPage = useAtomValue(specialPageAtom)
    const hasMore = useAtomValue(hasMoreAtom)
    const getListInfo = useSetAtom(loadSpecialsAtom)
    const addHomeSpecials = useSetAtom(addHomeSpecialsAtom)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)

    const load = () => {
        setLoading(true)
        setError(false)
        getListInfo()
            .catch(err => {
                console.error(err)
                setError(true)
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        load()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getListInfo])

    const renderSpecials = () => {
        return (
            <div>
                {
                    specials.map(item => {
                        return (
                            <div key={item.id} className="item">
                                <div className="theme-color">
                                    <h3 className="itemTitle">
                                        {item.title}
                                    </h3>
                                    <span className="itemCredits">
                                                {item.price}
                                        <span className="unitName">
                                                        金币
                                            </span>
                                        </span>
                                    <span className="corner">
                                                抽奖
                                            </span>
                                </div>
                                <div className="imgWrap">
                                    <NavLink to={"/findlist/" + item.id}>
                                        <img src={item.src} alt=""/>
                                    </NavLink>
                                </div>
                            </div>
                        )
                    })
                }
                {error && (
                    <div className="load item">
                        <p onClick={load} className="loadmore">加载失败，点击重试</p>
                    </div>
                )}
                {loading && !error && (
                    <div className="load item">
                        <p className="loadmore">加载中...</p>
                    </div>
                )}
                {hasMore && !loading && !error && (
                    <div className="load item">
                        <p onClick={loadMore} className="loadmore">{loadingMore ? "加载中..." : "点击加载更多"}</p>
                    </div>
                )}
            </div>
        )
    }
    const loadMore = () => {
        if (loadingMore) return
        setLoadingMore(true)
        addHomeSpecials(specialPage)
            .catch(console.error)
            .finally(() => setLoadingMore(false))
    }
    return (
        <div className="specials">
            <img className="banner-single-image" width="100%"
                 src="https://yun.duiba.com.cn/images/201808/fh9iw1evwk.jpg?x-oss-process=image/format,webp" alt=""/>
            <section className="bannerBox">
                <div className="mainShowcase">
                    <img src="https://yun.duiba.com.cn/images/201812/sch8war88p.png" alt=""/>
                </div>
                <div className="sideShowcase">
                    <div className="topShowcase">
                        <img src="https://yun.duiba.com.cn/images/201906/hhpc0nsoc6.jpeg" alt=""/>
                    </div>
                    <div className="bottomShowcase">
                        <img src="https://yun.duiba.com.cn/images/201808/iq43cwcj43.jpg" alt=""/>
                    </div>
                </div>
            </section>
            <div className="floor">
                <div className="floorHeader">
                    大家都在兑
                </div>
                <div className="floorItem">
                    {renderSpecials()}
                </div>
            </div>
        </div>
    )
}
export default Specials