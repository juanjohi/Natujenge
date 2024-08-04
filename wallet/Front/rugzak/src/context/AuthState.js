// src/context/AuthState.js

import React, { useReducer } from 'react';
import AuthContext from './AuthContext';

const AuthState = ({ children }) => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    const loadUser = async () => {
        if (localStorage.getItem('token')) {
            const res = await fetch('/auth', {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token'),
                },
            });
            const data = await res.json();
            if (data) {
                dispatch({ type: 'USER_LOADED', payload: data });
            }
        }
    };

    const register = async (formData) => {
        const res = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.token) {
            localStorage.setItem('token', data.token);
            dispatch({ type: 'REGISTER_SUCCESS', payload: data.token });
        }
    };

    const login = async (formData) => {
        const res = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.token) {
            localStorage.setItem('token', data.token);
            dispatch({ type: 'LOGIN_SUCCESS', payload: data.token });
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                loadUser,
                register,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'USER_LOADED':
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload,
            };
        case 'REGISTER_SUCCESS':
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                token: action.payload,
                isAuthenticated: true,
                loading: false,
            };
        case 'LOGOUT':
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
            };
        default:
            return state;
    }
};

export default AuthState;
