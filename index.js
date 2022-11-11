let isGridShown = false;
let userColorSelection = 'black';

// Input Elements
const gridButton = document.querySelector('.grid-button');
const rangeSlider = document.querySelector('.slider');
const rangeSliderText = document.querySelector('.slider-value');

// Range Slider Functionality
rangeSlider.onchange = () => {
  createGrid(rangeSlider.value);
  isGridShown = false;
  gridButton.textContent = 'Show Grid';
};

rangeSlider.oninput = () => {
  rangeSliderText.innerHTML = `${rangeSlider.value} x ${rangeSlider.value}`;
};

// Grid Creation
function createGrid(sliderValue) {
  const drawingArea = document.getElementById('etch-a-sketch');
  const fragment = document.createDocumentFragment();
  // Quick maths
  const numberOfDivs = sliderValue ** 2;
  const divSize = 600 / sliderValue;
  // Remove all nodes before adding more.
  drawingArea.replaceChildren();

  for (i = 0; i < numberOfDivs; i++) {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    pixel.style.height = `${divSize}px`;
    pixel.style.width = `${divSize}px`;
    // EventListener
    pixel.addEventListener('mouseover', changeColor);
    // Append to fragment
    fragment.appendChild(pixel);
  }
  // Append fragment to DOM
  drawingArea.appendChild(fragment);
}

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

// Draw Function
function changeColor() {
  if (userColorSelection === 'rainbow') {
    this.style.backgroundColor = `hsl(${Math.floor(
      Math.random() * 360
    )}, 100%, 50%)`;
  } else {
    this.style.backgroundColor = userColorSelection;
  }
}

// Show / Hide Grid Lines
gridButton.addEventListener('click', toggleGrid);

function toggleGrid() {
  const squares = document.querySelectorAll('.pixel');
  if (isGridShown) {
    squares.forEach((div) => {
      div.classList.remove('show-grid');
    });
    // toggle
    isGridShown = false;
    gridButton.textContent = 'Show Grid';
  } else {
    squares.forEach((div) => {
      div.classList.add('show-grid');
    });
    // toggle
    isGridShown = true;
    gridButton.textContent = 'Hide Grid';
  }
}

// Clear Drawing Area
document.querySelector('.clearAll-button').addEventListener('click', clearAll);

function clearAll() {
  const squares = document.querySelectorAll('.pixel');
  squares.forEach((div) => {
    div.style.backgroundColor = 'hsl(0, 0%, 100%)'; // White
  });
}

// Initial Setup
window.onload = () => {
  rangeSliderText.innerHTML = `${rangeSlider.value} x ${rangeSlider.value} `;
  createGrid(rangeSlider.value);
};
