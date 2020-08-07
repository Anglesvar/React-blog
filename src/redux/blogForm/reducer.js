const initialState = {
    visible: false,
    total: 0,
    current: 1,
    loading: false,
    data: [],
    currentData: [],
    edit: false,
    imageUpload: false,
    required: false,
    offset: 0,
    searchChecker: false,
    dataCount:0,
};
export const blogFormReducer = (state = initialState, action) => {
    switch (action.type) {
        case "BLOG_FORM_DATA_UPLOAD":
            return {...state, action};
        case "DELETE":
            return {...state, data: action.payload};
        case "DRAWER":
            return {...state, ...action.payload};
        case "UPDATE_OFFSET":
            return {...state, offset: action.payload};
        case "PAGINATION":
            return {...state, pagination: action.payload};
        case "SHOW_BLOG":
            return {...state,data: state.data.concat(action.payload)};
        case "SHOW_SEARCH_BLOG":
            state.loading = false
            return {...state, data: action.payload}
        case "PAGINATION_CURRENT":
            return {...state, current: action.payload.current};
        case "SHOW_SELECTED_BLOG":
            return {...state, currentData: action.payload};
        case "CLEAR_POST":
            return {...state, currentData: action.payload};
        case "LOADING":
            return {...state, loading: action.payload.loading};
        case "PAGE_TOTAL":
            return {...state, total: action.payload};
        case "SEARCH_CONSTANT":
            return {...state, searchChecker: action.payload};
        case "UPDATE_COUNT":
            return {...state, dataCount: action.payload};
        case "INITIAL_DATA_FETCH":
            return {...state, data: action.payload};
        default:
            return state;
    }
};