import { useState } from "react";
import { Window } from "./Window";
import { SearchPanel } from "./SearchPanel";

type Story = {
  id: number;
  title: string;
  culture: string;
  text: string;
  views: number;
};

export default function App() {
  const [openStory, setOpenStory] = useState<Story | null>(null);

  return (
    <div>
      <h1>Weave Our Tapestry</h1>

      <Window
        title="Story Search"
        initialX={40}
        initialY={120}
        initialWidth={900}
        initialHeight={520}
      >
        <SearchPanel onOpenStory={setOpenStory} />
      </Window>

      {openStory && (
        <Window
          title={openStory.title}
          initialX={620}
          initialY={260}
          initialWidth={360}
          initialHeight={320}
          onClose={() => setOpenStory(null)}
        >
          <div>
            <div style={{ marginBottom: 8 }}>
              <strong>Culture:</strong> {openStory.culture}
            </div>
            <div style={{ marginBottom: 12 }}>
              <strong>Views:</strong> {openStory.views}
            </div>
            <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.5 }}>
              {openStory.text}
            </div>
          </div>
        </Window>
      )}
    </div>
  );
}