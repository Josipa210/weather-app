import { motion } from "framer-motion";

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

// Helper animations
const floatAnimation = { y: [0, 10, 0], transition: { repeat: Infinity, duration: 1.5 } };
const rainAnimation = { y: [0, 20], opacity: [0.5, 1], transition: { repeat: Infinity, duration: 0.5 } };
const snowAnimation = { y: [0, 15], opacity: [0.3, 1], transition: { repeat: Infinity, duration: 2 } };
const sunRayAnimation = { rotate: [0, 20, -20, 0], transition: { repeat: Infinity, duration: 2 } };
const thunderAnimation = { scale: [1, 1.5, 1], transition: { repeat: Infinity, duration: 0.3 } };

export default function ForecastCard({ day }) {
  const info = weatherIcons[day.code] || { icon: "❔", type: "unknown" };
  const dateObj = new Date(day.date);
  const options = { weekday: "short", month: "short", day: "numeric" };
  const dateStr = dateObj.toLocaleDateString(undefined, options);

  return (
    <motion.div
      className="forecast-card p-4 bg-white rounded-2xl shadow-lg text-center relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="font-semibold mb-0">{dateStr}</h3>

      <div className="relative w-16 h-16 mx-auto mb-4">
      {/* Sun rays */}
{info.type === "sun" && (
  <motion.div
    className="absolute w-20 h-20 rounded-full border-yellow-400 border-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    animate={{ rotate: [0, 20, -20, 0] }}
    transition={{ repeat: Infinity, duration: 2 }}
  />
)}

{/* Cloud drifting */}
{info.type === "cloud" && (
  <motion.div
    className="absolute text-4xl"
    animate={{ y: [0, 10, 0] }}
    transition={{ repeat: Infinity, duration: 1.5 }}
  >
    {info.icon}
  </motion.div>
)}

{/* Rain drops */}
{info.type === "rain" &&
  Array.from({ length: 1 }).map((_, i) => (
    <motion.div
      key={i}
      className="absolute text-lg text-blue-500"
      style={{ top: 0, left: `${i * 4}px` }}
      animate={{ y: [0, 20], opacity: [0.5, 1] }}
      transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
    >
      💧
    </motion.div>
  ))}

{/* Snowflakes */}
{info.type === "snow" &&
  Array.from({ length:1 }).map((_, i) => (
    <motion.div
      key={i}
      className="absolute text-lg text-white"
      style={{ top: 0, left: `${i * 4}px` }}
      animate={{ y: [0, 15], opacity: [0.3, 1] }}
      transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
    >
      ❄️
    </motion.div>
  ))}

{/* Thunder flash */}
{info.type === "thunder" && (
  <motion.div
    className="absolute text-4xl text-yellow-400"
    animate={{ scale: [1, 1.5, 1] }}
    transition={{ repeat: Infinity, duration: 0.3 }}
  >
    ⚡
  </motion.div>
)}

        {/* Base icon */}
        <div className="absolute text-4xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* {info.icon} */}
        </div>
      </div>

      <p className="font-medium">{day.max}° / {day.min}°C</p>
    </motion.div>
  );
}
