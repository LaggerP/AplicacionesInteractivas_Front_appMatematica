import endpoints from './endpoints';
const axios = require('axios');


export const register = async (userData) => {
    try {
        const data = { username: userData.username, password: userData.password }
        const response = await axios.post(endpoints.register, data)

        sessionStorage.setItem('token', response.data.token)
        localStorage.setItem('activeSession', true);
        localStorage.setItem('sessionName', userData.username)
        return response;
    } catch (error) {
        console.log(error)
    }
}

export const login = async (userData) => {
    try {
        const data = { username: userData.username, password: userData.password }
        const response = await axios.post(endpoints.login, data)

        sessionStorage.setItem('token', response.data.token)
        localStorage.setItem('activeSession', true);
        localStorage.setItem('sessionName', userData.username)
        return response;
    } catch (error) {
        console.log(error)
    }
}


export const checkToken = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await axios.post(endpoints.isSessionActive, { token: token })
        return response
    } catch (error) {
        console.log(error)
    }
}


// Non api internal functionalities

export const isConnected = () => localStorage.getItem('activeSession')
export const getUser = () => localStorage.getItem('sessionName')
export const logOut = (cb) => {
    sessionStorage.removeItem('token');
    localStorage.removeItem('activeSession');
    localStorage.removeItem('sessionName')
    setTimeout(cb, 100);
}


