import { useEffect, useMemo, useState } from "react";

type Story = {
  id: number;
  title: string;
  culture: string;
  text: string;
  views: number;
};

type SearchPanelProps = {
  onOpenStory: (story: Story) => void;
};

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "https://weave-our-tapestry.onrender.com";

export function SearchPanel({ onOpenStory }: SearchPanelProps) {
  const [query, setQuery] = useState("");
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStories() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_BASE}/api/stories`);
        if (!response.ok) {
          throw new Error(`Failed to load stories: ${response.status}`);
        }

        const data: Story[] = await response.json();
        setStories(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load stories.");
      } finally {
        setLoading(false);
      }
    }

    loadStories();
  }, []);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    return stories.filter((story) =>
      [story.title, story.culture, story.text]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query, stories]);

  async function handleReadStory(storyId: number) {
    try {
      setError("");

      const response = await fetch(`${API_BASE}/api/stories/${storyId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch story: ${response.status}`);
      }

      const story: Story = await response.json();
      onOpenStory(story);

      await fetch(`${API_BASE}/api/stories/${storyId}/views`, {
        method: "POST",
      });

      setStories((prev) =>
        prev.map((s) =>
          s.id === storyId ? { ...s, views: s.views + 1 } : s
        )
      );
    } catch (err) {
      console.error(err);
      setError("Failed to open story.");
    }
  }

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search stories..."
        style={{
          width: "100%",
          padding: 8,
          marginBottom: 12,
          borderRadius: 6,
          border: "1px solid #ccc",
        }}
      />

      {loading && <div>Loading stories...</div>}
      {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}

      {!loading &&
        !error &&
        results.map((r) => (
          <div
            key={r.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 10,
              marginBottom: 8,
              background: "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <strong>{r.title}</strong>
              <div>Culture: {r.culture}</div>
              <div>Views: {r.views}</div>
            </div>

            <button
              type="button"
              onMouseDown={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                handleReadStory(r.id);
              }}
              style={{
                marginLeft: 8,
                padding: "6px 10px",
                borderRadius: 6,
                border: "1px solid #ccc",
                cursor: "pointer",
              }}
            >
              Read Story
            </button>
          </div>
        ))}
    </div>
  );
}