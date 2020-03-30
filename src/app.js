import { fillGrid, Test } from './js/helpers/index.js';
import { PaletteGenerator } from './js/PaletteGenerator.js';
import './scss/styles.scss';

const input = document.querySelector('.codes__textarea--input');
const output = document.querySelector('.codes__textarea--output');
const paletteView = document.querySelector('.palette__view');
const lightstep = document.querySelector('.options__range--lightstep');
const lightstepValue = document.querySelector('.options__range-value');
const form = document.querySelector('.options__form');
const colorFormat = document.querySelector('.options__radio')

let palette = new PaletteGenerator();
let test = new Test(setPalette);

setPalette();

// Run to test all possible colors values
// test.run();

// ---------------------------------------------

input.addEventListener('input', setPalette);
lightstep.addEventListener('input', setPalette);

for(const formatInput of form.elements['finalFormat']) {
  formatInput.addEventListener('input', setPalette);
}

// ---------------------------------------------

function setPalette() {
  const options = {};

  setLightStepValue();

  for (const [name, value] of new FormData(form)) {
    options[name] = value;
  }

  palette.setPalette({
    inputValue: input.value,
    ...options
  });
  const code = palette.getCode();

  output.value = code;

  fillGrid({
    data: palette.getData(),
    elem: paletteView
  });
}

// ---------------------------------------------

function setLightStepValue() {
  const {value, min, max, offsetWidth} = lightstep;
  lightstepValue.innerHTML = value;

  const realPos = value - min;
  const realMax = max - min;
  const elemWidth = offsetWidth - lightstepValue.offsetWidth / 2;

  const lightstepValuePos = realPos / realMax * elemWidth;

  lightstepValue.style.left = `${lightstepValuePos.toFixed(2)}px`;
}

window.addEventListener('resize', setLightStepValue);