import { useState, useEffect } from "react";

export default function HeroTitle() {
    const [title, setTitle] = useState("User");
    const [editing, setEditing] = useState(false);
    const [greeting, setGreeting] = useState("");

    useEffect(() => {
        const saved = localStorage.getItem("heroTitle");
        if (saved) setTitle(saved);

        updateGreeting();
        const interval = setInterval(updateGreeting, 60000);

        return () => clearInterval(interval);
    }, []);

    const updateGreeting = () => {
        const hour = new Date().getHours();

        if (hour >= 5 && hour < 12) setGreeting("Good Morning");
        else if (hour >= 12 && hour < 17) setGreeting("Good Afternoon");
        else if (hour >= 17 && hour < 21) setGreeting("Good Evening");
        else setGreeting("Good Night");
    };

    const saveTitle = (value) => {
        setTitle(value);
        localStorage.setItem("heroTitle", value);
    };

    return (
        <div className="flex justify-center mt-14 w-full">
            {editing ? (
                <input
                    autoFocus
                    value={title}
                    onChange={(e) => saveTitle(e.target.value)}
                    onBlur={() => setEditing(false)}
                    className="
                        px-10 py-4
                        inline-flex
                        rounded-3xl
                        border border-white/10
                        text-white
                        text-4xl
                        font-semibold
                        text-center
                        outline-none
                        bg-black/20
                        backdrop-blur-xl
                        shadow-[0_8px_32px_rgba(0,0,0,0.35)]
                        transition-all
                        font-[Poppins]
                        min-w-[250px]
                        max-w-[90%]
                    "
                />
            ) : (
                <div
                    onClick={() => setEditing(true)}
                    className="
                        px-10 py-4
                        inline-flex
                        rounded-3xl
                        border border-white/10
                        text-white
                        text-4xl
                        font-semibold
                        text-center
                        backdrop-blur-xl
                        bg-black/20
                        shadow-[0_8px_32px_rgba(0,0,0,0.35)]
                        cursor-text
                        select-none
                        transition-all
                        hover:bg-black/30
                        hover:scale-[1.02]
                        font-[Poppins]
                        animate-fadeIn
                        min-w-[250px]
                        max-w-[90%]
                    "
                >
                    {greeting}, {title}
                </div>
            )}
        </div>
    );
}
