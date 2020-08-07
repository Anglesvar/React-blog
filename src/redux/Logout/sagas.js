import {takeLatest} from "redux-saga/effects";
import Axios from "axios";
import {history} from "../../App";
import {message} from "antd";

const apiURL = "https://api.backendless.com/1E43DBD5-EDAF-58B2-FFD9-43A41A8B0F00/04B19478-7A6E-494B-87F9-B0F24A1BE8A9";
export const watchDeleteUsers = function* () {
    yield takeLatest("LOGOUT", workerDeleteUsers);
};

function workerDeleteUsers(action) {
    try {
        const uri = apiURL + '/users/logout';
        Axios.get(uri, [localStorage.getItem('token')]).then(function (response) {
            localStorage.clear();
            history.push("/login")
        })
    } catch (e) {
        message.error(e);
    }
}
