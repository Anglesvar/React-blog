import {Button, Form, Input} from 'antd';
import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {LOGIN, LOGIN_LOADING} from "../../redux/login/actions";
import Header from '../Header/Header';
import './login.css';
import store from '../../store/store';
import {connect} from 'react-redux';
import {history} from "../../App";

class NormalLoginForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                store.dispatch({type: LOGIN_LOADING, payload: {loading: true}})
                store.dispatch({type: LOGIN, payload: values});
            }
        });
    };

    render() {
        if (localStorage.getItem('auth')) {
            history.push('/home/blogs');
        }
        const {getFieldDecorator} = this.props.form;
        return (
            <Fragment>
                <div className="left-portion">
                    <Header/>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <label>Email</label>
                        <Form.Item>
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ],
                            })(
                                <Input
                                    className={"input-box"}
                                    placeholder="Email"
                                />,
                            )}
                        </Form.Item>
                        <label>Password</label>
                        <a href="/" className={"link"}>Forgot Password?</a>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: 'Please input your Password!'}],
                            })(
                                <Input
                                    className={"input-box"}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={this.props.loginReducer.loading} className="login-form-button button">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                    <footer>Don't have an account?<Link to="./Register">Signup</Link></footer>
                </div>
                <div className="right-portion"> </div>
            </Fragment>
        );
    }
}

const Login = Form.create({name: 'normal_login'})(NormalLoginForm);
const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(Login);
