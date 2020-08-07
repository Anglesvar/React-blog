import React from "react";
import {Input} from "antd";
import store from "../../store/store";
import {debounce} from "lodash";
import {connect} from "react-redux";
import {SEARCH} from "../../redux/search/actions";
import "./index.css"
const {Search} = Input;


class SearchComponent extends React.Component {
    search = debounce(searchTerm => {
            store.dispatch({type: SEARCH, payload: {searchTerm: searchTerm,searchFrom: this.props.value}});
    }, 200);

    render() {
        return (
            <Search key="2"
                    placeholder="input search text"
                    onChange={(e) => this.search(e.target.value)}
                    style = {{display: 'flex', width: '240', float: 'right', zIndex: '20'}}
            />
        );
    }
}

const mapStateToProps = state => {
    return {...state};
};

export default connect(mapStateToProps)(SearchComponent);
