import {call, put, takeLatest} from "redux-saga/effects";
import {REGISTER, SIGNUP_LOADING} from "./actions";
import Axios from "axios";
import store from "../../store/store";
import {message} from "antd";

const apiURL = "https://api.backendless.com/1E43DBD5-EDAF-58B2-FFD9-43A41A8B0F00/04B19478-7A6E-494B-87F9-B0F24A1BE8A9";

export const watchPostUsers = function* () {
    yield takeLatest(REGISTER, workerPostUsers);
};

function* workerPostUsers(action) {
    try {
        const uri = apiURL + '/data/Users';
        let result = yield call(Axios.post, uri, action.payload);
        yield put({type: "SIGNUP_USER", value: result.data});
        // history.push("/login")
        store.dispatch({type: SIGNUP_LOADING, payload: {loading: false}})
        yield put({type: "LOGIN", payload: action.payload});

    } catch {
        message.error("Failed")
    }
}
