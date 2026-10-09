import React, {type FC, useRef} from "react"
import {Toast} from 'antd-mobile';
import {useSetAtom} from "jotai";
import {loginByUserAtom} from "@/atoms/mine";

interface LoginUserFormProps {
    handleSuccess: () => void;
}

const LoginUserForm: FC<LoginUserFormProps> = ({handleSuccess}) => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null)

    const loginByUser = useSetAtom(loginByUserAtom)

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        try {
            const res = await loginByUser({username: usernameRef.current!.value, password: passwordRef.current!.value});
            Toast.show({icon: 'success', content: res, duration: 1000});
            handleSuccess();
        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            Toast.show({
                icon: 'fail', content: message, afterClose: () => {
                    passwordRef.current!.value = ""
                    passwordRef.current!.focus()
                }
            });
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input ref={usernameRef} type="text" placeholder="用户名:123"/>
            </div>
            <div className="form-group">
                <input ref={passwordRef} type="text" placeholder="密码:456"/>
            </div>
            <button type="submit" className="login">登录</button>
        </form>
    )
}

export default LoginUserForm