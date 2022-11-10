let isGridShown = false;

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

// Color Selection
let userColorSelection = 'black';
const inputColor = document.querySelector('.custom');
const radio = document.querySelectorAll('.radio');

inputColor.oninput = (e) => {
  userColorSelection = e.target.value;
};

inputColor.onclick = (e) => {
  radio.forEach((button) => {
    button.checked = false;
    userColorSelection = e.target.value;
  });
};

radio.forEach((radioButton) => {
  radioButton.addEventListener('click', () => {
    if (radioButton.classList.contains('eraser')) {
      userColorSelection = 'white';
    }
    if (radioButton.classList.contains('rainbow')) {
      userColorSelection = 'rainbow';
    }
  });
});

function changeColor() {
  switch (userColorSelection) {
    case 'rainbow':
      this.style.backgroundColor = `hsl(${Math.floor(
        Math.random() * 360
      )}, 100%, 50%)`;
      break;
    case 'white':
      this.style.backgroundColor = 'white';
      break;
  }
  triggeredDiv.style.backgroundColor = userColorSelection;
}

// SHOW / HIDE GRID LINES
document.querySelector('.grid-button').addEventListener('click', toggleGrid);

function toggleGrid() {
  const squares = document.querySelectorAll('.pixel');
  if (isGridShown) {
    squares.forEach(function (div) {
      div.classList.remove('show-grid');
    });
    isGridShown = false;
    gridButton.textContent = 'Show Grid';
  } else {
    squares.forEach(function (div) {
      div.classList.add('show-grid');
    });
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
