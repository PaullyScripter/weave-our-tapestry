import { useMemo, useState } from "react";
import { db } from "./mockDb";

export function SearchPanel() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    const hits: any[] = [];

    for (const user of db.users) {
      for (const c of user.contributions) {
        const haystackParts = [
          c.storyTitle,
          c.content,
          user.username,
          ...(c.comment?.map((cm) => cm.content) ?? []),
          ...(c.comment?.map((cm) => cm.commenterUsername) ?? []),
        ];

        const haystack = haystackParts.join(" ").toLowerCase();

        if (haystack.includes(q)) {
          hits.push({
            storyID: c.storyID,
            storyTitle: c.storyTitle,
            likesReceived: c.likesReceived,
            commentCount: c.comment?.length ?? 0,
            countryofOrigin: c.countryofOrigin,
            cultureofOrigin: c.cultureofOrigin,
            authorUsername: user.username,
          });
        }
      }
    }

    return hits;
  }, [query]);

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

      {results.map((r) => (
        <div
          key={r.storyID}
          style={{
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: 10,
            marginBottom: 8,
          }}
        >
          <strong>{r.storyTitle}</strong>
          <div>❤️ {r.likesReceived}</div>
          <div>Comments: {r.commentCount}</div>
          <div>Country: {r.countryofOrigin}</div>
          <div>Culture: {r.cultureofOrigin}</div>
          <div>Author: {r.authorUsername}</div>
        </div>
      ))}
    </div>
  );
}