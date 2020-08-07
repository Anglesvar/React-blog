import store from "../../store/store";
import {LOADING} from "../dragger/actions";
import Axios from "axios";
import {INITIAL_DATA_FETCH} from "../blogForm/actions";
import {takeLatest} from "@redux-saga/core/effects";
const apiURL = "https://api.backendless.com/1E43DBD5-EDAF-58B2-FFD9-43A41A8B0F00/04B19478-7A6E-494B-87F9-B0F24A1BE8A9";

export const watchShowBlogPost = function* () {
    yield takeLatest("SHOW_BLOG_POST", workerShowBlogPost);
};


function* workerShowBlogPost(action) {
    store.dispatch({type: LOADING, payload: {loading: true}});
    const RetrieveURL = "https://api.backendless.com/1E43DBD5-EDAF-58B2-FFD9-43A41A8B0F00/04B19478-7A6E-494B-87F9-B0F24A1BE8A9/data/posts?pageSize=10&offset=" + action.payload + "&where=ownerId%3D'" + localStorage.getItem('ownerId') + "'&sortBy=created%20desc";
    yield Axios.get(RetrieveURL).then((response) => {
        store.dispatch({type: INITIAL_DATA_FETCH, payload: response.data});
        Axios.get(apiURL + '/data/posts/count?where=ownerId%3D%27' + localStorage.getItem('ownerId') + "%27").then(function (response) {
            store.dispatch({type: "PAGE_TOTAL", payload: response.data})
        })
    });
    store.dispatch({type: "LOADING", payload: {loading: false}})
}