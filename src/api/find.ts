import {Get} from "@/modules/axios-utils";

export interface GoodInfo {
    id: number;
    src: string;
    img: string;
    title: string;
    price: string;
    oriPrice: string;
    video: string;
    desc: string;
}

// 列表只用到商品的部分字段
export type Special = Pick<GoodInfo, 'id' | 'src' | 'price' | 'title'>

interface GoodsResponse {
    total: number;
    page: number;
    limit: number;
    Goods: GoodInfo[];
}

// goods.json 的响应没有 data 包装层，Goods 与 total 在顶层
export const fetchGoods = async (page?: number) => {
    const res = await Get<GoodsResponse>({url: '/react-ele/api/goods.json', data: page ? {page} : undefined})
    return res.data
}

export interface Banner {
    id: number;
    src: string;
}

export const fetchBanners = async () => {
    const res = await Get<{ Banners: Banner[] }>({url: '/react-ele/api/banners.json'})
    return res.data.Banners
}
