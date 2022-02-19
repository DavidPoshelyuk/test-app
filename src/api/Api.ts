import axios from 'axios';


const API_KEY = 'fff23f91a076110e3b12ab2561c89236'
const instance = axios.create({
    baseURL: 'http://api.openweathermap.org/data/2.5/',
})

export const Api = {
    getWeatherCity(city:string) {return instance.get<dataWeatherType>(`weather?q=${city}&appid=`+ API_KEY)},
    getWeatherMyCity(lat:number,lon:number){ return instance.get<dataWeatherType>(`weather?lat=${lat}&lon=${lon}&appid=`+ API_KEY)}
};


export type dataWeatherType = {
    coord: {
        lon: number,
        lat: number
    },
    weather: Array< {
        id: number,
        main: string,
        description: string,
        icon: string
    }>
    base: string,
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number
    },
    visibility: number,
    wind:{
        speed: number,
        deg: number
    },
    clouds: {
        all: number
    },
    dt: number,
    sys: {
        type: 1,
        id: number,
        message: number,
        country: string,
        sunrise: number,
        sunset: number,
    },
    timezone: number,
    id: number,
    name: string,
    cod: number
}
