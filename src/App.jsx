import { HeroTitle, SearchBar, WidgetButtons, PinnedShortcuts } from "./components";
import BackgroundManager from "./components/BackgroundManager";

export default function App() {
  return (
    <div
      className="
        w-full h-screen 
        relative 
        overflow-hidden
        flex items-center justify-center
      "
    >
      {/* Fullscreen background system */}
      <BackgroundManager />

      {/* Left pinned shortcuts */}
      <PinnedShortcuts />

      {/* CENTER CONTENT */}
      <div className="flex flex-col items-center gap-6 z-10">
        <HeroTitle />
        <SearchBar />
      </div>

      {/* Bottom-right widget buttons */}
      <WidgetButtons />
    </div>
  );
}
