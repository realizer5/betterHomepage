import { HeroTitle, SearchBar, BackgroundText, WidgetButtons, PinnedShortcuts } from "./components"; 

export default function App() {
  return (
    <div
      className="
        w-full h-screen 
        bg-black 
        text-white 
        relative 
        overflow-hidden
        flex items-center justify-center
      "
    >
      {/* Left pinned shortcuts */}
      <PinnedShortcuts />

      {/* CENTER CONTENT */}
      <div className="flex flex-col items-center gap-6">
        <HeroTitle />
        <SearchBar />
        <BackgroundText />
      </div>

      {/* Bottom-right widget buttons (Clock + Weather toggles) */}
      <WidgetButtons />
    </div>
  );
}
