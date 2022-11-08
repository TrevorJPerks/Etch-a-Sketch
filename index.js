const slider = document.querySelector('.slider');
const sliderstep = (document.querySelector('.slider').step = '16');
const output = document.querySelector('.slider-value');

slider.oninput = () => {
  output.innerHTML = `${slider.value} x ${slider.value} `;
  createGrid(slider.value);
};

let userColorSelection = 'black';

// color picker
const radio = document.querySelectorAll('.radio');

radio.forEach(function (radioButton) {
  radioButton.addEventListener('click', function () {
    if (radioButton.classList.contains('black')) {
      userColorSelection = 'black';
    }
    if (radioButton.classList.contains('eraser')) {
      userColorSelection = 'white';
    }
    if (radioButton.classList.contains('rainbow')) {
      userColorSelection = 'rainbow';
    }
  });
});

function createGrid(sliderValue) {
  const drawingArea = document.getElementById('etch-a-sketch');
  sliderValue = slider.value;

  // Remove all nodes before adding more.
  while (drawingArea.firstChild) {
    drawingArea.removeChild(drawingArea.firstChild);
  }
  // Quick maths
  const numberOfDivs = sliderValue ** 2;
  const divSize = 600 / sliderValue;

  const fragment = document.createDocumentFragment();
  for (i = 0; i < numberOfDivs; i++) {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    pixel.style.height = `${divSize}px`;
    pixel.style.width = `${divSize}px`;

    pixel.addEventListener('mouseover', function () {
      changeColor(this);
    });
    fragment.appendChild(pixel);
  }
  drawingArea.appendChild(fragment);
}

// Update Div with user selected Color
function changeColor(triggeredDiv) {
  const rgb1 = Math.floor(Math.random() * 256);
  const rgb2 = Math.floor(Math.random() * 256);
  const rgb3 = Math.floor(Math.random() * 256);

  switch (userColorSelection) {
    case 'black':
      triggeredDiv.style.backgroundColor = 'black';
      break;
    case 'rainbow':
      triggeredDiv.style.backgroundColor = `rgb(${rgb1},${rgb2},${rgb3})`;
      break;
    case 'white':
      triggeredDiv.style.backgroundColor = 'white';
  }
}

const eraseButton = document.querySelector('.erase-button');
// Erase all
eraseButton.addEventListener('click', function () {
  const squares = document.querySelectorAll('.pixel');

  squares.forEach(function (div) {
    div.style.backgroundColor = 'white';
  });
});

// Initial Setup
window.onload = () => {
  output.innerHTML = `${slider.value} x ${slider.value} `;
  createGrid(slider.value);
};
