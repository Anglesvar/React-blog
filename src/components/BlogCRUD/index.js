import React from "react";
import {Button, Drawer, Icon, message, PageHeader, Popconfirm, Skeleton} from 'antd';
import '../BlogCRUD/index.css';
import {connect} from "react-redux";
import store from "../../store/store";
import DraggerForm from "../dragger";
import {CLEAR_POST, DELETE_FROM_BLOG, DRAWER, POST_DISPLAY} from "../../redux/BlogCRUD/action";

var location = '';

class BlogCRUD extends React.Component {
    componentDidMount() {
        store.dispatch({type: CLEAR_POST, payload: ''})
        location = window.location.href;
        location = location.split('/posts/')[1];
        store.dispatch({type: POST_DISPLAY, payload: location});
    }

    showDrawer = () => {
        store.dispatch({type: DRAWER, payload: {visible: true, edit: true}});
    };
    onClose = () => {
        store.dispatch({type: DRAWER, payload: {visible: false, edit: false}});
    };

    delete = (data) => {
        store.dispatch({type: DELETE_FROM_BLOG, payload: data})
    };
    confirm = (e) => {
        delete (this.delete(this.props.blogFormReducer.currentData));
    };

    cancel = () => {
        message.error('Cancelled!');
    };

    render() {
        const {loading,currentData,visible} = this.props.blogFormReducer
        return (
            <div className="site-page-header-ghost-wrapper">
                <Skeleton loading={loading} active paragraph={{rows: 8}}
                          className="ant-skeleton">
                    <PageHeader className="site-page-header-1"
                                ghost={false}
                                onBack={() => window.history.back()}
                                title="Back"
                                extra={[
                                    <Popconfirm
                                        key="3"
                                        title="Are you sure delete this task?"
                                        onConfirm={this.confirm}
                                        onCancel={this.cancel}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Icon type="delete"/>
                                    </Popconfirm>,
                                    <Button key="2" onClick={this.showDrawer}>Edit</Button>,
                                    <Button key="1" type="primary">
                                        Publish
                                    </Button>,
                                ]}
                    >

                    </PageHeader>
                    <div className="blog-image-section" style={{
                        backgroundColor: "lightgray",
                        backgroundImage: `url(${currentData.CoverImage})`
                    }}>
                    </div>

                    <div className="blog-content">
                        <h1>{currentData.title}</h1>
                        <p>{currentData.content}</p>
                    </div>
                </Skeleton>
                <Drawer
                    title="Create"
                    placement="right"
                    onClose={this.onClose}
                    visible={visible}
                    closable={true}
                >
                    <DraggerForm onClose={this.onClose}/>
                </Drawer>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {...state};
};

export default connect(mapStateToProps)(BlogCRUD);