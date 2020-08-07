import React from "react";
import './/index.css'
import {Button, Form, Icon, Input, message, Upload} from 'antd';
import {connect} from "react-redux";
import store from "../../store/store";
import {DRAWER} from "../../redux/BlogCRUD/action";
import {BLOG_FORM_DATA} from "../../redux/blogForm/actions";
import {LOADING, EDIT_POST} from "../../redux/dragger/actions";

const {TextArea} = Input;

class NormalLoginForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (this.props.blogFormReducer.edit === true) {
                    store.dispatch({type: LOADING, payload: {loading: true, required: false}});
                    store.dispatch({
                        type: EDIT_POST, payload: {
                            blogData: values, imageUpload: this.props.blogFormReducer.imageUpload,
                            CoverImage: this.props.blogFormReducer.currentData.CoverImage,
                            objectId: this.props.blogFormReducer.currentData.objectId
                        }
                    })
                } else {
                    store.dispatch({type: LOADING, payload: {loading: true}});
                    values.offset = this.props.blogFormReducer.offset;
                    store.dispatch({type: BLOG_FORM_DATA, payload: values});
                }
            }
        });
        this.reset()
    };
    normFile = file => {
        store.dispatch({type: DRAWER, payload: {imageUpload: true}});
        const isJpgOrPng = file.file.type === 'image/jpeg' || file.file.type === 'image/png';
        const isLt2M = file.file.size / 1024 / 1024 < 2;
        if (isJpgOrPng) {
            if (isLt2M) {
                if (Array.isArray(file)) {
                    return file;
                }
                return file && file.fileList;
            }else{
                message.error('Image must smaller than 2MB!');
            }
        }else{
            message.error('You can only upload JPG/PNG file!');
        }
    };
    reset = () => {
        store.dispatch({type: DRAWER, payload: {imageUpload: false}});
        this.props.form.resetFields()
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="blog-data-form">

                <Form.Item label="Title">
                    {getFieldDecorator('title', {
                        initialValue: this.props.blogFormReducer.currentData.title,
                        rules: [{required: true, message: 'Please input the title!'}],
                    })
                    (
                        <Input
                            placeholder="Title"
                        />,
                    )}
                </Form.Item>
                <Form.Item label="Cover Image">
                    {getFieldDecorator('CoverImage', {
                        valuePropName: 'fileList',multiple:false,
                        getValueFromEvent: this.normFile,
                        rules: [
                            {
                                required: this.props.blogFormReducer.required,
                                message: 'Please insert an image',
                            }]
                    })(
                        <Upload.Dragger name="files">
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox"/>
                            </p>
                            {this.props.blogFormReducer.edit ? (<img height={100} width={300}
                                                                     src={this.props.blogFormReducer.currentData.CoverImage} alt={"Cover"}/>) : this.props.blogFormReducer.CoverImage}
                            <p className="ant-upload-text">Cover Image</p>
                            <p className="ant-upload-hint">Image Format: .jpg .png</p>
                        </Upload.Dragger>,
                    )}
                </Form.Item>
                <Form.Item label="Content">
                    {getFieldDecorator('content', {
                        initialValue: this.props.blogFormReducer.currentData.content,
                        rules: [{required: true, message: 'Please input the title!'}],
                    })(
                        <TextArea rows={7} className={"blog-data-form-input"} style={{direction:'ltr'}}/>
                    )}
                </Form.Item>
                <Form.Item
                    style={{
                        position: 'relative',
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e8e8e8',
                        padding: '10px 16px',
                        textAlign: 'right',
                        right: 0,
                        background: '#fff',
                        borderRadius: '0 0 4px 4px'
                    }}
                >
                    <Button onClick={this.props.onClose}>Cancel</Button>
                    <Button type="primary" htmlType="submit" className="blog-data-form-button"
                            loading={this.props.blogFormReducer.loading}>
                        Save
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const mapStateToProps = state => {
    return {...state};
};
const DraggerForm = Form.create({name: 'normal_login'})(NormalLoginForm);

export default connect(mapStateToProps)(DraggerForm);