import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    login: {
        email: '',
        password: '',
    },
    loginSuccess: null,
}


const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLogin(state, action) {
            state.login = action.payload;
        },
        setLoginSuccess(state, action) {
            state.loginSuccess = action.payload;
        }        
        
    },
});

export const {setLogin, setLoginSuccess } = loginSlice.actions;

export default loginSlice.reducer;