const slider = document.querySelector('.slider');
const sliderText = document.querySelector('.slider-value');

slider.onchange = () => {
  createGrid();
};
slider.oninput = () => {
  sliderText.innerHTML = `${slider.value} x ${slider.value} `;
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

function createGrid() {
  isGridShown = false;
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
  const rainbowColor = [
    '#e40303',
    '#ff8c00',
    '#ffed00',
    '#008026',
    '#24408e',
    '#732982',
  ];

  const rgb1 = Math.floor(Math.random() * 256);
  const rgb2 = Math.floor(Math.random() * 256);
  const rgb3 = Math.floor(Math.random() * 256);

  switch (userColorSelection) {
    case 'black':
      triggeredDiv.style.backgroundColor = 'black';
      break;
    case 'rainbow':
      triggeredDiv.style.backgroundColor =
        rainbowColor[Math.floor(Math.random() * rainbowColor.length)];
      break;
    case 'white':
      triggeredDiv.style.backgroundColor = 'white';
  }
}

const eraseButton = document.querySelector('.erase-button');

eraseButton.onclick = () => {
  const squares = document.querySelectorAll('.pixel');
  squares.forEach(function (div) {
    div.style.backgroundColor = 'white';
  });
};

const gridButton = document.querySelector('.grid-button');
let isGridShown = false;

gridButton.onclick = () => {
  const squares = document.querySelectorAll('.pixel');
  if (isGridShown) {
    squares.forEach(function (div) {
      div.classList.remove('show-grid');
    });
    isGridShown = false;
  } else {
    squares.forEach(function (div) {
      div.classList.add('show-grid');
    });
    isGridShown = true;
  }
};
// Initial Setup
window.onload = () => {
  sliderText.innerHTML = `${slider.value} x ${slider.value} `;
  createGrid();
};
