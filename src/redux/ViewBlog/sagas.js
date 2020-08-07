import Axios from "axios";
import store from "../../store/store";
import { takeLatest} from 'redux-saga/effects';
import {message} from "antd";
const apiURL = "https://api.backendless.com/1E43DBD5-EDAF-58B2-FFD9-43A41A8B0F00/04B19478-7A6E-494B-87F9-B0F24A1BE8A9";
let count = 0;

export const watchViewData = function* () {
    yield takeLatest("VIEW_DATA", workerViewData);
};
export const watchClaps = function* () {
    yield takeLatest("CLAPS", workerClaps);
};
export const watchUnClap = function* () {
    yield takeLatest("UNCLAP", workerUnClap);
};

export const watchClapCountLoad = function* () {
    yield takeLatest("CLAP_COUNT_LOAD", workerClapCountLoad);
};
export const watchPostComment = function* () {
    yield takeLatest("POST_COMMENT", workerPostComment);
};


function* workerViewData(action) {
    const RetrieveURL = "https://api.backendless.com/1E43DBD5-EDAF-58B2-FFD9-43A41A8B0F00/04B19478-7A6E-494B-87F9-B0F24A1BE8A9/data/posts/" + action.payload;
    yield Axios.get(RetrieveURL).then((response) => {
        store.dispatch({type: "COMMENT_LOAD", payload: response.data});
        count = response.data.claps.length;
        store.dispatch({type: "CLAP_COUNT_INCREASE", payload: count});
        store.dispatch({type: "SUBMIT_COMMENT", payload: false})
    });
}
let objectId=''
function* workerClaps(action) {
    yield Axios.post(apiURL + "/data/claps", {username: action.payload.username, user_image: action.payload.user_image},
        {headers: {'user-token': localStorage.getItem('token')}}).then(function (response) {
        store.dispatch({type: "STORE_OBJECTID", payload: response.data.objectId});
        const uri = apiURL + "/data/posts/" + action.payload.objectId + "/claps";
        Axios.put(uri, [response.data.objectId], {headers: {'user-token': localStorage.getItem('token')}}).then(function (response) {
                // store.dispatch({type:"CLAP_COUNT_INCREASE",payload:count})
                message.success("You Liked the post");
                store.dispatch({type: "CLAP_COUNT_INCREASE", payload: action.payload.count});

                objectId = window.location.href;
                objectId = objectId.split("blogs/")[1];
                if(!objectId) {
                    objectId = action.payload.objectId
                }
            store.dispatch({type: "CLAP_COUNT_LOAD", payload: objectId})
            }
        )
    })

}

function* workerUnClap(action) {
    yield Axios.delete(apiURL + "/data/claps/" + action.payload).then(function (response) {
        message.success("You unLiked the post");
        store.dispatch({type: "CLAP_COUNT_DECREASE", payload: 1});
    });
    let objectId_check = window.location.href;
    objectId_check = objectId.split("blogs/")[1];
    if(objectId_check)
        objectId = objectId_check
    yield store.dispatch({type: "CLAP_COUNT_LOAD", payload: objectId})
}

function* workerClapCountLoad(action) {
    const RetrieveURL = "https://api.backendless.com/1E43DBD5-EDAF-58B2-FFD9-43A41A8B0F00/04B19478-7A6E-494B-87F9-B0F24A1BE8A9/data/posts/" + action.payload;
    yield Axios.get(RetrieveURL).then((response) => {
        store.dispatch({type: "CLAP_LOAD", payload: response.data.claps});
    });
}


function* workerPostComment(action) {
    let objectId = action.payload.objectId;
    yield Axios.post(apiURL + "/data/commentsData", {
            author: action.payload.author,
            avatar: action.payload.avatar,
            content: action.payload.content
        },
        {headers: {'user-token': localStorage.getItem('token')}}).then(function (response) {
        const uri = apiURL + "/data/posts/" + action.payload.objectId + "/comments";
        Axios.put(uri, [response.data.objectId], {headers: {'user-token': localStorage.getItem('token')}}).then(function (response) {
                store.dispatch({type: "VIEW_DATA", payload: objectId});
                store.dispatch({type: "COMMENT_VALUE", payload: ''})
            }
        )
    })
}
