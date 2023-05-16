const arrLevelDifficulty = ["Легкий", "Средний", "Сложный"];
let arrGetRandomIndex: number[] = [];
let arrShirtUpIndex: number[] = [];
let indexLevelDif = 0;
let t;

export class CardGame {
   container: HTMLElement;
   levelDifficulty: string;

   constructor(container) {
      this.container = container;
      this.levelDifficulty = localStorage.getItem("levelDifficulty");

      if (this.levelDifficulty) {
         this.renderScreenCardGame();
      } else {
         this.renderScreenDifficultySelection();
      }
   }

   renderScreenDifficultySelection() {
      this.container.replaceChildren();

      const divScDifSel = document.createElement("div");
      divScDifSel.classList.add("div-sds");

      const section = document.createElement("section");
      section.classList.add("screen-difficulty-selection");

      const h1 = document.createElement("h1");
      h1.textContent = "Выбери сложность";
      h1.classList.add("main_title");

      const div = document.createElement("div");
      div.classList.add("main_difficulty-selection");

      const buttonOne = document.createElement("button");
      buttonOne.textContent = "1";
      buttonOne.classList.add("main_btn-dif-sel");

      const buttonTwo = document.createElement("button");
      buttonTwo.textContent = "2";
      buttonTwo.classList.add("main_btn-dif-sel");

      const buttonThree = document.createElement("button");
      buttonThree.textContent = "3";
      buttonThree.classList.add("main_btn-dif-sel");

      const buttonStart = document.createElement("button");
      buttonStart.textContent = "Старт";
      buttonStart.classList.add("btn", "main_btn-start");

      let textContent = ""; // почему не используется переменная
      let numberTextContent = 0; // добавил для строчки 89
      let buttonClick = 0;

      div.addEventListener("click", (event) => {
         event.preventDefault();
         const targetElement = event.target as HTMLElement;
         const textContent = targetElement.textContent;

         if (textContent === "1") {
            buttonOne.classList.add("main_btn-dif-sel_active");
            buttonTwo.classList.remove("main_btn-dif-sel_active");
            buttonThree.classList.remove("main_btn-dif-sel_active");
            buttonClick += 1;
            numberTextContent = 1; // добавил для строчки 89
         }
         if (textContent === "2") {
            buttonOne.classList.remove("main_btn-dif-sel_active");
            buttonTwo.classList.add("main_btn-dif-sel_active");
            buttonThree.classList.remove("main_btn-dif-sel_active");
            buttonClick += 1;
            numberTextContent = 2; // добавил для строчки 89
         }
         if (textContent === "3") {
            buttonOne.classList.remove("main_btn-dif-sel_active");
            buttonTwo.classList.remove("main_btn-dif-sel_active");
            buttonThree.classList.add("main_btn-dif-sel_active");
            buttonClick += 1;
            numberTextContent = 3; // добавил для строчки 89
         }
      });

      buttonStart.addEventListener("click", (event) => {
         event.preventDefault();

         const levelDifficulty = arrLevelDifficulty[numberTextContent - 1]; // был textContent

         if (typeof levelDifficulty === "string") {
            if (buttonClick > 0) {
               this.levelDifficulty = levelDifficulty;
               localStorage.setItem("levelDifficulty", levelDifficulty);
               this.renderScreenCardGame();
            }
         }
      });

      section.appendChild(h1);
      section.appendChild(div);
      div.appendChild(buttonOne);
      div.appendChild(buttonTwo);
      div.appendChild(buttonThree);
      section.appendChild(buttonStart);
      divScDifSel.appendChild(section);

      this.container.appendChild(divScDifSel);
   }

   renderScreenCardGame() {
      this.container.replaceChildren();

      const section = document.createElement("section");
      section.classList.add("render-screen-card-game");

      const divTopBlock = document.createElement("div");
      divTopBlock.classList.add("top-block");

      const divBlockTime = document.createElement("div");
      divBlockTime.classList.add("block-time");

      const divMinSek = document.createElement("div");
      divMinSek.classList.add("min-sek");

      const pMin = document.createElement("p");
      pMin.classList.add("text-min-sek");
      pMin.textContent = "min";

      const pSek = document.createElement("p");
      pSek.classList.add("text-min-sek");
      pSek.textContent = "sek";

      const divTimer = document.createElement("div");
      divTimer.classList.add("timer");
      divTimer.textContent = "00.00";

      const button = document.createElement("button");
      button.classList.add("btn", "btn_restart");
      button.textContent = "Начать заново";

      const divCardTable = document.createElement("div");
      divCardTable.classList.add("card-table");

      if (this.levelDifficulty === "Легкий") {
         indexLevelDif = 3;
      } else if (this.levelDifficulty === "Средний") {
         indexLevelDif = 6;
      } else if (this.levelDifficulty === "Сложный") {
         indexLevelDif = 9;
      }

      function getRandomIndex() {
         let randomNubmer = 0;

         do {
            let repeatNumber = 0;
            let indexImg = Math.floor(Math.random() * (36 - 1 + 1)) + 1;

            for (let i = 0; i < arrGetRandomIndex.length; i++) {
               if (indexImg === arrGetRandomIndex[i]) {
                  repeatNumber += 1;
               }
            }

            if (repeatNumber === 0) {
               randomNubmer += 1;
               arrGetRandomIndex.push(indexImg, indexImg);
            }
         } while (randomNubmer < indexLevelDif);

         arrGetRandomIndex.sort(() => Math.random() - 0.5);
      }

      getRandomIndex(); // убрал 1 и 36

      for (let i = 0; i < indexLevelDif * 2; i++) {
         const imgBox = document.createElement("div");
         imgBox.classList.add("img-box");

         const imgRenderCard = document.createElement("img");
         imgRenderCard.classList.add("card-shirt-down", `img${[i]}`);
         imgRenderCard.src = `./static/cards/card${arrGetRandomIndex[i]}.png`;

         const imgCardShirtUp = document.createElement("img");
         imgCardShirtUp.classList.add("card-shirt-up", "card-shirt-up-hidden");
         imgCardShirtUp.src = `./static/shirt.png`;
         imgCardShirtUp.dataset.indexNumber = `${i}`;
         arrShirtUpIndex.push(i);

         imgBox.appendChild(imgRenderCard);
         imgBox.appendChild(imgCardShirtUp);
         divCardTable.appendChild(imgBox);
      }

      button.addEventListener("click", (event) => {
         event.preventDefault();
         if (confirm("Вы действительно хотите вернуться в выбор сложности?")) {
            localStorage.removeItem("levelDifficulty");
            this.levelDifficulty = "";
            arrGetRandomIndex = [];
            arrShirtUpIndex = [];
            this.renderScreenDifficultySelection();
         }
      });

      section.appendChild(divTopBlock);
      divTopBlock.appendChild(divBlockTime);
      divBlockTime.appendChild(divMinSek);
      divMinSek.appendChild(pMin);
      divMinSek.appendChild(pSek);
      divBlockTime.appendChild(divTimer);
      divTopBlock.appendChild(button);
      section.appendChild(divCardTable);

      this.container.appendChild(section);

      setTimeout(() => {
         this.getScreenStartGame();
      }, 5000);
   }

   getScreenStartGame() {
      const hiddenCards = document.querySelectorAll(".card-shirt-down");
      const cardsShirtUp = document.querySelectorAll(".card-shirt-up");
      const blockTimer = document.querySelector(".timer");

      let sec = 0;
      let min = 0;

      function tick() {
         sec++;
         if (sec >= 60) {
            sec = 0;
            min++;
            if (min >= 60) {
               // this.renderScreenLose();
               console.log("Ошибка");
            }
         }
      }
      function add() {
         tick();
         if (blockTimer) {
            blockTimer.textContent =
               (min > 9 ? min : "0" + min) + "." + (sec > 9 ? sec : "0" + sec);
            timer();
         }
      }
      function timer() {
         t = setTimeout(add, 1000);
      }

      timer();

      hiddenCards.forEach((hiddenCard) => {
         hiddenCard.classList.add("card-shirt-down-hidden");
      });

      cardsShirtUp.forEach((cardShirtUp) => {
         cardShirtUp.classList.remove("card-shirt-up-hidden");
      });

      let firstChoice = 37;
      let secondChoice = 37;
      let indexFinal = 0;

      cardsShirtUp.forEach((cardShirtUp) => {
         cardShirtUp.addEventListener("click", (event) => {
            // const target = event.target;
            const targetElement = event.target as HTMLElement;
            // if (targetElement) {
            targetElement.classList.add("card-shirt-up-hidden");

            let indexTarget = targetElement.dataset.indexNumber;
            const img = document.querySelector(`.img${indexTarget}`);
            if (img) {
               img.classList.remove("card-shirt-down-hidden");
            }

            if (firstChoice === 37) {
               firstChoice = arrGetRandomIndex[indexTarget];
            } else {
               secondChoice = arrGetRandomIndex[indexTarget];
            }

            if (firstChoice < 37 && secondChoice < 37) {
               if (firstChoice === secondChoice) {
                  indexFinal += 1;
                  if (indexFinal === indexLevelDif) {
                     clearTimeout(t);
                     this.renderScreenWin();
                  }
               } else {
                  clearTimeout(t);
                  this.renderScreenLose();
               }
               firstChoice = 37;
               secondChoice = 37;
            }
            // }
         });
      });
   }

   renderScreenWin() {
      const blockTimer = document.querySelector(".timer");
      if (blockTimer) {
         const textContentTimer = blockTimer.textContent;

         const sectionLose = document.createElement("section");
         sectionLose.classList.add("render-sreen-final__turbid");

         const divLose = document.createElement("div");
         divLose.classList.add("render-sreen-final");

         const imgLose = document.createElement("img");
         imgLose.classList.add("render-sreen-final__img");
         imgLose.src = "./static/win.png";

         const titleLose = document.createElement("h1");
         titleLose.classList.add("render-sreen-final__title");
         titleLose.textContent = "Вы выиграли!";

         const textLose = document.createElement("h2");
         textLose.classList.add("render-sreen-final__text");
         textLose.textContent = "Затраченное время:";

         const timeGame = document.createElement("p");
         timeGame.classList.add("time-game", "render-sreen-final__time-game");
         timeGame.textContent = textContentTimer;

         const button = document.createElement("button");
         button.classList.add("btn", "btn_creen-lose");
         button.textContent = "Играть снова";

         button.addEventListener("click", (event) => {
            event.preventDefault();
            if (
               confirm("Вы действительно хотите вернуться в выбор сложности?")
            ) {
               localStorage.removeItem("levelDifficulty");
               this.levelDifficulty = "";
               arrGetRandomIndex = [];
               arrShirtUpIndex = [];
               this.renderScreenDifficultySelection();
            }
         });

         divLose.appendChild(imgLose);
         divLose.appendChild(titleLose);
         divLose.appendChild(textLose);
         divLose.appendChild(timeGame);
         divLose.appendChild(button);
         this.container.appendChild(sectionLose);
         this.container.appendChild(divLose);
      }
   }

   renderScreenLose() {
      const blockTimer = document.querySelector(".timer");
      if (blockTimer) {
         const textContentTimer = blockTimer.textContent;

         const sectionLose = document.createElement("section");
         sectionLose.classList.add("render-sreen-final__turbid");

         const divLose = document.createElement("div");
         divLose.classList.add("render-sreen-final");

         const imgLose = document.createElement("img");
         imgLose.classList.add("render-sreen-final__img");
         imgLose.src = "./static/lose.png";

         const titleLose = document.createElement("h1");
         titleLose.classList.add("render-sreen-final__title");
         titleLose.textContent = "Вы проиграли!";

         const textLose = document.createElement("h2");
         textLose.classList.add("render-sreen-final__text");
         textLose.textContent = "Затраченное время:";

         const timeGame = document.createElement("p");
         timeGame.classList.add("time-game", "render-sreen-final__time-game");
         timeGame.textContent = textContentTimer;

         const button = document.createElement("button");
         button.classList.add("btn", "btn_creen-lose");
         button.textContent = "Играть снова";

         button.addEventListener("click", (event) => {
            event.preventDefault();
            if (
               confirm("Вы действительно хотите вернуться в выбор сложности?")
            ) {
               localStorage.removeItem("levelDifficulty");
               this.levelDifficulty = "";
               arrGetRandomIndex = [];
               arrShirtUpIndex = [];
               this.renderScreenDifficultySelection();
            }
         });

         divLose.appendChild(imgLose);
         divLose.appendChild(titleLose);
         divLose.appendChild(textLose);
         divLose.appendChild(timeGame);
         divLose.appendChild(button);
         this.container.appendChild(sectionLose);
         this.container.appendChild(divLose);
      }
   }
}
