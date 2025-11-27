import { useState, useEffect } from "react";

export default function WeatherWidget() {
    const [weather, setWeather] = useState(null);
    const [location, setLocation] = useState("New Delhi"); // default
    const [showEditor, setShowEditor] = useState(false);

    const API_KEY = "YOUR_OPENWEATHER_API_KEY"; // add your key here

    // Load saved location
    useEffect(() => {
        const saved = localStorage.getItem("weatherLocation");
        if (saved) setLocation(saved);
    }, []);

    // Fetch weather
    const fetchWeather = async () => {
        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
            );

            if (!res.ok) return;

            const data = await res.json();
            setWeather({
                temp: Math.round(data.main.temp),
                condition: data.weather[0].main,
                icon: data.weather[0].icon,
            });
        } catch (err) {
            console.log("Weather Error:", err);
        }
    };

    // Fetch on load
    useEffect(() => {
        fetchWeather();
    }, [location]);

    const saveLocation = () => {
        if (!location.trim()) return;
        localStorage.setItem("weatherLocation", location);
        fetchWeather();
        setShowEditor(false);
    };

    return (
        <>
            <div
                className="
          px-5 py-3 
          rounded-2xl 
          border border-white/20 
          backdrop-blur-md 
          text-white 
          text-lg 
          cursor-pointer
          hover:border-white/40
          transition
          select-none
          flex items-center gap-3
        "
                onClick={() => setShowEditor(true)}
                title="Click to edit location"
            >
                {weather ? (
                    <>
                        <img
                            src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
                            className="w-8 h-8"
                        />
                        <div>{weather.temp}°C</div>
                        <div className="text-white/70">{weather.condition}</div>
                    </>
                ) : (
                    "Loading..."
                )}
            </div>

            {/* Editor Popup */}
            {showEditor && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center">
                    <div className="bg-black/70 border border-white/20 rounded-3xl p-6 w-80 text-white">
                        <h2 className="text-xl font-semibold mb-4">Set Location</h2>

                        <input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="
                w-full px-4 py-2 rounded-xl 
                bg-white/10 border border-white/20 
                outline-none mb-4
              "
                        />

                        <div className="flex justify-between">
                            <button
                                onClick={() => setShowEditor(false)}
                                className="text-gray-300"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={saveLocation}
                                className="
                  px-4 py-1 
                  rounded-xl 
                  bg-white/20 
                  hover:bg-white/30 
                  transition
                "
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
