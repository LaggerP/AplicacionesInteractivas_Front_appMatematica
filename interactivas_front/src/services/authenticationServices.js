import endpoints from './endpoints';
const axios = require('axios');

const token = sessionStorage.getItem('token');
const authorizationConfig = {
    headers: { Authorization: `Bearer ${token}` }
};

export const register = async (userData) => {
    try {
        const data = { username: userData.username, password: userData.password }
        const response = await axios.post(endpoints.register, data)
        await setStorageData(response.data.token, userData.username)
        return response;
    } catch (error) {
        console.log(error)
    }
}

export const login = async (userData) => {
    try {
        const data = { username: userData.username, password: userData.password }
        const response = await axios.post(endpoints.login, data)
        await setStorageData(response.data.token, userData.username)
        return response;
    } catch (error) {
        if (error.response) {
            return error.response;
        }
    }
}

// Non api internal functionalities
export const isConnected = () => localStorage.getItem('activeSession')
export const getUser = () => localStorage.getItem('sessionName')
export const logOut = (cb) => {
    removeStorageData();
    setTimeout(cb, 100);
}

const removeStorageData = () => {
    sessionStorage.removeItem('token');
    localStorage.removeItem('activeSession');
    localStorage.removeItem('sessionName');
}

const setStorageData = (token, username) => {
    sessionStorage.setItem('token', token)
    localStorage.setItem('activeSession', true);
    localStorage.setItem('sessionName', username);
}


