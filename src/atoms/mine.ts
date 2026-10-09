import {atom} from "jotai";

export interface UserInfo {
    username: string;
}

export const userInfoAtom = atom<UserInfo | null>(null)

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const loginByTextAtom = atom(
    null,
    async (_get, set, {phone, code}: { phone: string; code: string }) => {
        await sleep(1000)
        if (phone === '110' && code === '456') {
            set(userInfoAtom, {username: '马云'})
            return '手机登录成功!';
        }
        throw new Error('手机登录失败!')
    })

export const loginByUserAtom = atom(
    null,
    async (_get, set, {username, password}: { username: string; password: string }) => {
        await sleep(1000)
        if (username === '123' && password === '456') {
            set(userInfoAtom, {username: '马云'})
            return '用户登录成功!'
        }
        throw new Error('用户登录失败!')
    })

export const exitAtom = atom(null, (_get, set) => {
    set(userInfoAtom, null)
})