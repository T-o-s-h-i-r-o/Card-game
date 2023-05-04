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
      this.container.classList.remove("app-render-screen");
      this.container.classList.add("app");

      this.container.replaceChildren();

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

      this.container.appendChild(section);
   }

   renderScreenCardGame() {
      console.log(this.levelDifficulty);

      this.container.classList.add("app-render-screen");
      this.container.classList.remove("app");

      this.container.replaceChildren();

      // const section = document.createElement("section");
      // section.classList.add("screen");

      // const h1 = document.createElement("h1");
      // h1.textContent = `${this.levelDifficulty}`;

      // // это временная функция для проверки работоспособности
      // const resetButton = document.createElement("button");
      // resetButton.textContent = "Вернуться к выбору сложности";
      // resetButton.classList.add("reset-btn");
      // resetButton.addEventListener("click", (event) => {
      //    event.preventDefault();
      //    if (confirm("Вы действительно хотите вернуться в выбор сложности?")) {
      //       localStorage.removeItem("levelDifficulty");
      //       this.levelDifficulty = "";
      //       this.renderScreenDifficultySelection();
      //    }
      // });

      // section.appendChild(resetButton);
      // // конец проверочной функции

      const section = document.createElement("section");
      section.classList.add("screen-screen-card-game");

      const divTopBlock = document.createElement("div");
      divTopBlock.classList.add("top-block");

      const divBlockTime = document.createElement("div");
      divBlockTime.classList.add("block-time");

      const divMinSek = document.createElement("div");
      divMinSek.classList.add("min-sek");
      divMinSek.textContent = "min sek";

      const divTimer = document.createElement("div");
      divTimer.classList.add("timer");
      divTimer.textContent = "00.00";

      const button = document.createElement("button");
      button.classList.add("btn-restart");
      button.textContent = "Начать заново";

      const divCardTable = document.createElement("div");
      divCardTable.classList.add("card-table");

      const imgCardShirt = document.createElement("img");
      imgCardShirt.classList.add("card-shirt");
      imgCardShirt.src = "./images/shirt.png";

      // section.appendChild(h1);
      section.appendChild(divTopBlock);
      divTopBlock.appendChild(divBlockTime);
      divBlockTime.appendChild(divMinSek);
      divBlockTime.appendChild(divTimer);
      divTopBlock.appendChild(button);
      section.appendChild(divCardTable);
      divCardTable.appendChild(imgCardShirt);

      this.container.appendChild(section);
   }
}
