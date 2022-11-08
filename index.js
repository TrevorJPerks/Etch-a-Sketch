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
    if (radioButton.classList.contains('white')) {
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

    pixel.addEventListener('mouseover', function () {
      changeColor(this);
    });
    fragment.appendChild(pixel);
  }
  drawingArea.appendChild(fragment);
}

function changeColor(item) {
  const rainbow = [
    '#E40303',
    '#FF8C00',
    '#FFED00',
    '#008026',
    '#24408E',
    '#732982',
  ];
  switch (userColorSelection) {
    case 'black':
      item.style.backgroundColor = 'black';
      break;
    case 'rainbow':
      item.style.backgroundColor =
        rainbow[Math.floor(Math.random() * rainbow.length)];
      break;
    case 'white':
      item.style.backgroundColor = 'white';
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
