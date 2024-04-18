import axios from 'axios';
import { displayError, displayMsg, removeUser } from '../Features/user/userSlice';
import { getUserFromLocalStorage } from './localStorage';
const customFetch = axios.create({
    baseURL: '/api/v1',
});

export const checkForUnauthenticatedError = async (error, thunkAPI) => {
    const user = getUserFromLocalStorage()
    if (error.response.status === 401) {
        thunkAPI.dispatch(removeUser())
        if (user?.role === 'admin') {
            thunkAPI.dispatch(displayError())
            thunkAPI.dispatch(displayMsg('Unauthorized!!! logging Out'))
        }
    }

}


export default customFetch