const slider = document.querySelector('.slider');
const sliderstep = (document.querySelector('.slider').step = '16');
const output = document.querySelector('.slider-value');

function createGrid(sliderValue) {
  const drawingArea = document.getElementById('etch-a-sketch');
  sliderValue = slider.value;
  // Remove all nodes before adding more. (Should probably have condition)
  while (drawingArea.firstChild) {
    drawingArea.removeChild(drawingArea.firstChild);
  }

  const fragment = document.createDocumentFragment();
  // Quick maths
  const numberOfDivs = sliderValue ** 2;
  const divSize = 600 / sliderValue;

  for (i = 0; i < numberOfDivs; i++) {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    pixel.style.height = `${divSize}px`;
    pixel.style.width = `${divSize}px`;

    fragment.appendChild(pixel);
  }
  drawingArea.appendChild(fragment);
}

// Color of paintEmptySquares
let userColorSelection = 'black';

function paintEmptySquares(userColorSelection) {
  const squares = document.querySelectorAll('.pixel');

  const rainbow = [
    '#E40303',
    '#FF8C00',
    '#FFED00',
    '#008026',
    '#24408E',
    '#732982',
  ];

  squares.forEach(function (div) {
    div.addEventListener('mouseover', function () {
      if (div.classList.contains('isFilled')) {
        return;
      }
      if (userColorSelection === 'rainbow') {
        div.style.backgroundColor =
          rainbow[Math.floor(Math.random() * rainbow.length)];
        div.classList.add('isFilled');
      } else {
        div.style.backgroundColor = `${userColorSelection}`;
        div.classList.add('isFilled');
      }
    });
  });
}

const eraseButton = document.querySelector('.erase-button');
// Erase all
eraseButton.addEventListener('click', function () {
  const squares = document.querySelectorAll('.pixel');

  squares.forEach(function (div) {
    if (div.classList.contains('isFilled')) {
      div.style.backgroundColor = 'white';
      div.classList.remove('isFilled');
    }
  });
});

slider.oninput = () => {
  output.innerHTML = `${slider.value} x ${slider.value} `;
  createGrid(slider.value);
  paintEmptySquares(userColorSelection);
};

window.onload = () => {
  output.innerHTML = `${slider.value} x ${slider.value} `;
  createGrid(slider.value);
  paintEmptySquares(userColorSelection);
};
