import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuid } from "uuid";

export async function joinGame(
  gameId: string,
  playerName: string
): Promise<{ playerId: string }> {
  const playerId = uuid();
  const gameRef = doc(db, "games", gameId);
  const gameSnap = await getDoc(gameRef);

  if (!gameSnap.exists()) {
    throw new Error("Spillet finnes ikke");
  }

  const gameData = gameSnap.data();
  console.log("Hentet gameData:", gameData);

  // Oppdater players-lista med ny spiller
  await updateDoc(gameRef, {
    [`players.${playerId}`]: {
      name: playerName,
      joinedAt: Date.now(),
    },
  });

  return { playerId };
}
