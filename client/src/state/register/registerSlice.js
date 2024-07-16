import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    formData: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    },
    confirmPassword: "",
    passwordMatch: true,
    emailError: false,
    passwordError: false,
    successfulRegister: false,
    userExists: false,
}

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        setFormData(state, action) {
            state.formData = action.payload;
        },
        setConfirmPassword(state, action) {
            state.confirmPassword = action.payload;
        },
        setPasswordMatch(state, action) {
            state.passwordMatch = action.payload;
        },
        setEmailError(state, action) {
            state.emailError = action.payload;
        },
        setPasswordError(state, action) {
            state.passwordError = action.payload;
        },
        setSuccessfulRegister(state, action) {
            state.successfulRegister = action.payload;
        }, 
        setUserExists(state, action) {
            state.userExists = action.payload;
        }
    }
})

export const { setFormData, setConfirmPassword, setPasswordMatch, setEmailError, setPasswordError, setSuccessfulRegister, setUserExists } = registerSlice.actions;

export default registerSlice.reducer;