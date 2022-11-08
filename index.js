const slider = document.querySelector('.slider');
const sliderstep = (document.querySelector('.slider').step = '16');
const output = document.querySelector('.slider-value');

slider.oninput = () => {
  output.innerHTML = `${slider.value} x ${slider.value} `;
  createGrid(slider.value);
};

const sliderValue = slider.value;

function createGrid(sliderValue) {
  const drawingArea = document.getElementById('etch-a-sketch');
  // Remove all nodes before adding more. (Should probably have condition)
  while (drawingArea.firstChild) {
    drawingArea.removeChild(drawingArea.firstChild);
  }

  const fragment = document.createDocumentFragment();
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

function clearCanvas() {
  const block = document.querySelectorAll('.pixel');

  block.forEach(function (pixel) {
    pixel.style.backgroundColor = 'white';
  });
}

window.onload = () => {
  output.innerHTML = `${slider.value} x ${slider.value} `;
  createGrid(slider.value);
};
