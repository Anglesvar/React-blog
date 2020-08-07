import {Button, Form, Input} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';
import Header from '../Header/Header'
import '../Register/register.css'
import {connect} from 'react-redux';
import store from '../../store/store';
import {history} from "../../App";
import {REGISTER, SIGNUP_LOADING} from "../../redux/register/actions";

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                store.dispatch({type: SIGNUP_LOADING, payload: {loading: true}})
                store.dispatch({type: REGISTER, payload: values});
            }
        });
    };

    handleConfirmBlur = e => {
        const {value} = e.target;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };

    compareToFirstPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };
    a;

    validateToNextPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirmPassword'], {force: true});
        }
        callback();
    };

    render() {
        if (localStorage.getItem("auth"))
            history.push("/home/blogs");
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <div className="left-portion">
                    <Header/>

                    <Form onSubmit={this.handleSubmit} className="registration-form">
                        <label>First name</label>
                        <label style={{marginLeft: 130}}>Last name</label>
                        <div className="row">
                            <Form.Item>
                                {getFieldDecorator('firstname', {
                                    rules: [{required: true, message: 'Please input your First name!'}],
                                })(
                                    <Input className="first-name"
                                           placeholder="First name"
                                    />,
                                )}
                            </Form.Item>

                            <Form.Item>
                                {getFieldDecorator('lastname', {
                                    rules: [{required: true, message: 'Please input your Last name'}],
                                })(
                                    <Input className="last-name"
                                           placeholder="Last name"
                                    />,
                                )}
                            </Form.Item>
                        </div>
                        <label>Email</label>
                        <Form.Item className="">
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        type: 'email',
                                        message: 'Please enter a valid E-mail!!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ],
                            })(
                                <Input className={"input-box"}
                                       placeholder="Email"
                                />,
                            )}
                        </Form.Item>

                        <label>Password</label>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: 'Please input your Password!'},{validator: this.validateToNextPassword},{min:8}],
                            })(
                                <Input
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <label>Confirm password</label>
                        <Form.Item>
                            {getFieldDecorator('confirmPassword', {
                                rules: [{required: true, message: 'Please input your Password !'}, {
                                    validator: this.compareToFirstPassword,
                                },],
                            })(
                                <Input
                                    type="password" onBlur={this.handleConfirmBlur}
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button button" loading={this.props.signUpReducer.loading}>
                                SignUp
                            </Button>
                        </Form.Item>
                    </Form>
                    <footer>Already have an account?<Link to="/login">Sign in</Link></footer>
                </div>

                <div className="right-portion"/>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return state;
};

const Register = Form.create({name: 'register'})(RegistrationForm);

export default connect(mapStateToProps)(Register);
