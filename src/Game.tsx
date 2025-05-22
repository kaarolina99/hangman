// src/components/Game.tsx
import { useEffect, useState } from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "./firebase";
import { useGame } from "./hooks/useGame";
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";

type GameProps = {
  gameId: string;
  playerId: string;
};

export function Game({ gameId, playerId }: GameProps) {
  console.log("Hentet playerID:", playerId);
  const { game, loading } = useGame(gameId);
  const [statusMessage, setStatusMessage] = useState("");

  if (loading || !game) return <p>Laster spillet...</p>;

  const incorrectLetters = game.guessedLetters.filter(
    (l: string) => !game.word.includes(l)
  );

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = game.word
    .split("")
    .every((letter: string) => game.guessedLetters.includes(letter));

  const guessLetter = async (letter: string) => {
    if (
      game.guessedLetters.includes(letter) ||
      isWinner ||
      isLoser ||
      game.status === "done"
    )
      return;

    const gameRef = doc(db, "games", gameId);
    await updateDoc(gameRef, {
      guessedLetters: arrayUnion(letter),
    });
  };

  useEffect(() => {
    if (isWinner) {
      setStatusMessage("🎉 Du vant!");
    } else if (isLoser) {
      setStatusMessage(`😢 Du tapte! Ordet var "${game.word.toUpperCase()}"`);
    } else {
      setStatusMessage("");
    }
  }, [isWinner, isLoser]);

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h2>Spill-ID: {gameId}</h2>
      <p>{statusMessage}</p>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord
        guessedLetters={game.guessedLetters}
        wordToGuess={game.word}
        reveal={isLoser}
      />
      <div style={{ marginTop: "2rem" }}>
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetters={game.guessedLetters.filter((l: string) =>
            game.word.includes(l)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={guessLetter}
        />
      </div>
    </div>
  );
}
