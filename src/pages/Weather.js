import React, { useEffect, useState } from "react";
import axios from "axios";

function Weather() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("Detecting location...");

  const API_KEY = "7facebf57a7aaaa5d0d52c9b8e1ab4f6"; // 🔥 put your OpenWeather API key

  useEffect(() => {
    // 📍 Get user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // 🌦️ Fetch weather using coordinates
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          )
          .then((res) => {
            setWeather(res.data);
            setLocation(res.data.name);
          })
          .catch((err) => {
            console.log(err);
          });
      },
      (error) => {
        console.log(error);
        setLocation("Location access denied ❌");
      }
    );
  }, []);

  return (
    <div className="container py-5 text-center">

      <h1 className="fw-bold display-4 mb-3">🌦️ Weather Info</h1>

      <p className="text-muted mb-4">
        Live weather based on your current location 📍
      </p>

      {weather ? (
        <div
          className="card shadow-lg p-4 mx-auto"
          style={{ maxWidth: "500px", borderRadius: "16px" }}
        >
          <h3 className="fw-bold">📍 {location}</h3>

          <h1 className="display-5 text-success fw-bold mt-2">
            {weather.main.temp}°C
          </h1>

          <p className="text-muted">
            {weather.weather[0].description}
          </p>

          <hr />

          <div className="d-flex justify-content-around mt-3">
            <div>
              <p className="mb-1">🌡️ Temp</p>
              <strong>{weather.main.temp}°C</strong>
            </div>

            <div>
              <p className="mb-1">💧 Humidity</p>
              <strong>{weather.main.humidity}%</strong>
            </div>

            <div>
              <p className="mb-1">🌬️ Wind</p>
              <strong>{weather.wind.speed} km/h</strong>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading weather...</p>
      )}

    </div>
  );
}

export default Weather;
