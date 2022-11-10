let isGridShown = false;

const gridButton = document.querySelector('.grid-button');

const slider = document.querySelector('.slider');
const sliderText = document.querySelector('.slider-value');

slider.onchange = () => {
  createGrid();
  isGridShown = false;
  gridButton.textContent = 'Show Grid';
};

slider.oninput = () => {
  sliderText.innerHTML = `${slider.value} x ${slider.value} `;
};

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

    pixel.addEventListener('mouseover', changeColor);

    fragment.appendChild(pixel);
  }
  drawingArea.appendChild(fragment);
}

let userColorSelection = 'black';

// Radio Button Functionality
document.querySelectorAll('.radio').forEach((radioButton) => {
  radioButton.addEventListener('click', () => {
    if (radioButton.classList.contains('black')) {
      userColorSelection = 'hsl(0, 0%, 0%)';
    }
    if (radioButton.classList.contains('eraser')) {
      userColorSelection = 'hsl(0, 0%, 100%)';
    }
    if (radioButton.classList.contains('rainbow')) {
      userColorSelection = 'rainbow';
    }
  });
});

function changeColor() {
  if (userColorSelection === 'rainbow') {
    this.style.backgroundColor = `hsl(${Math.floor(
      Math.random() * 360
    )}, 100%, 50%)`;
  } else {
    this.style.backgroundColor = `${userColorSelection}`;
  }
}

// SHOW / HIDE GRID LINES
document.querySelector('.grid-button').addEventListener('click', toggleGrid);

function toggleGrid() {
  const squares = document.querySelectorAll('.pixel');
  if (isGridShown) {
    squares.forEach(function (div) {
      div.classList.remove('show-grid');
    });
    // toggle
    isGridShown = false;
    gridButton.textContent = 'Show Grid';
  } else {
    squares.forEach(function (div) {
      div.classList.add('show-grid');
    });
    // toggle
    isGridShown = true;
    gridButton.textContent = 'Hide Grid';
  }
}

// CLEAR DRAWING AREA
document.querySelector('.clearAll-button').addEventListener('click', clearAll);

function clearAll() {
  const squares = document.querySelectorAll('.pixel');
  squares.forEach(function (div) {
    div.style.backgroundColor = 'hsl(0, 0%, 100%)'; // White
  });
}

// Initial Setup
window.onload = () => {
  sliderText.innerHTML = `${slider.value} x ${slider.value} `;
  createGrid();
};
