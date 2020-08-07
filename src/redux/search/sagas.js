import {takeLatest} from "redux-saga/effects";
import store from "../../store/store";
import {LOADING} from "../dragger/actions";
import Axios from "axios";

const apiURL = "https://api.backendless.com/1E43DBD5-EDAF-58B2-FFD9-43A41A8B0F00/04B19478-7A6E-494B-87F9-B0F24A1BE8A9";

export const watchSearch = function* () {
    yield takeLatest("SEARCH", workerSearch);
};

function* workerSearch(action) {
    store.dispatch({type:LOADING,payload:true})
    if(action.payload.searchFrom === "posts"){
        yield Axios.get(apiURL + '/data/posts?where=ownerId%20%3D%20%27'+localStorage.getItem('ownerId')+'%27%20AND%20title%20LIKE%20%27'+action.payload.searchTerm+'%25%27').then(function (response) {
            store.dispatch({type: "SHOW_SEARCH_BLOG", payload: response.data})
        })
    }
    else{
        yield Axios.get(apiURL + '/data/posts?where=title%20LIKE%20%27' + action.payload.searchTerm + '%25%27').then(function (response) {
            store.dispatch({type: "SHOW_SEARCH_BLOG", payload: response.data})
        })
    }
    store.dispatch({type:LOADING,payload:false})
}
