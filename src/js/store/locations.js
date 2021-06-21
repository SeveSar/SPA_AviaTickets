// STORE - выступает как единственный источник данных для нашего приложения
// STORE может быть много в зависимости от сущностей
// под каждую сущность отдельная store
// вопросы
import api from "../services/service"
import formatDate from "../helpers/date"

class Locations {
    constructor(api, helpers) {
        this.api = api;
        this.countries = null;
        this.cities = null;
        this.shortCitiesList = null;
        this.airlines = null;
        this.lastSearch = {};
        this.formatDate = helpers;
    }
    async init() {
        const response = await Promise.all([
            this.api.countries(),
            this.api.cities(),
            this.api.airlines()
        ])
        const [countries, cities, airlines] = response
        this.countries = this.serializeCountries(countries);
        this.cities = this.serializeCities(cities);
        this.shortCitiesList = this.createShortCitiesList(this.cities);
        this.airlines = this.serializeAirlines(airlines);
        return response;
    }
    getCityCodeByKey(key) {
        const city = Object.values(this.cities).find(city => city.full_name === key)
        return city.code
    }
    getAirlineNameByCode(code) {
        return this.airlines[code].name ? this.airlines[code].name : " "
    }
    getAirlineLogoByCode(code) {
        return this.airlines[code].logo ? this.airlines[code].logo : " "
    }
    getCityNameByCode(code) {
        return this.cities[code].name
    }
    serializeCountries(countries) {
        //  {Country Code: {...}}
        return countries.reduce((acc, country) => {
            acc[country.code] = country
            return acc
        })
    }
    serializeCities(cities) {
        return cities.reduce((acc, city) => {
            let country_name = this.getCountryNameByCityCode(city.country_code)
            city.name = city.name || city.name_translations.en;
            const full_name = `${city.name}, ${country_name}`
            acc[city.code] = {...city, country_name, full_name}
            return acc
        }, {})
        // {Country, city names: {...}}
    }
    serializeAirlines(airlines) {
        return airlines.reduce((acc, item) => {
            item.name = item.name || item.name_translations.en
            item.logo = `https://pics.avs.io/200/200/${item.code}.png`
            acc[item.code] = item
            return acc
        }, {})
    }
    getCountryNameByCityCode(code) {
        if (this.countries[code]){
            return this.countries[code].name
        }
    }
    createShortCitiesList(cities) {
        return Object.entries(cities).reduce((acc, [,value]) => {
            acc[value.full_name] = null;
            return acc
        })
    }
    async fetchTickets(params) {
        const response = await this.api.prices(params);
        console.log(response)
        this.lastSearch = this.serializeTickets(response.data);
    }
    serializeTickets(tickets) {
        return Object.values(tickets).map((ticket) => {
            return {
                ...ticket,
                origin_name: this.getCityNameByCode(ticket.origin),
                destination_name: this.getCityNameByCode(ticket.destination),
                airline_logo: this.getAirlineLogoByCode(ticket.airline),
                airline_name: this.getAirlineNameByCode(ticket.airline),
                departure_at: this.formatDate(ticket.departure_at, "dd MMM yyyy hh:mm"),
                return_at: this.formatDate(ticket.return_at, "dd MMM yyyy hh:mm")
            }
        })
    }
    // getCitiesByCountryCode(code) {
    //     this.cities.filter(city => city.country_code === code)
    // }
}

const locations = new Locations(api , formatDate);
// {'City', "Country": null}
// [{},{}]
// {"City" : {...} => cities[code]}
export default locations;

