import React, { useState } from 'react';

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    
    const fetchWeather = async () => {
        const API_KEY = 'c8c9046502a90eff656af879fcc81c19';
        const API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`

        try {
            const response = await fetch(API_ENDPOINT);
            const data = await response.json();
            setWeather(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-blue-300">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md mb-4">
                <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
                    Weather App
                </h2>
                <div className="flex items-center mb-4">
                    <input
                        type="text"
                        placeholder="Enter city name"
                        className="border rounded-l p-3 w-full focus:outline-none"
                        value={city}
                        onChange={(e) => setCity(e.target.value)} />
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-r "
                        onClick={fetchWeather}>
                        Get Weather
                    </button>
                </div>
            </div>
            {weather && (
                <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                    <div className="mt-4">
                        <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                            Weather Information - {weather.name}
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-700">
                                    Description: {weather.weather[0].description}
                                </p>
                                <p className="text-gray-700">
                                    Humidity: {weather.main.humidity}%
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-700">
                                    Temperature: {Math.round(weather.main.temp - 273.15)}°C
                                </p>
                                <p className="text-gray-700">
                                    Wind Speed: {weather.wind.speed} m/s
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherApp;
