import React, {Component} from 'react';
import {Button, Col, Drawer, Row, Table} from 'antd';
import "./index.css"
import DraggerForm from "../dragger";
import {connect} from "react-redux";
import store from "../../store/store";
import SearchComponent from "../search";
import {columns} from "../table";
import Axios from "axios";
import {PAGINATION_CURRENT} from "../../redux/dragger/actions";
import {SHOW_BLOG_POST, PAGINATION, UPDATE_OFFSET} from "../../redux/posts/actions";
import {DRAWER} from "../../redux/BlogCRUD/action";

class Posts extends Component {
    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
    }
    state = {visible: false, data: [], loading: true, offset: 0, pagination: {}, dataCount: 0};
    componentDidMount() {
        this.fetch({offset: 0});
        Axios.get("https://api.backendless.com/1E43DBD5-EDAF-58B2-FFD9-43A41A8B0F00/04B19478-7A6E-494B-87F9-B0F24A1BE8A9/data/posts/count?where=ownerId%3D%27" + localStorage.getItem('ownerId') + "%27").then((response) => {
            this.setState({dataCount: response.data})
        });
    }
    showDrawer = () => {
        store.dispatch({type: DRAWER, payload: {visible: true, currentData: 0, edit: false}});
    };

    onClose = () => {
        store.dispatch({type: DRAWER, payload: {visible: false}});
    };

    handleTableChange = (pagination) => {
        const pager = {...this.props.blogFormReducer.pagination};
        pager.current = pagination.current;

        store.dispatch({type: PAGINATION_CURRENT, payload: pager});
        this.fetch({
            offset: (pager.current - 1) * 10
        });

    };
    fetch = (params = {}) => {
        this.setState({loading: false});
        store.dispatch({type: SHOW_BLOG_POST, payload: params.offset});
        store.dispatch({type: UPDATE_OFFSET, payload: params.offset});
        const pagination = {...this.props.blogFormReducer.pagination};
        pagination.total = this.state.dataCount;
        store.dispatch({type: PAGINATION, payload: pagination})
    };

    render() {
        return (
            <div className="body">
                <Row type={"flex"} style={{padding: 50, paddingLeft: 100, paddingRight: 100, paddingTop: 100}}>
                    <Col lg={14} xs={14}>
                        <h2>Posts</h2>
                    </Col>
                    <Col lg={10} xs={10}>
                        <Row>
                            <Col lg={14} xs={{span: 15, offset: 3}}>
                                <SearchComponent value={"posts"}/>
                            </Col>
                            <Col lg={6} xs={{span: 6}}>
                                <Button key="1" type="primary" onClick={this.showDrawer}
                                        className="posts-create-button">Create</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Drawer
                    title="Create"
                    placement="right"
                    onClose={this.onClose}
                    visible={this.props.blogFormReducer.visible}
                    closable={true}
                >
                    <DraggerForm onClose={this.onClose}/>
                </Drawer>
                <Table id="table" columns={columns} dataSource={this.props.blogFormReducer.data}
                       loading={this.props.blogFormReducer.loading} pagination={this.props.blogFormReducer}
                       onChange={this.handleTableChange} rowKey='objectId'/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {...state};
};

export default connect(mapStateToProps)(Posts);

