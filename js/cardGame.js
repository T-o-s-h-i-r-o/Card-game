const arrLevelDifficulty = ["Легкий", "Средний", "Сложный"];
let arrGetRandomIndex = [];
let arrShirtUpIndex = [];

export class CardGame {
   constructor(container) {
      this.container = container;
      this.levelDifficulty = localStorage.getItem("levelDifficulty");

      if (this.levelDifficulty) {
         this.renderScreenOpenCards();
         // Временное название. Потом поменять на renderScreenCardGame
      } else {
         this.renderScreenDifficultySelection();
      }
   }

   renderScreenDifficultySelection() {
      this.container.classList.remove("app_render-screen");

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

      div.addEventListener("click", (event) => {
         event.preventDefault();

         const target = event.target;
         const textContent = target.textContent;

         const levelDifficulty = arrLevelDifficulty[textContent - 1];

         this.levelDifficulty = levelDifficulty;
         localStorage.setItem("levelDifficulty", levelDifficulty);
         this.renderScreenOpenCards();
         // Временное название. Потом поменять на renderScreenCardGame

         if (!levelDifficulty) {
            console.log("Упс, что-то пошло не так");
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

   // renderScreenCardGame() {
   //    this.container.classList.add("app_render-screen");

   //    this.container.replaceChildren();

   //    const section = document.createElement("section");
   //    section.classList.add("render-screen-card-game");

   //    const divTopBlock = document.createElement("div");
   //    divTopBlock.classList.add("top-block");

   //    const divBlockTime = document.createElement("div");
   //    divBlockTime.classList.add("block-time");

   //    const divMinSek = document.createElement("div");
   //    divMinSek.classList.add("min-sek");

   //    const pMin = document.createElement("p");
   //    pMin.classList.add("text-min-sek");
   //    pMin.textContent = "min";

   //    const pSek = document.createElement("p");
   //    pSek.classList.add("text-min-sek");
   //    pSek.textContent = "sek";

   //    const divTimer = document.createElement("div");
   //    divTimer.classList.add("timer");
   //    divTimer.textContent = "00.00";

   //    const button = document.createElement("button");
   //    button.classList.add("btn", "btn_restart");
   //    // button.textContent = "Начать заново";
   //    // снизу временный текст
   //    button.textContent = "Открыть карты";

   //    const divCardTable = document.createElement("div");
   //    divCardTable.classList.add("card-table");

   //    for (let i = 0; i < 36; i++) {
   //       const imgCardShirt = document.createElement("img");
   //       imgCardShirt.classList.add("card-shirt");
   //       imgCardShirt.src = "./static/shirt.png";
   //       divCardTable.appendChild(imgCardShirt);
   //    }

   //    button.addEventListener("click", (event) => {
   //       event.preventDefault();
   //       if (confirm("Вы действительно хотите вернуться в выбор сложности?")) {
   //          localStorage.removeItem("levelDifficulty");
   //          this.levelDifficulty = "";
   //          // this.renderScreenDifficultySelection();
   //          // снизу временно выполняется другая функция
   //          this.renderScreenOpenCards();
   //       }
   //    });

   //    section.appendChild(divTopBlock);
   //    divTopBlock.appendChild(divBlockTime);
   //    divBlockTime.appendChild(divMinSek);
   //    divMinSek.appendChild(pMin);
   //    divMinSek.appendChild(pSek);
   //    divBlockTime.appendChild(divTimer);
   //    divTopBlock.appendChild(button);
   //    section.appendChild(divCardTable);

   //    this.container.appendChild(section);
   // }

   renderScreenOpenCards() {
      // Временное название. Потом поменять на renderScreenCardGame
      this.container.classList.add("app_render-screen");

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

      let indexLevelDif = 0;

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

      getRandomIndex(1, 36);

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

      hiddenCards.forEach((hiddenCard) => {
         hiddenCard.classList.add("card-shirt-down-hidden");
      });

      cardsShirtUp.forEach((cardShirtUp) => {
         cardShirtUp.classList.remove("card-shirt-up-hidden");
      });

      let firstChoice = 37;
      let secondChoice = 37;

      cardsShirtUp.forEach((cardShirtUp) => {
         cardShirtUp.addEventListener("click", function (event) {
            const target = event.target;
            target.classList.add("card-shirt-up-hidden");

            let indexTarget = target.dataset.indexNumber;
            const img = document.querySelector(`.img${indexTarget}`);
            img.classList.remove("card-shirt-down-hidden");

            if (firstChoice === 37) {
               firstChoice = arrGetRandomIndex[indexTarget];
               console.log("firstChoice", firstChoice);
            } else {
               secondChoice = arrGetRandomIndex[indexTarget];
               console.log("secondChoice", secondChoice);
            }

            if (firstChoice < 37 && secondChoice < 37) {
               if (firstChoice === secondChoice) {
                  alert("Вы победили!");
               } else {
                  alert("Вы проиграли!");
               }
               firstChoice = 37;
               secondChoice = 37;
            }
         });
      });
   }
}
