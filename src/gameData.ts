// src/types/GameData.ts
export type Player = {
  name: string;
  joinedAt: number;
};

export type GameData = {
  word: string;
  guessedLetters: string[];
  players: Record<string, Player>;
  status: "in-progress" | "waiting" | "done";
  createdAt: number;
};
