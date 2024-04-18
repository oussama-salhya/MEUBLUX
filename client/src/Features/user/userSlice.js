import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from "../../utils/localStorage"
import { loginThunk, loginWithGoogleThunk, logoutThunk, registerThunk, showMeThunk, updateUserThunk, verifyEmailThunk } from "./userThunk"

const initialState = {
    user: getUserFromLocalStorage(),
    isLoggedIn: getUserFromLocalStorage() ? true : false,
    isLoading: false,
    isLoginPageOpened: false,
    showAccountMenu: false,
    showError: false,
    msg: '',
    showMsg: false,
}

export const login = createAsyncThunk('login', loginThunk)
export const register = createAsyncThunk('register', registerThunk)
export const verifyEmail = createAsyncThunk('verifyEmail', verifyEmailThunk)
export const loginWithGoogle = createAsyncThunk('loginwithGoogle', loginWithGoogleThunk)
export const logout = createAsyncThunk('logout', logoutThunk)
export const showMe = createAsyncThunk('showMe', showMeThunk)
export const updateUser = createAsyncThunk('updateUser', updateUserThunk)
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleLoginPage: (state) => {
            if (state.user) {
                state.showAccountMenu = !state.showAccountMenu
            }
            else {
                state.isLoginPageOpened = !state.isLoginPageOpened
            }
        },
        displayError: (state) => {
            state.showError = true
        },
        hideError: (state) => {
            state.showError = false
            state.msg = ''
        },
        removeUser: (state) => {
            state.user = null;
            state.isLoggedIn = false
            state.showAccountMenu = false
            removeUserFromLocalStorage()
        },
        hideMsg: (state, { payload: clearMsgContent }) => {
            state.showMsg = false
            if (clearMsgContent) {
                state.msg = ''
            }
        },
        displayMsg: (state, { payload: msg }) => {
            state.showMsg = true
            if (msg) {
                state.msg = msg
            }
        }
    },
    extraReducers: {
        [login.pending]: (state) => {
            state.isLoading = true;
        },
        [login.fulfilled]: (state, { payload: { user } }) => {
            addUserToLocalStorage(user)
            state.isLoading = false
            state.user = user;
            state.isLoggedIn = true
            state.isLoginPageOpened = false
            state.showAccountMenu = true
        },
        [login.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.showError = true;
            state.msg = payload
        },
        [register.pending]: (state) => {
            state.isLoading = true;
        },
        [register.fulfilled]: (state, { payload }) => {
            state.isLoading = false
            state.msg = payload.msg
        },
        [register.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.showError = true;
            state.msg = payload
        },

        [verifyEmail.pending]: (state) => {
            state.isLoading = true;
        },
        [verifyEmail.fulfilled]: (state, { payload: { user } }) => {
            addUserToLocalStorage(user)
            state.isLoading = false;
            state.user = user;
            state.isLoggedIn = true
        },
        [verifyEmail.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.showError = true;
            state.msg = payload
        },
        [loginWithGoogle.pending]: (state) => {
            state.isLoading = true;
        },
        [loginWithGoogle.fulfilled]: (state, { payload: { user } }) => {
            addUserToLocalStorage(user)
            state.user = user
            state.isLoggedIn = true
            state.isLoginPageOpened = false
            state.showAccountMenu = true
        },
        [loginWithGoogle.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.showError = true;
            state.msg = payload
        },
        [logout.fulfilled]: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            state.showAccountMenu = false;
            state.isLoginPageOpened = true
        },
        [logout.rejected]: (state, { payload }) => {
            state.showError = true
            state.msg = payload
        },
        [showMe.fulfilled]: (state, { payload: user }) => {
            addUserToLocalStorage(user)
            state.user = user
            state.isLoggedIn = true
            state.isLoginPageOpened = false
        },
        [updateUser.pending]: (state) => {
            state.isLoading = true
        },
        [updateUser.fulfilled]: (state, { payload: user }) => {
            state.isLoading = false
            state.user = user
            state.msg = 'user is successfully updated'
        },
        [updateUser.rejected]: (state, { payload: msg }) => {
            state.isLoading = false
            state.msg = msg
            state.showError = true
        }


    }
})

export const { toggleLoginPage, hideError, hideMsg, displayError, removeUser, displayMsg } = userSlice.actions;

export default userSlice.reducer


