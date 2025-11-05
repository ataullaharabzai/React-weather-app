import React, { useState } from 'react'
import { useWeather } from '../context/WeatherContext'

function WeatherHome() {
	const { fetchWeather, loading, err } = useWeather() || {}
	const [data, setData] = useState(null)

	const fetchData = async () => {
		try {
			const result = await fetchWeather()
			setData(result)
		} catch (error) {
			setData(null)
		}
	}

	return (
		<div className="p-6 max-w-2xl mx-auto text-center">
			<button
				onClick={fetchData}
				className="px-4 py-2 bg-blue-600 text-white rounded-md"
				disabled={loading}
			>
				{loading ? 'Loading…' : 'Fetch weather'}
			</button>

			{err && <p className="text-red-500 mt-2">{String(err)}</p>}

			{data ? (
				<pre className="mt-4 bg-slate-800 text-white p-3 rounded">{JSON.stringify(data, null, 2)}</pre>
			) : (
				<p className="mt-4 text-sm text-slate-400">No data yet.</p>
			)}
		</div>
	)
}

export default WeatherHome