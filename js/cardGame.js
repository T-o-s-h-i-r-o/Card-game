const arrLevelDifficulty = ["Легкий", "Средний", "Сложный"];

class CardGame {
   constructor(container) {
      this.container = container;
      this.levelDifficulty = localStorage.getItem("levelDifficulty");

      if (this.levelDifficulty) {
         console.log("Вывод игры");
         this.renderScreenCardGame();
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
         console.log(levelDifficulty);

         this.levelDifficulty = levelDifficulty;
         localStorage.setItem("levelDifficulty", levelDifficulty);
         this.renderScreenCardGame();

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

   renderScreenCardGame() {
      console.log(this.levelDifficulty);

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
      // button.textContent = "Начать заново";
      // снизу временный текст
      button.textContent = "Открыть карты";

      const divCardTable = document.createElement("div");
      divCardTable.classList.add("card-table");

      for (let i = 0; i < 36; i++) {
         const imgCardShirt = document.createElement("img");
         imgCardShirt.classList.add("card-shirt");
         imgCardShirt.src = "./images/shirt.png";
         divCardTable.appendChild(imgCardShirt);
      }

      button.addEventListener("click", (event) => {
         event.preventDefault();
         if (confirm("Вы действительно хотите вернуться в выбор сложности?")) {
            localStorage.removeItem("levelDifficulty");
            this.levelDifficulty = "";
            // this.renderScreenDifficultySelection();
            // снизу временно выполняется другая функция
            this.renderScreenOpenCards();
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
   }

   renderScreenOpenCards() {
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

      for (let i = 0; i < 36; i++) {
         const imgCardShirt = document.createElement("img");
         imgCardShirt.classList.add("card-shirt");
         imgCardShirt.src = `./images/cards/card${[i + 1]}.png`;
         divCardTable.appendChild(imgCardShirt);
      }

      button.addEventListener("click", (event) => {
         event.preventDefault();
         if (confirm("Вы действительно хотите вернуться в выбор сложности?")) {
            localStorage.removeItem("levelDifficulty");
            this.levelDifficulty = "";
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
   }
}
