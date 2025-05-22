// src/Lobby.tsx
import { useState } from "react";
import { Game } from "./Game"; // Husk å ha en fungerende Game.tsx
import { createGame } from "./utils/createGame";
import { joinGame } from "./utils/joinGame";

export function Lobby() {
  const [playerName, setPlayerName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [gameId, setGameId] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);

  const handleCreateGame = async () => {
    if (!playerName.trim()) return alert("Skriv inn navn");
    const word = prompt("Skriv inn ordet å gjette (ikke si det høyt!)") || "";
    if (!word.trim()) return;
    const { gameId, playerId } = await createGame(
      word.toLowerCase(),
      playerName
    );
    setGameId(gameId);
    setPlayerId(playerId);
  };

  const handleJoinGame = async () => {
    if (!playerName.trim() || !joinCode.trim())
      return alert("Skriv inn navn og spillkode");
    const { playerId } = await joinGame(joinCode.trim(), playerName);
    setGameId(joinCode.trim());
    setPlayerId(playerId);
  };

  if (gameId && playerId) {
    return <Game gameId={gameId} playerId={playerId} />;
  }

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>🧑‍🤝‍🧑 Multiplayer Hangman</h1>

      <div style={{ marginBottom: "1rem" }}>
        <input
          placeholder="Ditt navn"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          style={{ fontSize: "1rem", padding: "0.5rem" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={handleCreateGame} disabled={!playerName.trim()}>
          Opprett nytt spill
        </button>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <input
          placeholder="Spillkode"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
          style={{ fontSize: "1rem", padding: "0.5rem" }}
        />
      </div>

      <button
        onClick={handleJoinGame}
        disabled={!playerName.trim() || !joinCode.trim()}
      >
        Bli med i spill
      </button>
    </div>
  );
}
