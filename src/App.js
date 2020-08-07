import React, {Component} from 'react';
import './App.css';
import Login from "./components/Login/Login";
import 'antd/dist/antd.css';
import Register from './components/Register/Register';
import {PrivateRoute} from './PrivateRoute'
import TopNav from "./components/topNav";
import {createBrowserHistory} from 'history';
import BlogCRUD from "./components/BlogCRUD";
import Blogs from './components/blogs'
import ViewBlog from "./components/ViewBlog";
import Posts from "./components/posts";
const Route = require("react-router-dom").Route;
export const history = createBrowserHistory();

class App extends Component {
    render() {
        const loadURL = window.location.href.split(".com")[1];
        if(loadURL === "/")
            history.push("/home/blogs")

        return (
            <div>
                <TopNav/>
                <Route exact path={"/login"} component={Login} />
                <Route exact path={"/register"} component={Register} />
                <Route path={"/home/blogs/:id"} component={ViewBlog} />
                <Route path={"/home/blogs"} component={Blogs} />
                <PrivateRoute exact path={"/home/posts"} component={Posts} />
                <PrivateRoute path={`/home/posts/:id`} component={BlogCRUD} />
            </div>
        );
    }
}

export default App;
