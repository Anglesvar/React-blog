import {
    watchBlogPost,
    watchDeleteBlogPost,
} from '../sagas/sagas';
import {watchShowBlogPost} from "../redux/posts/sagas";
import {watchDataFetch,watchDataCount} from "../redux/blogForm/sagas";
import {watchViewData,watchClaps,watchUnClap,watchClapCountLoad,watchPostComment} from "../redux/ViewBlog/sagas";
import {watchGetUsers} from "../redux/login/sagas";
import {watchDeleteUsers} from "../redux/Logout/sagas";
import {watchPostUsers} from "../redux/register/sagas";
import {watchSearch} from "../redux/search/sagas";
import {watchEditPost,watchBlogImagePost} from "../redux/dragger/sagas";
import {watchDeleteFromBlog} from "../redux/BlogCRUD/sagas";
import {watchPostDisplay} from "../redux/BlogCRUD/sagas";
import {all} from 'redux-saga/effects';

export default function* rootSaga() {
    yield all([watchPostUsers(),
        watchGetUsers(),
        watchDeleteUsers(),
        watchBlogImagePost(),
        watchBlogPost(),
        watchShowBlogPost(),
        watchDeleteBlogPost(),
        watchSearch(),
        watchPostDisplay(),
        watchEditPost(),
        watchDeleteFromBlog(),
        watchPostComment(),
        watchViewData(),
        watchClaps(), watchUnClap(), watchClapCountLoad(),
        watchDataCount(),
        watchDataFetch()
    ])
}