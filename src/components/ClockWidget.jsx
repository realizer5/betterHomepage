import { useState, useEffect } from "react";

export default function ClockWidget() {
    const [time, setTime] = useState("");
    const [is24Hour, setIs24Hour] = useState(true);

    // Load saved format preference
    useEffect(() => {
        const saved = localStorage.getItem("clockFormat");
        if (saved) setIs24Hour(saved === "24");
    }, []);

    // Update time every second
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            let hours = now.getHours();
            let minutes = now.getMinutes().toString().padStart(2, "0");

            let suffix = "";

            if (!is24Hour) {
                suffix = hours >= 12 ? " PM" : " AM";
                hours = hours % 12 || 12;
            }

            hours = hours.toString().padStart(2, "0");
            setTime(`${hours}:${minutes}${suffix}`);
        };

        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, [is24Hour]);

    const toggleFormat = () => {
        const newFormat = !is24Hour;
        setIs24Hour(newFormat);
        localStorage.setItem("clockFormat", newFormat ? "24" : "12");
    };

    return (
        <div
            className="
        px-5 py-3 
        rounded-2xl 
        border border-white/20 
        backdrop-blur-md 
        text-white 
        text-xl 
        cursor-pointer
        hover:border-white/40
        transition
        select-none
      "
            onClick={toggleFormat}
            title="Click to switch format"
        >
            {time}
        </div>
    );
}
