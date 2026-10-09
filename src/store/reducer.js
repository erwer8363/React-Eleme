//  * 合并的reducer


import {combineReducers} from "redux-immutable"
import commons from './commons/reducer'
import find from './find/reducer'
import order from './order/reducer'
import home from "./home/reducer"
import dinner from "./dinner/reducer"

const reducer = combineReducers({
    commons,
    find,
    order,
    home,
    dinner

})
export default reducer;