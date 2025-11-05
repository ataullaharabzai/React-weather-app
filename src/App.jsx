import React, { useState } from 'react'
import { WeatherProvider } from './context/WeatherContext'
import Home from './components/Home'

function App() {
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(null)

  const fetchWeather = async (cityName) => {
    setLoading(true)
    setErr(false)
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},AF&appid=714fe9db87c0875852fda23f2402825d&units=metric`)
      const data = await res.json()
      setLoading(false)
      return data
    } catch (error) {
      setErr(error.message)
    }
  }

  return (
    <WeatherProvider value={{ fetchWeather, loading, err }}>
      <Home />
    </WeatherProvider>
  )
}

export default App