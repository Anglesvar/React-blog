import {takeLatest} from "redux-saga/effects";
import store from "../../store/store";
import Axios from "axios";
import {message} from "antd";
import {history} from "../../App";

export const watchPostDisplay = function* () {
    yield takeLatest("POST_DISPLAY", workerPostDisplay);
};
export const watchDeleteFromBlog = function* () {
    yield takeLatest("DELETE_FROM_BLOG", workerDeleteFromBlog);
};
const apiURL = "https://api.backendless.com/1E43DBD5-EDAF-58B2-FFD9-43A41A8B0F00/04B19478-7A6E-494B-87F9-B0F24A1BE8A9";

function* workerPostDisplay(action) {
    store.dispatch({type: "LOADING", payload: {loading: true}});

    yield Axios.get(apiURL + '/data/posts/' + action.payload).then(function (response) {
        store.dispatch({type: "SHOW_SELECTED_BLOG", payload: response.data});
    });
    store.dispatch({type: "LOADING", payload: {loading: false}})
}

function* workerDeleteFromBlog(action) {
    store.dispatch({type: "LOADING", payload: {loading: true}});
    yield Axios.delete(action.payload.CoverImage).then(function (response) {
        Axios.delete(apiURL + '/data/posts/' + action.payload.objectId).then(function (response) {
            message.success("Blog Deleted Successfully", 2);
        });
    });

    yield Axios.get(apiURL + '/data/posts').then(function (response) {
        let pageState = store.getState();
        let offset = (pageState.blogFormReducer.current - 1) * 10;
        store.dispatch({type: "SHOW_BLOG_POST", payload: offset});
    });
    store.dispatch({type: "LOADING", payload: {loading: false}});
    history.push('/posts')
}
