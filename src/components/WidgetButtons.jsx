import { useState, useEffect } from "react";
import ClockWidget from "./ClockWidget";
import WeatherWidget from "./WeatherWidget";
import { FiClock, FiCloud } from "react-icons/fi";

export default function WidgetButtons() {
    const [showClock, setShowClock] = useState(true);
    const [showWeather, setShowWeather] = useState(true);
    const [glow, setGlow] = useState(false); // RGB glow animation toggle
    const [lastMinute, setLastMinute] = useState(null);

    // Load saved widget states
    useEffect(() => {
        const savedClock = localStorage.getItem("showClock");
        const savedWeather = localStorage.getItem("showWeather");

        if (savedClock !== null) setShowClock(savedClock === "true");
        if (savedWeather !== null) setShowWeather(savedWeather === "true");
    }, []);

    const saveState = (key, value) => {
        localStorage.setItem(key, value);
    };

    // =============================
    // RGB BORDER ANIMATION ON MINUTE CHANGE
    // =============================
    useEffect(() => {
        const interval = setInterval(() => {
            const minute = new Date().getMinutes();

            if (minute !== lastMinute) {
                setLastMinute(minute);

                // Trigger glow
                setGlow(true);

                // Remove glow after animation
                setTimeout(() => setGlow(false), 2200);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [lastMinute]);

    return (
        <>
            {/* ===========================
                 UNIFIED WIDGET DOCK
            ============================ */}
            <div
                className={`
                    absolute bottom-6 right-6
                    flex items-center gap-4
                    px-5 py-3
                    rounded-2xl
                    backdrop-blur-2xl
                    bg-white/5
                    border border-white/10
                    shadow-[0_0_25px_rgba(0,0,0,0.35)]
                    z-20
                    animate-fadeIn
                    transition-all
                    ${glow ? "rgb-border-glow" : ""}
                `}
            >
                {/* Weather */}
                {showWeather && (
                    <WeatherWidget compact />
                )}

                {/* Divider */}
                {showWeather && showClock && (
                    <div className="w-[1px] h-7 bg-white/15 rounded-full" />
                )}

                {/* Clock */}
                {showClock && (
                    <ClockWidget compact />
                )}

                {/* Toggle Buttons */}
                <div className="flex items-center gap-2 ml-1">

                    {/* Clock Toggle */}
                    <button
                        onClick={() => {
                            const val = !showClock;
                            setShowClock(val);
                            saveState("showClock", val);
                        }}
                        className={`
                            w-7 h-7 flex items-center justify-center
                            rounded-lg text-white transition-all
                            ${showClock ? "bg-white/20" : "bg-white/5"}
                            hover:bg-white/20 active:scale-95
                        `}
                    >
                        <FiClock size={14} />
                    </button>

                    {/* Weather Toggle */}
                    <button
                        onClick={() => {
                            const val = !showWeather;
                            setShowWeather(val);
                            saveState("showWeather", val);
                        }}
                        className={`
                            w-7 h-7 flex items-center justify-center
                            rounded-lg text-white transition-all
                            ${showWeather ? "bg-white/20" : "bg-white/5"}
                            hover:bg-white/20 active:scale-95
                        `}
                    >
                        <FiCloud size={14} />
                    </button>

                </div>
            </div>
        </>
    );
}
