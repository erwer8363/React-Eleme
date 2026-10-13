import {atom} from "jotai";
import {type Banner, fetchBanners, fetchGoods, type GoodInfo, type Special} from "@/api/find.ts";

export const activeItemAtom = atom(1)

export const specialsAtom = atom<Special[]>([])
export const hasMoreAtom = atom(true)
export const specialPageAtom = atom(1)

export const loadSpecialsAtom = atom(null, async (_get, set) => {
    const {total, Goods} = await fetchGoods()
    set(specialPageAtom, 1)
    set(specialsAtom, Goods)
    set(hasMoreAtom, Goods.length < total)
})

export const addHomeSpecialsAtom = atom(null, async (get, set, page: number) => {
    // page 为已加载的页码，请求下一页
    const next = page + 1
    const {total, Goods} = await fetchGoods(next)
    // 按 id 去重，避免接口忽略 page 参数时重复追加
    const merged = [...get(specialsAtom)]
    Goods.forEach(item => {
        if (!merged.some(m => m.id === item.id)) merged.push(item)
    })
    set(specialPageAtom, next)
    set(specialsAtom, merged)
    set(hasMoreAtom, merged.length < total)
})

export const bannersAtom = atom<Banner[]>([])
export const loadBannersAtom = atom(null, async (_get, set) => {
    set(bannersAtom, await fetchBanners())
})

export const goodDetailAtom = atom<GoodInfo | null>(null)

// 记录最新一次请求，丢弃过期响应，避免快速切换商品时显示错乱
let latestDetailReq = 0
export const loadGoodDetailAtom = atom(null, async (_get, set, goodId: number) => {
    const req = ++latestDetailReq
    set(goodDetailAtom, null)
    const {Goods} = await fetchGoods()
    if (req !== latestDetailReq) return
    set(goodDetailAtom, Goods.find(item => item.id === goodId) ?? null)
})
