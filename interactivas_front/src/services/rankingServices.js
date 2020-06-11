import endpoints from './endpoints';
const axios = require('axios');


export const getAllRanking = async () => {
    try {
        const response = await axios.get(endpoints.getAllRanking)
        return response;
    } catch (error) {
        console.log(error)
    }
}


export const saveLevelPoint = async (dataPoints, gameType) => {
    switch(gameType) {
        case "billetes":
            try {
                //verificar http 400
                const response = await axios.patch(endpoints.updateBilletes, {puntaje_billetes: dataPoints.gamePoint, usuario_id: dataPoints.userId})
                return response;
            } catch (error) {
                console.log(error)
            }
          break;
        case "sumas":
            try {
            } catch (error) {
            }
          break;
        case "multiplicacion":
            try {
            } catch (error) {
            }
          break;

        
      }
    
}
