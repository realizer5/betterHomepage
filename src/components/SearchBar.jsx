import { useState, useEffect } from "react";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [engine, setEngine] = useState("https://www.google.com/search?q=");

    // Load saved engine
    useEffect(() => {
        const saved = localStorage.getItem("searchEngine");
        if (saved) setEngine(saved);
    }, []);

    const search = () => {
        if (!query.trim()) return;
        window.open(engine + encodeURIComponent(query), "_blank");
    };

    const changeEngine = (value) => {
        setEngine(value);
        localStorage.setItem("searchEngine", value);
    };

    return (
        <div className="w-full flex flex-col items-center mt-8">
            <div
                className="
          flex items-center 
          w-[70%] max-w-2xl 
          bg-white/5 
          border border-white/20 
          backdrop-blur-lg 
          rounded-3xl 
          px-5 py-4
          gap-4
        "
            >
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && search()}
                    placeholder="Search..."
                    className="
            w-full 
            bg-transparent 
            text-white 
            text-lg 
            outline-none
            placeholder-white/40
          "
                />

                <button
                    onClick={search}
                    className="
            bg-white/10 
            px-4 py-2 
            rounded-xl 
            text-white 
            hover:bg-white/20 
            transition
          "
                >
                    Go
                </button>
            </div>

            {/* Search engine selector */}
            <div className="mt-3">
                <select
                    value={engine}
                    onChange={(e) => changeEngine(e.target.value)}
                    className="
            bg-white/10 
            border border-white/20 
            text-white 
            rounded-xl 
            px-4 py-2 
            outline-none
          "
                >
                    <option value="https://www.google.com/search?q=">Google</option>
                    <option value="https://duckduckgo.com/?q=">DuckDuckGo</option>
                    <option value="https://www.bing.com/search?q=">Bing</option>
                    <option value="https://search.brave.com/search?q=">Brave</option>
                    <option value="https://www.youtube.com/results?search_query=">YouTube</option>
                </select>
            </div>
        </div>
    );
}
