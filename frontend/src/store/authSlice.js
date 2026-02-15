import { createSlice } from '@reduxjs/toolkit';
const userFromStorage = JSON.parse(localStorage.getItem('user') || 'null');

const initialState={
    isAuthenticated: !!userFromStorage,
    user: userFromStorage,
};

const authSlice=createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action)=>{
            const {user}=action.payload;
            state.isAuthenticated=true;
            state.user=user;
            state.error=null;

            localStorage.setItem('user',JSON.stringify(user));
        },
        logout: (state)=>{
            state.isAuthenticated=false;
            state.user=null;
            state.error=null;

            localStorage.removeItem('user');
        },
        updateUser: (state, action)=>{
            state.user=action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        setError: (state, action)=>{
            state.error=action.payload;
        },
        clearError: (state)=>{
            state.error=null;
        },
        setLoading: (state, action)=>{
            state.loading=action.payload;
        },
    },
});

export const { 
  loginSuccess, 
  logout, 
  updateUser, 
  setError, 
  clearError, 
  setLoading 
} = authSlice.actions;

export default authSlice.reducer;