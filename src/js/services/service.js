import axios from "axios";
import config from "../config/apiConfig";

// Сервер поддерживает несколько запросов:
// он может вернуть цены на билеты по указанным датам
// countries()
// cities()
// prices()

/**
 * /counteries() - array of countries
 * /cities() - array
 * prices()
 */
class Api {
    constructor(config) {
        this.url = config.url;
    }
    async countries(){
        try {
            const response = await axios.get(`${this.url}/countries`);
            return response.data
        } catch(err) {
            console.log(err)
            return Promise.reject(err)
        }
    }
    async cities(){
        try {
            const response = await axios.get(`${this.url}/cities`);
            return response.data
        } catch(err) {
            console.log(err)
            return Promise.reject(err)
        }
    }
    async prices(params) {
        // params это квери параметры которые будут подставлены в url строке
        try {
            const response = await axios.get(`${this.url}/prices/cheap`, {
                params
            })
            return response.data
        } catch(err) {
            console.log(err)
            return Promise.reject(err)
        }

    }
    async airlines() {
        try {
            const response = await axios.get(`${this.url}/airlines`)
            return response.data
        } catch(err) {
            console.log(err)
            return Promise.reject(err)
        }

    }
}

const api = new Api(config);

export default api;
