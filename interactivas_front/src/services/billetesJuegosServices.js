import endpoints from './endpoints';
const axios = require('axios');

const token = sessionStorage.getItem('token');
const authorizationConfig = {
    headers: { Authorization: `Bearer ${token}` }
};

export const getAllBilletesLevels = async () => {
   try {
       const response = await axios.get(endpoints.billestesGameLevels, authorizationConfig)
       return response;
   } catch (error) {
       console.log(error)
   }
}
