import {createSlice} from '@reduxjs/toolkit';

const token = localStorage.getItem('LOGIN_TOKEN');
const email = localStorage.getItem('LOGIN_EMAIL');
const initialState = {isLoggedIn: !!token, loginEmail: email, loginToken:token};

const authSlice = createSlice({
    name:'Authentication',
    initialState,
    reducers:{
        login(state, action){
            state.loginToken = action.payload.token;
            state.loginEmail = action.payload.email;
            localStorage.setItem('LOGIN_TOKEN', state.loginToken);
            localStorage.setItem('LOGIN_EMAIL', state.loginEmail);            
            state.isLoggedIn = true;
        },
        logout(state){
            state.loginToken = '';
            state.loginEmail = '';
            state.isLoggedIn = false;
            localStorage.clear();
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice;