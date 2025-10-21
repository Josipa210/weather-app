import { useState } from "react";
import WeatherCard from "./WeatherCard";
import ForecastCard from "./ForecastCard";
import "./index.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError("");
      setWeather(null);
      setForecast([]);

      // 1️⃣ Get city coordinates
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`
      );
      const geoData = await geoRes.json();
      if (!geoData.results || geoData.results.length === 0)
        throw new Error("City not found ❌");

      const { latitude, longitude, name, country } = geoData.results[0];

      // 2️⃣ Current weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();
      setWeather({
        name,
        country,
        temperature: weatherData.current_weather.temperature,
        wind: weatherData.current_weather.windspeed,
        code: weatherData.current_weather.weathercode,
      });

      // 3️⃣ 5-day forecast
      const forecastRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
      );
 
      const forecastData = await forecastRes.json();

      const dailyForecast = forecastData.daily.time.map((date, i) => ({
        date,
        max: forecastData.daily.temperature_2m_max[i],
        min: forecastData.daily.temperature_2m_min[i],
        code: forecastData.daily.weathercode[i],
      }));
           console.log(dailyForecast)
      setForecast(dailyForecast.slice(0, 5)); // show 5 days only
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1 className="fade-in">🌤️ Cute Weather App</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather} disabled={!city || loading}>
          {loading ? "Fetching..." : "Search"}
        </button>
      </div>

      {error && <p className="error fade-in">{error}</p>}
      {weather && <WeatherCard weather={weather} />}

      {forecast.length > 0 && (
        <div className="forecast">
          {forecast.map((day) => (
            <ForecastCard key={day.date} day={day} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
