import React from "react";
import {Button, Divider, Icon, Popconfirm} from 'antd';
import moment from "moment";
import store from "../../store/store";
import {Link} from "react-router-dom";
import {DELETE_BLOG_POST} from "../../redux/table/actions";

const BlogDelete = (text, record) => {
    store.dispatch({type: DELETE_BLOG_POST, payload: {blog: text, CoverImage: record.CoverImage}});
};
export const columns = [
    {
        title: 'Post name',
        dataIndex: 'title',
        key: 'name',
        render: (text, record) => (<div>
                <Link to={`/home/posts/${record.objectId}`} >{text}</Link>
            </div>
        ),
    },
    {
        title: 'Created at',
        dataIndex: 'created',
        key: 'createdAt',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.created - b.created,
        render: text => (moment.utc((new Date(text))).format("YYYY-MM-DD HH:MM:SS")),

    },
    {
        title: 'Updated at',
        dataIndex: 'updated',
        key: 'updatedAt',
        render: text => (moment.utc((new Date(text))).format("YYYY-MM-DD HH:MM:SS"))
    },
    {
        key: 'action',
        dataIndex: 'objectId',
        render: (text, record) => (
            <span>
                <Popconfirm
                    title="Are you sure delete this task?"
                    onConfirm={() => BlogDelete(text, record)}
                    okText="Yes"
                    cancelText="No"
                >
                <Icon type="delete" theme="twoTone" twoToneColor="#ff1100" style={{fontSize: 20}}/>
                </Popconfirm>
                <Divider type="vertical"/>
                <Button type="primary">Publish</Button>
            </span>
        ),
    },
];


