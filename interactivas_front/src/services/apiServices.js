import endpoints from './endpoints';
const axios = require('axios');

export const register = async (userData) => {
    try {
<<<<<<< HEAD
        const response = await axios.post('http://localhost:8000/api/auth/register', 
        {username: userData.username, password: userData.password});

        sessionStorage.setItem('sessionToken', response.data.token);
=======
        const data = { username: userData.username, password: userData.password }
        const response = await axios.post(endpoints.register, data)

        sessionStorage.setItem('token', response.data.token)
        localStorage.setItem('activeSession', true);
        localStorage.setItem('sessionName', userData.username)
>>>>>>> f8df56c827f89193b202ffbc60b4dd42653d0523
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const login = async (userData) => {
    try {
<<<<<<< HEAD
        const response = await axios.post('http://localhost:8000/api/auth/login', 
        {username: userData.username, password: userData.password});
        
        sessionStorage.setItem('sessionToken', response.data.token);
        console.log(response)
        return response;
    } catch (error) {
        if (error.response) {
            return error.response;
          }
=======
        const data = { username: userData.username, password: userData.password }
        const response = await axios.post(endpoints.login, data)

        sessionStorage.setItem('token', response.data.token)
        localStorage.setItem('activeSession', true);
        localStorage.setItem('sessionName', userData.username)
        return response;
    } catch (error) {

        console.log(error)
>>>>>>> f8df56c827f89193b202ffbc60b4dd42653d0523
    }
}

export const checkToken = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await axios.post(endpoints.isSessionActive, { token: token })
        return response
    } catch (error) {
        console.log(error)
        sessionStorage.removeItem('token');
        localStorage.removeItem('activeSession');
        localStorage.removeItem('sessionName')
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

const removeStorageData = () => {
    sessionStorage.removeItem('token');
    localStorage.removeItem('activeSession');
    localStorage.removeItem('sessionName')
}


<<<<<<< HEAD


module.exports = {
    register,
    login,
}
=======
>>>>>>> f8df56c827f89193b202ffbc60b4dd42653d0523
