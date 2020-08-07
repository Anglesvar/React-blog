const initialState = {
    loading: false,
    data: {comments: [], claps: []},
    selected: false,
    submitting: false,
    value: '',
    offset: 0,
    clapCount: 0,
    visible: false,
};

export const ViewBlogReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SHOW_BLOG_FROM_BLOG_COMPONENT":
            return {...state, data: action.payload};
        case "VIEW_BLOG_POST_SELECT":
            return {...state, selected: action.payload};
        case "SUBMIT_COMMENT":
            return {...state, submitting: action.payload};
        case "COMMENT_VALUE":
            return {...state, value: action.payload};
        case "COMMENT_LOAD":
            return {...state, data: action.payload};
        case "CLAP_COUNT_INCREASE":
            return {...state, clapCount: action.payload};
        case "CLAP_COUNT_DECREASE":
            return {...state, clapCount: state.clapCount - action.payload};
        case "STORE_OBJECTID":
            return {...state, objectId: action.payload};
        case "CLAP_LOAD":
            state.data.claps = action.payload;
        // eslint-disable-next-line no-fallthrough
        case "LOAD_INITIAL_CLAP_COUNT":
            return {...state, clapCount: state.data.claps.length};
        case "SHOW_MODAL":
            return {...state, visible: action.payload};
        default:
            return state;
    }
};