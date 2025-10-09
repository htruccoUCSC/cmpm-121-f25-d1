import "./style.css";

let counter: number = 0;

document.body.innerHTML = `
  <div>Bisons: <span id="counter">0</span></div>
  <button id="increment">🦬</button>
  <button id="buyAutoClicker" disabled>Purchase Auto Clicker</button>
`;

const button = document.getElementById("increment")! as HTMLButtonElement;
const counterElement = document.getElementById("counter")!;
const buyAutoClickerButton = document.getElementById(
  "buyAutoClicker",
)! as HTMLButtonElement;

function increaseCounter(value: number) {
  counter += value;
  counterElement.textContent = counter.toFixed(2);
}

button.addEventListener("click", () => {
  increaseCounter(1);
});

let growthRate = 0;

buyAutoClickerButton.addEventListener("click", () => {
  growthRate += 1;
  counter -= 10;
});

let prev = performance.now();
requestAnimationFrame(counterCheck);

function counterCheck(timestamp: number) {
  increaseCounter(growthRate ? (timestamp - prev) / (1000 / growthRate) : 0);
  prev = performance.now();
  if (counter >= 10) {
    buyAutoClickerButton.disabled = false;
  } else {
    buyAutoClickerButton.disabled = true;
  }
  requestAnimationFrame(counterCheck);
}
