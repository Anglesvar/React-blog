const initialState={
    loading: false
}

export const loginReducer = (state = initialState, action) => {
    if (action.type === "LOGIN_LOADING")
        return {...state, loading: action.payload.loading};
    else
        return state
};

