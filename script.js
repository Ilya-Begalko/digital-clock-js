const sliders = Array.from(document.querySelectorAll('.slider-main-container .slider-container'));
const magnifierSliders = Array.from(document.querySelectorAll('.slider-magnifier-container .slider-container'));
const sizeProbe = document.querySelector('.slider-main-container');

function padNumberWithZero(i) {
  return String(i).padStart(2, '0');
}

function getDigitStep() {
  const sample = document.querySelector('.slider-main-container .nbr');
  return sample ? sample.getBoundingClientRect().height : 0;
}

function readTimeDigits() {
  const currentDate = new Date();
  const hr = padNumberWithZero(currentDate.getHours());
  const mn = padNumberWithZero(currentDate.getMinutes());
  const sc = padNumberWithZero(currentDate.getSeconds());

  return [...hr, ...mn, ...sc].map(Number);
}

function applyDigits(digits, animate) {
  const step = getDigitStep();
  if (!step || typeof gsap === 'undefined') return;

  sliders.forEach((slider, i) => {
    const target = { y: -step * digits[i], ease: 'Sine.easeInOut' };

    if (animate) {
      gsap.timeline()
        .to(slider, target)
        .to(magnifierSliders[i], target, 0);
    } else {
      gsap.set(slider, { y: target.y });
      gsap.set(magnifierSliders[i], { y: target.y });
    }
  });
}

let digits = readTimeDigits();

function tick() {
  digits = readTimeDigits();
  gsap.set('.main-container', { autoAlpha: 1 });
  applyDigits(digits, true);
}

setInterval(tick, 1000);

if (sizeProbe && 'ResizeObserver' in window) {
  const resizeObserver = new ResizeObserver(() => applyDigits(digits, false));
  resizeObserver.observe(sizeProbe);
}