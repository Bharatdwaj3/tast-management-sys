import {configureStore} from "@reduxjs/toolkit";
import avatarReducer from './avatarSlice';
import authReducer from './authSlice';
import projectReducer from './projectSlice';
import taskReducer from './taskSlice';

export const store=configureStore({
    reducer:{
        auth: authReducer,
        avatar: avatarReducer, 
        project: projectReducer,
        task: taskReducer,
    },
});

