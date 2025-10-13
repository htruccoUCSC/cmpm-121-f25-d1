import "./style.css";

let counter: number = 0;

document.body.innerHTML = `
  <div>Bisons: <span id="counter">0</span></div>
  <div>Bison Growth Rate: <span id="growthRate">0</span> bisons/sec</div>
  <button id="increment">🦬</button>
  <div><button id="buyAutoClicker" disabled>Purchase Auto Clicker</button> Cost: <span id="autoClickerCost">10</span> Owned: <span id="autoClickerOwned">0</span></div>
  <div><button id="buyBisonGrandma" disabled>Purchase Bison Grandma</button> Cost: <span id="grandmaCost">100</span> Owned: <span id="grandmaOwned">0</span></div>
  <div><button id="buyBisonFarm" disabled>Purchase Bison Farm</button> Cost: <span id="farmCost">1000</span> Owned: <span id="farmOwned">0</span></div>
`;

const button = document.getElementById("increment")! as HTMLButtonElement;
const counterElement = document.getElementById("counter")!;
const growthRateElement = document.getElementById("growthRate")!;
const buyAutoClickerButton = document.getElementById(
  "buyAutoClicker",
)! as HTMLButtonElement;
const buyBisonGrandmaButton = document.getElementById(
  "buyBisonGrandma",
)! as HTMLButtonElement;
const buyBisonFarmButton = document.getElementById(
  "buyBisonFarm",
)! as HTMLButtonElement;
const autoClickerOwnedElement = document.getElementById("autoClickerOwned")!;
const grandmaOwnedElement = document.getElementById("grandmaOwned")!;
const farmOwnedElement = document.getElementById("farmOwned")!;
const autoClickerCostElement = document.getElementById("autoClickerCost")!;
const grandmaCostElement = document.getElementById("grandmaCost")!;
const farmCostElement = document.getElementById("farmCost")!;

function increaseCounter(value: number) {
  counter += value;
  counterElement.textContent = counter.toFixed(2);
}

let growthRate: number = 0;

let autoClickerOwned: number = 0;
let grandmaOwned: number = 0;
let farmOwned: number = 0;
let autoClickerCost: number = 10;
let grandmaCost: number = 100;
let farmCost: number = 1000;

function increaseGrowthRate(value: number) {
  growthRate += value;
  growthRateElement.textContent = growthRate.toFixed(1);
}

function updateCostAndOwned(
  type: "autoClicker" | "grandma" | "farm",
  owned: number,
) {
  if (type === "autoClicker") {
    autoClickerOwnedElement.textContent = owned.toString();
    autoClickerCost = autoClickerCost * 1.15;
    autoClickerCostElement.textContent = autoClickerCost.toFixed(2);
  } else if (type === "grandma") {
    grandmaOwnedElement.textContent = owned.toString();
    grandmaCost = grandmaCost * 1.15;
    grandmaCostElement.textContent = grandmaCost.toFixed(2);
  } else if (type === "farm") {
    farmOwnedElement.textContent = owned.toString();
    farmCost = farmCost * 1.15;
    farmCostElement.textContent = farmCost.toFixed(2);
  }
}

button.addEventListener("click", () => {
  increaseCounter(1);
});

buyAutoClickerButton.addEventListener("click", () => {
  increaseGrowthRate(0.1);
  increaseCounter(-10);
  updateCostAndOwned("autoClicker", ++autoClickerOwned);
});

buyBisonGrandmaButton.addEventListener("click", () => {
  increaseGrowthRate(2);
  increaseCounter(-100);
  updateCostAndOwned("grandma", ++grandmaOwned);
});

buyBisonFarmButton.addEventListener("click", () => {
  increaseGrowthRate(50);
  increaseCounter(-1000);
  updateCostAndOwned("farm", ++farmOwned);
});

let prev = performance.now();
requestAnimationFrame(counterCheck);

function counterCheck(timestamp: number) {
  increaseCounter(growthRate ? (timestamp - prev) / (1000 / growthRate) : 0);
  prev = performance.now();
  if (counter >= autoClickerCost) {
    buyAutoClickerButton.disabled = false;
  } else {
    buyAutoClickerButton.disabled = true;
  }
  if (counter >= grandmaCost) {
    buyBisonGrandmaButton.disabled = false;
  } else {
    buyBisonGrandmaButton.disabled = true;
  }
  if (counter >= farmCost) {
    buyBisonFarmButton.disabled = false;
  } else {
    buyBisonFarmButton.disabled = true;
  }
  requestAnimationFrame(counterCheck);
}
