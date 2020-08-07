import React, {Component} from 'react';
import {Col, Dropdown, Layout, Menu, Row} from 'antd';
import "./index.css"
import store from "../../store/store";
import {Link, Router, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {PrivateRoute} from "../../PrivateRoute";
import {history} from "../../App";
import Posts from "../posts";
import {LOGOUT} from "../../redux/blogForm/actions";

const {Header} = Layout;

class TopNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: '2',
        };
    }

    handleClick = e => {
        store.dispatch({type: LOGOUT, payload: "LOGOUT"})
    };

    handleNavClick =(e)=> {
        this.setState({
            current: e.key
        });
    };
    render() {
        let name = localStorage.getItem('login');
        let DropdownMenu = '';
        if (localStorage.getItem('login'))
            DropdownMenu = (
                <Menu style={{width: 150, position: "relative", top: 10}}>
                    <Menu.Item key="0" style={{fontSize: 20}}>
                        <div onClick={this.handleClick}>Sign Out</div>
                    </Menu.Item>
                </Menu>);
        else{
            DropdownMenu = (
                <Menu style={{width: 150, position: "relative", top: 10}}>
                    <Menu.Item key="2" style={{fontSize: 20}}>
                        <Link to={"/register"}>Sign Up</Link>
                    </Menu.Item>
                    <Menu.Item key="1" style={{fontSize: 20}}>
                        <Link to={"/login"}>Login</Link>
                    </Menu.Item>
                </Menu>);
        }
        return (
            <div>
                <Layout className={"topNav-layout"}>
                    <Header className="menu">
                        <Row type="flex">
                            <Col xs={{span: 6}} lg={{span: 10}}>
                                <img src={require('../../images/group-3.svg')} className="icon" alt={"BlogIcon"}/>
                            </Col>
                            <Col xs={12} lg={5}>
                                {localStorage.getItem('login')?
                                    (<Menu
                                    mode="horizontal"
                                    className={"menu"}
                                    onClick={this.handleNavClick}
                                    selectedKeys={[this.state.current]}
                                >
                                        <Menu.Item key="2" ><Link to={'/home/blogs'} className="menu-item" >Blogs</Link></Menu.Item>
                                        <Menu.Item key="3" ><Link to={'/home/posts'} className="menu-item" >Posts</Link></Menu.Item>
                                </Menu>):null}
                            </Col>
                            <Col lg={{span: 5, offset: 2}} xs={3}>
                                <div className="user-profile">
                                    <p id="userName">{name}</p>
                                </div>
                            </Col>
                            <Col lg={{span: 1, offset: 0}} xs={1}>
                                <div className="user-profile">
                                    <Dropdown overlay={DropdownMenu} trigger={['click']} placement={"bottomLeft"}
                                              className="dropdownMenu">
                                        <img src={require("../../images/profile.png")} onClick={e => e.preventDefault()}
                                             className="oval" alt={"ProfileImage"}/>
                                    </Dropdown>
                                </div>
                            </Col>
                        </Row>
                    </Header>
                </Layout>
                <Router history={history}>
                    <Switch>
                        <PrivateRoute exact path={'/posts'} component={Posts}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {...state};
};
export default connect(mapStateToProps)(TopNav);

