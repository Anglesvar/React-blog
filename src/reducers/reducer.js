import {combineReducers} from 'redux';
import {loginReducer} from '../redux/login/reducer';
import {signUpReducer} from "../redux/register/reducer";
import {blogFormReducer} from "../redux/blogForm/reducer";
import {ViewBlogReducer} from "../redux/ViewBlog/reducer";


const reducer = combineReducers({loginReducer, signUpReducer, blogFormReducer, ViewBlogReducer});
export default reducer;