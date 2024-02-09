import axios from "axios";

export const countriesApi = axios.create({
    baseURL: 'https://restcountries.com/v3.1/',
    params: {
        fields: "name,unMember,region,borders,area,flag,population,flags,cca2,cca3"
    }
})
