import {Navigate} from "react-router-dom";
import {useAtomValue} from "jotai";
import {userInfoAtom} from "@/atoms/mine.ts";

const MineIndex = () => {
    const userInfo = useAtomValue(userInfoAtom);
    return <Navigate to={userInfo ? 'user' : 'login'} replace/>
}
export default MineIndex