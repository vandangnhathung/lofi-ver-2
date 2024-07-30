const initialState = {
    isLoggedIn: false,
    user: {},
};

// @ts-ignore
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOGIN':
            console.log("working");
            return {...state, isLoggedIn: true, user: action.payload};
        case 'USER_LOGOUT':
            return initialState;
        default:
            return state;
    }
};

// @ts-ignore
export const userLogin = (user) => ({
    type: 'USER_LOGIN',
    payload: user,
});

export const userLogout = () => ({
    type: 'USER_LOGOUT',
});


export default userReducer;
