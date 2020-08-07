import {applyMiddleware, createStore} from 'redux';
import reducer from '../reducers/reducer'
import reduxSaga from "redux-saga";
import rootSaga from "../sagas";
import {routerMiddleware} from 'react-router-redux';
import {createBrowserHistory} from 'history';

export const history = createBrowserHistory();
const routerMiddlewares = routerMiddleware(history);

const sagaMiddleware = reduxSaga();
const blogMiddleware = [sagaMiddleware, routerMiddlewares];
const store = createStore(reducer, {}, applyMiddleware(...blogMiddleware));
sagaMiddleware.run(rootSaga);

export default store;


