// src/utils/createGame.ts
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuid } from "uuid";

export async function createGame(
  word: string,
  playerName: string
): Promise<{ gameId: string; playerId: string }> {
  const gameId = uuid().slice(0, 6); // kortere spillkode
  const playerId = uuid();

  const gameRef = doc(collection(db, "games"), gameId);

  await setDoc(gameRef, {
    word,
    guessedLetters: [],
    players: {
      [playerId]: {
        name: playerName,
        joinedAt: Date.now(),
      },
    },
    status: "in-progress", // eller "waiting", "done"
    createdAt: Date.now(),
  });

  return { gameId, playerId };
}
