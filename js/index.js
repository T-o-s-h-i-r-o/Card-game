const container = document.querySelector('.app');

renderDifficultySelectionBlock(container);

function renderDifficultySelectionBlock(container) {
    const h1 = document.createElement('h1');
    h1.textContent = 'Выбери сложность';
    h1.classList.add('main_title');

    const div = document.createElement('div');
    div.classList.add('main_difficulty-selection');

    const buttonOne = document.createElement('button');
    buttonOne.textContent = '1';
    buttonOne.classList.add('main_btn-dif-sel');

    const buttonTwo = document.createElement('button');
    buttonTwo.textContent = '2';
    buttonTwo.classList.add('main_btn-dif-sel');

    const buttonThree = document.createElement('button');
    buttonThree.textContent = '3';
    buttonThree.classList.add('main_btn-dif-sel');

    const buttonStart = document.createElement('button');
    buttonStart.textContent = 'Старт';
    buttonStart.classList.add('btn', 'main_btn-start');

    container.appendChild(h1);
    container.appendChild(div);
    div.appendChild(buttonOne);
    div.appendChild(buttonTwo);
    div.appendChild(buttonThree);
    container.appendChild(buttonStart);
}
