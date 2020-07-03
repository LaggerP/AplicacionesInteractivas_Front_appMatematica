const urlApi = process.env.REACT_APP_BACKEND_APP_URL || "http://localhost:8000";


const endpoints = {
   //auth endpoints
    login:`${urlApi}/api/auth/login`,
    register:`${urlApi}/api/auth/register`,
    isSessionActive:`${urlApi}/api/auth/validateToken`,

    //User endpoints
    findUserByUsername:`${urlApi}/api/usuarios/find`,
    listAllUsers:`${urlApi}/api/usuarios/list`,

    //ranking endpoints
    updateBilletes: `${urlApi}/api/ranking/update_billetes`,
    updateSumas: `${urlApi}/api/ranking/update_sumas`,
    updateMultiplicacion: `${urlApi}/api/ranking/update_multi`,
    getAllRanking: `${urlApi}/api/ranking/list`,
    getRankingByUsername: `${urlApi}/api/ranking/find/`,

    //billetes games endpoints
    billestesGameLevels: `${urlApi}/api/billetesjuegos/list`,
    billetesGameLevelsByLevel:`${urlApi}/api/billetesjuegos/find/:level`,

    //multiplicacion games endpoints
    multiGameLevels: `${urlApi}/api/multijuegos/list`,
    multiGameLevelsByLevel:`${urlApi}/api/multijuegos/findLevel`,

}

export default endpoints;