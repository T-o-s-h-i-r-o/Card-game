import { cardGameJs } from "./cardGame.js";
import "../style.css";

const container = document.querySelector(".app");

const cardGame = new CardGame(container);

cardGameJs();
