import { useState, useEffect } from "react";

export default function HeroTitle() {
    const [title, setTitle] = useState("My Custom Text");
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("heroTitle");
        if (saved) setTitle(saved);
    }, []);

    const saveTitle = (value) => {
        setTitle(value);
        localStorage.setItem("heroTitle", value);
    };

    return (
        <div className="flex justify-center mt-10">
            {editing ? (
                <input
                    autoFocus
                    value={title}
                    onChange={(e) => saveTitle(e.target.value)}
                    onBlur={() => setEditing(false)}
                    className="
            px-10 py-6 
            rounded-3xl 
            border border-white/20 
            text-white 
            text-3xl 
            text-center
            font-semibold 
            backdrop-blur-md
            bg-transparent 
            outline-none
          "
                />
            ) : (
                <div
                    onClick={() => setEditing(true)}
                    className="
            px-10 py-6 
            rounded-3xl 
            border border-white/20 
            text-white 
            text-3xl 
            font-semibold 
            backdrop-blur-md
            cursor-text
            select-none
          "
                >
                    {title}
                </div>
            )}
        </div>
    );
}
