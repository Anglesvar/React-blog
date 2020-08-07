const initialState={
    loading: false
}

export const signUpReducer = (state = initialState, action) => {
    if (action.type === "SIGNUP_LOADING")
        return {...state, loading: action.payload.loading};
    else
        return state;
};