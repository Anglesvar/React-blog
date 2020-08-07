import { takeLatest} from 'redux-saga/effects';
import Axios from 'axios';
import {message} from 'antd';
import store from "../store/store";
const apiURL = "https://api.backendless.com/1E43DBD5-EDAF-58B2-FFD9-43A41A8B0F00/04B19478-7A6E-494B-87F9-B0F24A1BE8A9";


export const watchBlogPost = function* () {
    yield takeLatest("BLOG_DATA", workerBlogPost);

};

export const watchDeleteBlogPost = function* () {
    yield takeLatest("DELETE_BLOG_POST", workerDeleteBlogPost);
};


function* workerDeleteBlogPost(action) {
    store.dispatch({type: "LOADING", payload: {loading: true}});
    yield Axios.delete(action.payload.CoverImage).then(function (response) {
        Axios.delete(apiURL + '/data/posts/' + action.payload.blog).then(function (response) {
            message.success("Blog Deleted Successfully", 2);
        });
    });

    yield Axios.get(apiURL + '/data/posts').then(function (response) {
        let pageState = store.getState();
        store.dispatch({type: "SHOW_BLOG_POST", payload: pageState.blogFormReducer.current - 1});
    });
    store.dispatch({type: "LOADING", payload: {loading: false}})
}




function* workerBlogPost(data) {
    yield store.dispatch({type: "LOADING", payload: {loading: true}});
    const uri = apiURL + '/data/posts';
    data.value.author = localStorage.getItem('login');
    yield Axios.post(uri, data.value, {headers: {"user-token": localStorage.getItem('token')}}).then(function (response) {
        message.success("Blog Saved Successfully.");
    });
    store.dispatch({type: "DRAWER", payload: {visible: false}});
    store.dispatch({type: "LOADING", payload: {loading: false}});
    store.dispatch({type: "SHOW_BLOG_POST", payload: data.value.offset})
}

