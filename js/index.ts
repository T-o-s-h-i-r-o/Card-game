import { CardGame } from "./cardGame.ts";
import "../style.css";
import * as _ from "lodash";

const container = document.querySelector(".app");

new CardGame(container);
