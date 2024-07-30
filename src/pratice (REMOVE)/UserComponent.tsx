import React from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import store from '../redux (REMOVE)/store';
import {userLogin, userLogout} from '@/redux (REMOVE)/reducers/userReducer';

export const UserComponent = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const user = useSelector((state) => state.user);

    const handleLogin = () => {
        dispatch(userLogin({name: 'John Doe', age: 30}));
    };

    const handleLogout = () => {
        dispatch(userLogout());
    };

    return (
        <div>
            <h1>User Authentication Example</h1>
            <p>{user?.isLoggedIn ? `Hello, ${user.user.name}` : 'Not logged in'}</p>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};