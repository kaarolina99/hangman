// src/hooks/useGame.ts
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { GameData } from "../gameData";

export function useGame(gameId: string) {
  const [game, setGame] = useState<GameData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const gameRef = doc(db, "games", gameId);
    const unsub = onSnapshot(gameRef, (snap) => {
      setGame(snap.data() as GameData);
      setLoading(false);
    });

    return () => unsub();
  }, [gameId]);

  return { game, loading };
}
