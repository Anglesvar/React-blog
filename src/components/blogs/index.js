import React from 'react';
import "./index.css"
import {Avatar, List, Spin} from 'antd';
import {connect} from "react-redux";
import './index.css'
import store from "../../store/store";
import moment from "moment";
import InfiniteScroll from 'react-infinite-scroller';
import {Link} from "react-router-dom";
import ViewBlog from "../ViewBlog";
import SearchComponent from "../search";
import {DATA_FETCH, SHOW_BLOG_FROM_BLOG_COMPONENT, VIEW_BLOG_POST_SELECT, DATA_COUNT_LOADER} from "../../redux/blogForm/actions";
import {LOADING} from "../../redux/dragger/actions";
class Blogs extends React.Component {
    state = {
        hasMore: true,
        current: 1,
        offset: 0
    };
    componentDidMount() {
        store.dispatch({type: DATA_COUNT_LOADER});
        store.dispatch({type:DATA_FETCH,payload:{offset:this.state.offset, mount:true}})
        this.setState({
            offset: (this.state.offset) + 10
        });
    }

    handleInfiniteOnLoad = () => {
        if (this.props.blogFormReducer.data.length >= this.props.blogFormReducer.dataCount) {
            store.dispatch({type:LOADING,payload:{loading: false}})
            this.setState({
                hasMore: false
            })
            return
        }
        store.dispatch({type:DATA_FETCH,payload:{offset:this.state.offset, mount:false}})
        this.setState({
            offset:this.state.offset + 10
        })
    };

    onClick = (data) => {
        store.dispatch({type: VIEW_BLOG_POST_SELECT, payload: true});
        data.selected = true;
        store.dispatch({type: SHOW_BLOG_FROM_BLOG_COMPONENT, payload: data});
    };
    render() {
        const {data,loading} = this.props.blogFormReducer;
        return (
            <div>
                <div className="demo-infinite-container">
                    <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        hasMore={!loading && this.state.hasMore}
                        loadMore={this.handleInfiniteOnLoad}
                        useWindow={false}
                    >
                        <List
                            dataSource={data}
                            header={<div><h4 className={"blog-list-header"}>RECENT BLOGS</h4>
                                        <div onClick={() => {
                                            store.dispatch({type: "SEARCH_CONSTANT", payload: true})
                                            }} style={{height: 50}}>
                                            <SearchComponent/>
                                        </div>
                                    </div>}
                            renderItem={item => (
                                <List.Item key={item.title}>
                                    <List.Item.Meta
                                        className="ant-list-item-meta-custom"
                                        avatar={
                                            <Avatar
                                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                                        }
                                        title={<Link to={`/home/blogs/${item.objectId}`}
                                                     onClick={() => this.onClick(item)}>{item.title}</Link>}
                                        description={item.author + ", ~ " + moment.utc(item.created).fromNow()}
                                    />
                                </List.Item>
                            )}
                        >
                            {(loading && this.state.hasMore) &&
                                (<div className="demo-loading-container">
                                    <Spin size={"large"} className={"blog-spinner"}/>
                                </div>)
                            }
                        </List>
                    </InfiniteScroll>
                </div>
                <ViewBlog />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {...state};
};
export default connect(mapStateToProps)(Blogs);