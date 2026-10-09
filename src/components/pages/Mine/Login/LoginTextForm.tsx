import React, {type FC, useRef} from "react"
import {Toast} from 'antd-mobile';
import {useSetAtom} from "jotai";
import {loginByTextAtom} from "@/atoms/mine";

interface LoginTextProps {
    handleSuccess: () => void;
}

const LoginTextForm: FC<LoginTextProps> = ({handleSuccess}) => {
    const phoneRef = useRef<HTMLInputElement>(null);
    const codeRef = useRef<HTMLInputElement>(null);

    // const userInfo = useAtomValue(userInfoAtom)
    const loginByText = useSetAtom(loginByTextAtom)

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await loginByText({
                phone: phoneRef.current!.value,
                code: codeRef.current!.value,
            })
            Toast.show({icon: 'success', content: res, duration: 1000});
            handleSuccess()
        } catch (err: any) {
            const message = err instanceof Error ? err.message : String(err)
            Toast.show({
                icon: 'fail', content: message, afterClose: () => {
                    codeRef.current!.value = ""
                    codeRef.current!.focus()
                }
            })
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input ref={phoneRef} type="text" placeholder="手机号:110"/>
            </div>
            <div className="form-group">
                <input ref={codeRef} type="text" placeholder="验证码:456"/>
            </div>
            <button type="submit" className="login">登录</button>
        </form>
    )
}

export default LoginTextForm