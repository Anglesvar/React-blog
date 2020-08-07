import {takeLatest,put} from "redux-saga/effects";
import Axios from "axios";
import {message} from "antd";
import store from "../../store/store";
import {BLOG_FORM_DATA} from "../blogForm/actions";
const apiURL = "https://api.backendless.com/1E43DBD5-EDAF-58B2-FFD9-43A41A8B0F00/04B19478-7A6E-494B-87F9-B0F24A1BE8A9";

export const watchEditPost = function* () {
    yield takeLatest("EDIT_POST", workerEditPost);
};
export const watchBlogImagePost = function* () {
    yield takeLatest(BLOG_FORM_DATA, workerBlogImagePost);
};

function* workerEditPost(action) {
    if (action.payload.imageUpload === true) {
        let fileName = '';
        fileName = action.payload.CoverImage.split('/files/images/')[1];
        const uri = "https://backendlessappcontent.com/1E43DBD5-EDAF-58B2-FFD9-43A41A8B0F00/04B19478-7A6E-494B-87F9-B0F24A1BE8A9/files/images/";
        let postURL = '';
        if (action.payload.blogData.CoverImage[0].type === 'image/jpeg') {
            postURL = uri + action.payload.CoverImage[0].uid + ".jpg";
        } else if (action.payload.blogData.CoverImage[0].type === 'image/png') {
            postURL = uri + action.payload.blogData.CoverImage[0].uid + ".png";
        }
        action.payload.blogData.CoverImage[0].originFileObj.uid = fileName.split('.')[0];
        let formData = new FormData();
        formData.append('image', action.payload.blogData.CoverImage[0].originFileObj);
        yield Axios.post(postURL + '/?overwrite=true', formData, {
            headers: {
                'content-type': 'multipart/form-data',
                'user-token': localStorage.getItem('token')
            }
        }).then(function (response) {
            action.payload.blogData.CoverImage = response.data.fileURL;
        });

        yield Axios.put(apiURL + '/data/posts/' + action.payload.objectId, action.payload.blogData, {'headers': {'user-token': localStorage.getItem('token')}}).then(function (response) {
            message.success("Blog Updated Successfully!!")
        });
        store.dispatch({
            type: "SHOW_SELECTED_BLOG",
            payload: {
                title: action.payload.blogData.title,
                CoverImage: action.payload.blogData.CoverImage,
                content: action.payload.blogData.content,
                objectId: action.payload.objectId
            }
        });
        store.dispatch({type: "LOADING", payload: {loading: false}});
        store.dispatch({type: "DRAWER", payload: {visible: false, imageUpload: false}});
    } else {
        yield Axios.put(apiURL + '/data/posts/' + action.payload.objectId, {
                "title": action.payload.blogData.title,
                "content": action.payload.blogData.content
            },
            {headers: {"user-token": localStorage.getItem('token')}}).then(function (response) {
            message.success("Blog Updated Successfully!!")
        });
        store.dispatch({type: "LOADING", payload: {loading: false}});
        store.dispatch({type: "DRAWER", payload: {visible: false, imageUpload: false}});
        store.dispatch({
            type: "SHOW_SELECTED_BLOG", payload: {
                title: action.payload.blogData.title,
                CoverImage: action.payload.CoverImage,
                content: action.payload.blogData.content
                , objectId: action.payload.objectId
            }
        });
    }
}

function* workerBlogImagePost(file) {
    const uri = "https://backendlessappcontent.com/1E43DBD5-EDAF-58B2-FFD9-43A41A8B0F00/04B19478-7A6E-494B-87F9-B0F24A1BE8A9/files/images/";
    let postURL = '';
    if (file.payload.CoverImage[0].type === 'image/jpeg') {
        postURL = uri + file.payload.CoverImage[0].uid + ".jpg";
    } else if (file.payload.CoverImage[0].type === 'image/png') {
        postURL = uri + file.payload.CoverImage[0].uid + ".png";
    }

    let formData = new FormData();
    formData.append('image', file.payload.CoverImage[0].originFileObj);

    yield Axios.post(postURL, formData, {
        headers: {
            'content-type': 'multipart/form-data',
            'user-token': localStorage.getItem('token')
        }
    }).then(function (response) {
        file.payload.CoverImage = response.data.fileURL;
    });
    yield put({type: "BLOG_DATA", value: {...file.payload}})
}
