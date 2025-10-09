import "./style.css";

let counter: number = 0;

document.body.innerHTML = `
  <div>Bisons: <span id="counter">0</span></div>
  <button id="increment">🦬</button>
`;

const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;

function increaseCounter() {
  counter += 1;
  counterElement.textContent = counter.toString();
}

button.addEventListener("click", () => {
  increaseCounter();
});

setInterval(increaseCounter, 1000);
