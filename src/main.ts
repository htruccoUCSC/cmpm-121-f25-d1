import "./style.css";

let counter: number = 0;

document.body.innerHTML = `
  <div>Bisons: <span id="counter">0</span></div>
  <button id="increment">🦬</button>
`;

const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;

function increaseCounter(value: number) {
  counter += value;
  counterElement.textContent = counter.toFixed(2);
}

button.addEventListener("click", () => {
  increaseCounter(1);
});

const growthRate = 1000;

let prev = performance.now();
requestAnimationFrame(counterCheck);

function counterCheck(timestamp: number) {
  increaseCounter((timestamp - prev) / growthRate);
  prev = performance.now();
  requestAnimationFrame(counterCheck);
}
