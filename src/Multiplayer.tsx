// App.tsx
import { useState } from "react";
import { createGame } from "./utils/createGame";
import { joinGame } from "./utils/joinGame";
import { Game } from "./Game";

function Multiplayer() {
  const [playerName, setPlayerName] = useState("");
  const [gameId, setGameId] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [joinCode, setJoinCode] = useState("");

  const handleCreateGame = async () => {
    const word =
      prompt("Skriv inn ordet å gjette (ikke si det høyt! 😄)") || "";
    if (!word) return;
    const { gameId, playerId } = await createGame(
      word.toLowerCase(),
      playerName
    );
    setGameId(gameId);
    setPlayerId(playerId);
  };

  const handleJoinGame = async () => {
    const { playerId } = await joinGame(joinCode, playerName);
    setGameId(joinCode);
    setPlayerId(playerId);
  };

  if (gameId && playerId) {
    return <Game gameId={gameId} playerId={playerId} />;
  }

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>🧑‍🤝‍🧑 Multiplayer Hangman</h1>
      <input
        placeholder="Ditt navn"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <div style={{ margin: "1rem" }}>
        <button onClick={handleCreateGame} disabled={!playerName}>
          Opprett nytt spill
        </button>
      </div>
      <div>
        <input
          placeholder="Spillkode"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
        />
        <button onClick={handleJoinGame} disabled={!playerName || !joinCode}>
          Bli med i spill
        </button>
      </div>
    </div>
  );
}

export default Multiplayer;
