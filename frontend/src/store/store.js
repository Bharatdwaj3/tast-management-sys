import {configureStore} from "@reduxjs/toolkit";
import avatarReducer from './avatarSlice';
import contentReducer from './contentSlice';
import followReducer from './followSlice';
import authReducer from './authSlice';

export const store=configureStore({
    reducer:{
        auth: authReducer,
        avatar: avatarReducer,
        content: contentReducer,
        follow: followReducer,
    },
});

