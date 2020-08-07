import {put, takeLatest} from "redux-saga/effects";
import {LOGIN, LOGIN_LOADING} from "./actions";
import Axios from "axios";
import {history} from "../../App";
import {message} from "antd";
import store from "../../store/store";

const apiURL = "https://api.backendless.com/1E43DBD5-EDAF-58B2-FFD9-43A41A8B0F00/04B19478-7A6E-494B-87F9-B0F24A1BE8A9";

export const watchGetUsers = function* () {
    yield takeLatest(LOGIN, workerGetUsers);
};


function* workerGetUsers(action) {
    try {
        store.dispatch({type: LOGIN_LOADING, payload: {loading:true}})
        const uri = apiURL + '/users/login';
        let result = Axios.post(uri, {
            login: action.payload.email,
            password: action.payload.password
        }).then(function (response) {
            localStorage.setItem('token', response.data['user-token']);
            localStorage.setItem('login', response.data.firstname);
            localStorage.setItem('auth', true);
            localStorage.setItem('ownerId', response.data.objectId);
            message.success("Log In Successful");
            store.dispatch({type: LOGIN_LOADING, payload: {loading:false}})
            history.push('/home/blogs');
        });

        yield put({type: "LOGIN_USER", value: result.data});

    } catch {
        message.error("Failed")
    }
}
