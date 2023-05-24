const { CardGame } = require("./cardGame");
const { test, expect, describe } = require("@jest/globals");

describe("testCardGame", () => {
   let container;
   let cardGame;

   beforeEach(() => {
      container = document.createElement("div");
   });

   afterEach(() => {
      container.remove();
   });

   describe("renderScreenCardGame", () => {
      test("should render the card game screen", () => {
         cardGame = new CardGame(container);

         cardGame.renderScreenCardGame();

         expect(
            container.querySelector(".render-screen-card-game")
         ).toBeTruthy();
         expect(container.querySelector(".card-table")).toBeTruthy();
         expect(container.querySelector(".block-time")).toBeTruthy();
         expect(container.querySelector(".btn_restart")).toBeTruthy();
      });
   });

   describe("levelDifficulty", () => {
      test("should render screen difficulty selection if level difficulty is not set", () => {
         localStorage.removeItem("levelDifficulty");

         new CardGame(container);

         expect(container.innerHTML).toContain("Выбери сложность");
      });

      test("should render screen card game if level difficulty is set lite", () => {
         localStorage.setItem("levelDifficulty", "Легкий");

         new CardGame(container);

         expect(container.innerHTML).toContain("render-screen-card-game");
      });

      test("should render screen card game if level difficulty is set middle", () => {
         localStorage.setItem("levelDifficulty", "Средний");

         new CardGame(container);

         expect(container.innerHTML).toContain("render-screen-card-game");
      });

      test("should render screen card game if level difficulty is set hard", () => {
         localStorage.setItem("levelDifficulty", "Сложный");

         new CardGame(container);

         expect(container.innerHTML).toContain("render-screen-card-game");
      });
   });
});
