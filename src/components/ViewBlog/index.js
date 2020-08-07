import React, {Component} from 'react';
import "./index.css"
import {Avatar, Button, Comment, Form, Icon, Input, List, message, Popover, Skeleton, Tooltip} from 'antd';
import {connect} from "react-redux";
import './index.css'
import store from "../../store/store";
import moment from "moment";
import {POST_COMMENT, VIEW_BLOG_POST_SELECT, CLAPS, COMMENT_VALUE, SUBMIT_COMMENT, UNCLAP, VIEW_DATA} from "../../redux/ViewBlog/actions";

const {TextArea} = Input;

const CommentList = ({comments}) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => {
            const {ownerId, objectId, ...rest} = props
            return <Comment {...rest} datetime={<Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment.utc(props.created).fromNow()}</span>
            </Tooltip>}/>
        }}
    />
);

const Editor = ({onChange, onSubmit, submitting, value}) => (
    <div>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value}/>
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </div>
);
class ViewBlog extends Component {

    componentDidMount() {
        let objectId = window.location.href;
        objectId = objectId.split("blogs/")[1];
        if (objectId) {
            store.dispatch({type: SUBMIT_COMMENT, payload: true});
            store.dispatch({type: VIEW_DATA, payload: objectId});
            store.dispatch({type: VIEW_BLOG_POST_SELECT, payload: true})
        }
    }

    handleSubmit = () => {
        if (!this.props.ViewBlogReducer.value) {
            return;
        }
        store.dispatch({type: VIEW_BLOG_POST_SELECT, payload: true});

        store.dispatch({type: SUBMIT_COMMENT, payload: true});

        store.dispatch({
            type: POST_COMMENT, payload: {
                author: localStorage.getItem('login'),
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content: this.props.ViewBlogReducer.value, objectId: this.props.ViewBlogReducer.data.objectId
            }
        });

        store.dispatch({type: SUBMIT_COMMENT, payload: false});
    };


    handleChange = e => {
        store.dispatch({type: COMMENT_VALUE, payload: e.target.value})
    };
    handleLike = e => {
        if (localStorage.getItem('auth')) {
            const {claps} = this.props.ViewBlogReducer.data;
            console.log(claps)
            if (claps.length === 0) {
                store.dispatch({
                    type: CLAPS, payload: {
                        username: localStorage.getItem('login'),
                        user_image: "https://secure.webtoolhub.com/static/resources/icons/set56/f4856467.png",
                        objectId: this.props.ViewBlogReducer.data.objectId,
                        count: claps.length + 1
                    }
                });
            } else {
                var iterator = 0;
                for (iterator = 0; iterator < claps.length; iterator++) {
                    if (claps[iterator].ownerId === localStorage.getItem('ownerId')) {
                        store.dispatch({type: UNCLAP, payload: claps[iterator].objectId});
                        return;
                    }
                }
                if (iterator >= claps.length) {
                    store.dispatch({
                        type: CLAPS, payload: {
                            username: localStorage.getItem('login'),
                            user_image: "https://secure.webtoolhub.com/static/resources/icons/set56/f4856467.png",
                            objectId: this.props.ViewBlogReducer.data.objectId,
                            count: claps.length + 1
                        }
                    })
                }
            }
        }
        else{
            message.error("Login to Like the post")
        }
    };
    render() {
        const {comments} = this.props.ViewBlogReducer.data;
        const {selected, submitting} = this.props.ViewBlogReducer;
        const clapsData = this.props.ViewBlogReducer.data.claps;
        const clap = (
            <List
                dataSource={clapsData}
                itemLayout="horizontal"
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                            title={<a href="https://ant.design">{item.username}</a>}
                        />
                    </List.Item>
                )}/>

        );

        return (
            <div className={"view-blog"}>
                <Skeleton active loading={this.props.blogFormReducer.loading}>
                    <div className={"view-blog-heading"}>

                        <h1>{this.props.ViewBlogReducer.data.title}</h1>
                        <div><img src={"https://secure.webtoolhub.com/static/resources/icons/set56/f4856467.png"}
                                  alt={"Icon"} height={50} className={"view-blog-icon"}/>
                            <h4>{this.props.ViewBlogReducer.data.author}, <br/> - {moment.utc(this.props.ViewBlogReducer.data.created).fromNow()}
                            </h4>
                            <Icon type="heart" theme={"twoTone"} twoToneColor={"#d4380d"} style={{fontSize: 42}}
                                  onClick={this.handleLike}/>
                            <Popover content={clap}>
                                <p className={"view-blog-claps"}>{clapsData.length} {clapsData.length > 1 ? "Likes" : "Like"}</p>
                            </Popover>
                        </div>
                    </div>
                    <p className={"view-blog-content"}>{this.props.ViewBlogReducer.data.content}</p>
                    <div className="view-blog-image"
                         style={{backgroundImage: `url(${this.props.ViewBlogReducer.data.CoverImage})`}}/>
                </Skeleton>
                {selected && localStorage.getItem('auth') ? (
                    <Skeleton loading={this.props.ViewBlogReducer.submitting} active>
                        <div>
                            <CommentList comments={comments} />
                            <Comment
                                avatar={
                                    <Avatar
                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                        alt="Han Solo"
                                    />
                                }

                                content={
                                    <Editor
                                        onChange={this.handleChange}
                                        onSubmit={this.handleSubmit}
                                        submitting={submitting}
                                        value={this.props.ViewBlogReducer.value}
                                    />
                                }

                            />
                        </div>
                    </Skeleton>) : null}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {...state};
};

export default connect(mapStateToProps)(ViewBlog);