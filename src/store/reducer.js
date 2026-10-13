//  * 合并的reducer


import {combineReducers} from "redux-immutable"
import home from "./home/reducer"

const reducer = combineReducers({
    home,

})
export default reducer;