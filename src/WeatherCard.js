const weatherIcons = {
  0: { icon: "☀️", type: "sun" },
  1: { icon: "🌤️", type: "sun" },
  2: { icon: "⛅", type: "cloud" },
  3: { icon: "☁️", type: "cloud" },
  45: { icon: "🌫️", type: "cloud" },
  48: { icon: "🌫️", type: "cloud" },
  51: { icon: "🌦️", type: "rain" },
  61: { icon: "🌧️", type: "rain" },
  63: { icon: "🌧️", type: "rain" },
  65: { icon: "🌧️", type: "rain" },
  66: { icon: "🌨️", type: "snow" },
  67: { icon: "🌨️", type: "snow" },
  71: { icon: "❄️", type: "snow" },
  73: { icon: "❄️", type: "snow" },
  75: { icon: "❄️", type: "snow" },
  77: { icon: "🌨️", type: "snow" },
  80: { icon: "🌦️", type: "rain" },
  81: { icon: "🌧️", type: "rain" },
  82: { icon: "🌧️", type: "rain" },
  85: { icon: "❄️", type: "snow" },
  86: { icon: "❄️", type: "snow" },
  95: { icon: "⛈️", type: "thunder" },
  96: { icon: "⛈️", type: "thunder" },
  99: { icon: "⛈️", type: "thunder" },
};

export default function WeatherCard({ weather }) {
  const info = weatherIcons[weather.code] || { icon: "❔", text: "Unknown" };

  return (
    <div className="card">
      <h2>
       <div className={`icon ${info.type}`}>{info.icon}</div> {weather.name}, {weather.country}
      </h2>
      <p>{info.text}</p>
      <p>🌡️ {weather.temperature}°C</p>
      <p>💨 Wind: {weather.wind} km/h</p>
    </div>
  );
}
