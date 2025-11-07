import { useContext, createContext } from "react";

export const WeatherContext = createContext({
    fetchWeather: () => {},
    loading: false,
    err: null
})

export const WeatherProvider = WeatherContext.Provider

export function useWeather() {
    return useContext(WeatherContext) 
}

// "https://api.openweathermap.org/data/2.5/weather?q=Asadabad,AF&appid=714fe9db87c0875852fda23f2402825d&units=metric"