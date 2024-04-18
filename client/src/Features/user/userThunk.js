import axios from "axios";
import customFetch, { checkForUnauthenticatedError } from "../../utils/axios"

export const loginThunk = async (user, thunkAPI) => {
    try {
        const { data } = await customFetch.post('/auth/login', user)
        return data
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
}



export const registerThunk = async (user, thunkAPI) => {
    try {
        const { data } = await customFetch.post('/auth/register', user)
        return data
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
}

export const verifyEmailThunk = async (verification, thunkAPI) => {
    try {
        const { data } = await customFetch.post('/auth/verifyEmail', verification)
        return data
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
}
export const loginWithGoogleThunk = async (accessToken, thunkAPI) => {
    const googleUrl = 'https://www.googleapis.com/oauth2/v1/userinfo'
    const url = '/auth/loginWithGoogle'
    try {
        const { data: { email, name, picture: image } } = await axios.get(googleUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        const { data } = await customFetch.post(url, { email, name, image })
        return data
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
}

export const logoutThunk = async (_, thunkAPI) => {
    try {
        await customFetch.get('/auth/logout')
    } catch (error) {
        return thunkAPI.rejectWithValue('error ... please try again later')
    }
}
export const showMeThunk = async (_, thunkAPI) => {
    try {
        const { data: { user } } = await customFetch.get('/auth/showMe')
        return user
    } catch (error) {
        checkForUnauthenticatedError(error, thunkAPI)
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
}
export const updateUserThunk = async ({ user, userId }, thunkAPI) => {
    try {
        const { data } = await customFetch.post('/auth/updateUser/' + userId, user)
        return data.user
    } catch (error) {
        checkForUnauthenticatedError(error, thunkAPI)
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
}

