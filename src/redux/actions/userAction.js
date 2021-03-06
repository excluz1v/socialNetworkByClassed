import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER, MARK_NOTIFICATIONS_READ } from '../reducers/types'
import axios from 'axios'


export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    axios
        .post('/login', userData)
        .then(res => {
            setAuthorizationHeader(res.data.token)
            dispatch(getUserData())
            dispatch({ type: CLEAR_ERRORS })
            history.push('/')
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.res.data
            })
        })
}

export const logOut = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED })
}

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER })
    axios.get('/user')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const signUpUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    axios
        .post('/signup', newUserData)
        .then(res => {
            setAuthorizationHeader(res.data.token)
            dispatch(getUserData())
            dispatch({ type: CLEAR_ERRORS })
            history.push('/')
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

const setAuthorizationHeader = (token) => {
    const FBIdToken = token
    axios.defaults.headers.common['Authorization'] = `Bearer ${FBIdToken}`
    localStorage.setItem('FBIdToken', `Bearer ${FBIdToken}`)
}

export const upLoadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER })
    axios.post('/user/image', formData)
        .then(() => {
            dispatch(getUserData())
        })
        .catch(err => console.log(err))
}

export const EditUserDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER })
    axios.post('/user', userDetails)
        .then(() => {
            dispatch(getUserData())
        })
        .catch(err => console.log(err))
}

export const markNotificationsRead = (notificationsIds) => dispatch => {
    axios.post('/notifications', notificationsIds)
        .then(res => {
            dispatch({
                type: MARK_NOTIFICATIONS_READ
            })
        })
        .catch(err => console.log(err))
}