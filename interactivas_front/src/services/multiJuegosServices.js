import endpoints from './endpoints';
const axios = require('axios');

const token = sessionStorage.getItem('token');
const authorizationConfig = {
    headers: { Authorization: `Bearer ${token}` }
};

export const getAllMultiLevels = async () => {
   try {
       const response = await axios.get(endpoints.multiGameLevels, authorizationConfig)
       return response;
   } catch (error) {
       console.log(error)
   }
}

export const getMultiByLevel = async (_level) => {
    try {
        const response = await axios.get(endpoints.multiGameLevelsByLevel, {level:_level}, authorizationConfig)
        
        return response;
    } catch (error) {
        console.log(error)
    }
 }
 