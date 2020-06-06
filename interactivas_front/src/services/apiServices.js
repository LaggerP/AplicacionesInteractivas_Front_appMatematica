const axios = require('axios');

const register = async (userData) => {
    try {
        const response = await axios.post('http://localhost:8000/api/auth/register', {username: userData.username, password: userData.password})
        sessionStorage.setItem('sessionToken', response.data.token)
        return response;
    } catch (error) {
        console.log(error)
    }
}

const login = async (userData) => {
    try {
        const response = await axios.post('http://localhost:8000/api/auth/login', {username: userData.username, password: userData.password})
        sessionStorage.setItem('sessionToken', response.data.token)
        return response;
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    register,
    login,
}