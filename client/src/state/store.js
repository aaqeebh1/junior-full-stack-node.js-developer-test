import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice.js';
import loginReducer from './login/loginSlice.js';
import registerReducer from './register/registerSlice.js';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        login: loginReducer,
        register: registerReducer,
    }
})

export const RootState = store.getState;
export const AppDispatch = store.dispatch;