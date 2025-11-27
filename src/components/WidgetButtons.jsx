
import { useState, useEffect } from "react";
import ClockWidget from "./ClockWidget";
import WeatherWidget from "./WeatherWidget";

export default function WidgetButtons() {
    const [showClock, setShowClock] = useState(true);
    const [showWeather, setShowWeather] = useState(true);

    // Load saved states
    useEffect(() => {
        const savedClock = localStorage.getItem("showClock");
        const savedWeather = localStorage.getItem("showWeather");

        if (savedClock !== null) setShowClock(savedClock === "true");
        if (savedWeather !== null) setShowWeather(savedWeather === "true");
    }, []);

    // Save to storage
    const saveState = (type, value) => {
        localStorage.setItem(type, value);
    };

    return (
        <>
            {/* Buttons container */}
            <div
                className="
          flex gap-4
          absolute bottom-6 right-6
        "
            >
                {/* Clock Button */}
                <button
                    onClick={() => {
                        setShowClock(!showClock);
                        saveState("showClock", !showClock);
                    }}
                    className="
            px-4 py-2 
            rounded-xl
            border border-white/20
            backdrop-blur-md
            bg-white/10
            text-white
            hover:bg-white/20
            transition
          "
                >
                    Clock
                </button>

                {/* Weather Button */}
                <button
                    onClick={() => {
                        setShowWeather(!showWeather);
                        saveState("showWeather", !showWeather);
                    }}
                    className="
            px-4 py-2 
            rounded-xl
            border border-white/20
            backdrop-blur-md
            bg-white/10
            text-white
            hover:bg-white/20
            transition
          "
                >
                    Weather
                </button>
            </div>

            {/* Widgets themselves */}
            {showClock && (
                <div className="absolute bottom-6 right-[120px]">
                    <ClockWidget />
                </div>
            )}

            {showWeather && (
                <div className="absolute bottom-6 right-[220px]">
                    <WeatherWidget />
                </div>
            )}
        </>
    );
}
