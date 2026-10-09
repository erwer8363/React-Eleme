import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const MineIndex = () => {
    const userInfo = useSelector((s: any) => s.getIn(['mine', 'userInfo']));
    return <Navigate to={userInfo ? 'user' : 'login'} replace/>
}
export default MineIndex