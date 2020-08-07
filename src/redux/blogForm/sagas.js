import {DATA_COUNT_LOADER, DATA_FETCH, INITIAL_DATA_FETCH, SHOW_BLOG} from "./actions";
import store from "../../store/store";
import {LOADING} from "../dragger/actions";
import Axios from "axios";
import {takeLatest} from "@redux-saga/core/effects";

export const watchDataFetch = function* (){
    yield takeLatest(DATA_FETCH,workerDataFetch);
}

export const watchDataCount = function* (){
    yield takeLatest(DATA_COUNT_LOADER, workerDataCountLoader);
}

function* workerDataFetch(action){
    store.dispatch({type:LOADING,payload:{loading:true}})
    const RetrieveURL = "https://api.backendless.com/1E43DBD5-EDAF-58B2-FFD9-43A41A8B0F00/04B19478-7A6E-494B-87F9-B0F24A1BE8A9/data/posts?pageSize=10&offset=" + action.payload.offset + '&sortBy=created%20desc';
    yield Axios.get(RetrieveURL).then((response) => {
        if(!action.payload.mount) {
            store.dispatch({type: SHOW_BLOG, payload: response.data})
        }
        else {
            store.dispatch({type: INITIAL_DATA_FETCH, payload: response.data})
            let objectId = window.location.href;
            objectId = objectId.split("blogs/")[1];
            if(!objectId)
                store.dispatch({type: "COMMENT_LOAD", payload: response.data[0]});
        }
    });
    store.dispatch({type:LOADING,payload: {loading:false}})
}

function * workerDataCountLoader(){
    yield Axios.get("https://api.backendless.com/1E43DBD5-EDAF-58B2-FFD9-43A41A8B0F00/04B19478-7A6E-494B-87F9-B0F24A1BE8A9/data/posts/count").then((response) => {
        store.dispatch({type:"UPDATE_COUNT", payload:response.data})
    });
}

