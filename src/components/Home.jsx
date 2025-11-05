import React, { useEffect, useState } from 'react'
import { useWeather } from '../context/WeatherContext'

function Home() {

    const { fetchWeather } = useWeather()
    const [data, setData] = useState(null)
    const [city, setCity] = useState(() => {
        return localStorage.getItem('lastCity') || 'Asadabad'
    })

    useEffect(() => {
        async function handleFetch() {
            const result = await fetchWeather(city)
            setData(result)
        }
        handleFetch()
    }, [fetchWeather])

    const handleCity = async (e) => {
        e.preventDefault()
        if (!city) return <div>Invilid City</div>
        localStorage.setItem('lastCity', city)
        const result = await fetchWeather(city)
        setData(result)
        setCity('')
    }

    return (
        <>
            {/* Weather Card */}
            <div className="w-full max-w-xl mx-auto mt-2 p-5 rounded-2xl bg-gray-900 text-white flex flex-col   items-center">
                {/* Search Box */}
                <div className="w-full flex justify-center border border-gray-400 rounded-4xl">
                    <div className="flex w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
                        <input
                            className="grow h-11 p-3 rounded-l-4xl text-gray-200 focus:outline-none focus:ring-0"
                            type="text"
                            value={city}
                            placeholder="Search city"
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <button
                            onClick={handleCity}
                            className="px-6 h-11 rounded-r-4xl border-l border-gray-400 hover:bg-gray-700  text-gray-200 cursor-pointer"
                        >
                            Search
                        </button>
                    </div>
                </div>
                {data && data.main ? (
                    <div className="w-full flex flex-col items-center text-center">
                        <h3 className="mt-2 text-gray-400">Air Conditions</h3>
                        <h3 className="mt-4 text-3xl font-bold hover:text-gray-400">
                            {data?.name ?? 'No city found'}
                        </h3>
                        <p className="capitalize">{data?.weather[0]?.description ?? 'Loading...'}</p>

                        {data?.weather?.[0]?.icon && (
                            <img
                                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                                alt="weather icon"
                                className="w-32 sm:w-44 md:w-56 h-auto object-contain mt-4"
                            />
                        )}
                        <p className="text-3xl font-bold hover:text-gray-400 mt-2">
                            {data?.main?.temp ?? 'Loading...'} °C
                        </p>
                    </div>
                ) : (
                    <p>No data</p>
                )}

                {/* Bottom Cards */}
                <div className="w-full flex flex-col sm:flex-row justify-around items-center gap-4 mt-8">
                    <div className="w-full sm:w-60 h-20 rounded-xl flex justify-center items-center flex-col hover:border-2 hover:border-gray-600 bg-gray-800">
                        <p className="text-sm">Wind</p>
                        <p className="text-xl font-bold">{data?.wind?.speed ?? 'Loading...'} km/h</p>
                    </div>
                    <div className="w-full sm:w-60 h-20 rounded-xl flex justify-center items-center flex-col hover:border-2 hover:border-gray-600 bg-gray-800">
                        <p className="text-sm">Feels like</p>
                        <p className="text-xl font-bold">{data?.main?.feels_like ?? 'Loading...'} °C</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home