import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import Multiplayer from "./Multiplayer";
import { Lobby } from "./Lobby";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Lobby />
    <Multiplayer />
    <App />
  </StrictMode>
);
