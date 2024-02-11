import axios from "axios";

export const apiFields = (extraFields?:string)=>{
    const defaultFields = "name,unMember,region,borders,area,flag,population,flags,cca2,cca3,subregion";

    if(extraFields == undefined){
        return defaultFields;
    }

    return `${defaultFields},${extraFields}`;
    
}

export const countriesApi = axios.create({
    baseURL: 'https://restcountries.com/v3.1/',
    params: {
        fields: apiFields()
    }
})
