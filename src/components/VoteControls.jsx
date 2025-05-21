import React from "react";

export default function VoteControls({ upCount, downCount, onUp, onDown }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginTop: "1rem",
      }}
    >
      <button
        onClick={onUp}
        style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
        aria-label="Upvote"
      >
        Upvotes ⬆️ {upCount}
      </button>
      <button
        onClick={onDown}
        style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
        aria-label="Downvote"
      >
        Downvotes ⬇️ {downCount}
      </button>
    </div>
  );
}
