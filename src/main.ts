import "./style.css";

let counter: number = 0;

document.body.innerHTML = `
  <div>Bisons: <span id="counter">0</span></div>
  <div>Bison Growth Rate: <span id="growthRate">0</span> bisons/sec</div>
  <button id="increment">🦬</button>
  <div><button id="buyFarmer" disabled>Purchase Bison Farmer</button> Cost: <span id="farmerCost">10</span> Owned: <span id="farmerOwned">0</span></div>
  <div><button id="buyBisonGrandma" disabled>Purchase Bison Grandma</button> Cost: <span id="grandmaCost">100</span> Owned: <span id="grandmaOwned">0</span></div>
  <div><button id="buyBisonShaman" disabled>Purchase Bison Shaman</button> Cost: <span id="shamanCost">1000</span> Owned: <span id="shamanOwned">0</span></div>
`;

const button = document.getElementById("increment")! as HTMLButtonElement;
const counterElement = document.getElementById("counter")!;
const growthRateElement = document.getElementById("growthRate")!;
const buyFarmerButton = document.getElementById(
  "buyFarmer",
)! as HTMLButtonElement;
const buyBisonGrandmaButton = document.getElementById(
  "buyBisonGrandma",
)! as HTMLButtonElement;
const buyBisonShamanButton = document.getElementById(
  "buyBisonShaman",
)! as HTMLButtonElement;
const farmerOwnedElement = document.getElementById("farmerOwned")!;
const grandmaOwnedElement = document.getElementById("grandmaOwned")!;
const shamanOwnedElement = document.getElementById("shamanOwned")!;
const farmerCostElement = document.getElementById("farmerCost")!;
const grandmaCostElement = document.getElementById("grandmaCost")!;
const shamanCostElement = document.getElementById("shamanCost")!;

function increaseCounter(value: number) {
  counter += value;
  counterElement.textContent = counter.toFixed(2);
}

let growthRate: number = 0;

let farmerOwned: number = 0;
let grandmaOwned: number = 0;
let shamanOwned: number = 0;
let farmerCost: number = 10;
let grandmaCost: number = 100;
let shamanCost: number = 1000;

function increaseGrowthRate(value: number) {
  growthRate += value;
  growthRateElement.textContent = growthRate.toFixed(1);
}

function updateCostAndOwned(
  type: "farmer" | "grandma" | "shaman",
  owned: number,
) {
  if (type === "farmer") {
    farmerOwnedElement.textContent = owned.toString();
    farmerCost = farmerCost * 1.15;
    farmerCostElement.textContent = farmerCost.toFixed(2);
  } else if (type === "grandma") {
    grandmaOwnedElement.textContent = owned.toString();
    grandmaCost = grandmaCost * 1.15;
    grandmaCostElement.textContent = grandmaCost.toFixed(2);
  } else if (type === "shaman") {
    shamanOwnedElement.textContent = owned.toString();
    shamanCost = shamanCost * 1.15;
    shamanCostElement.textContent = shamanCost.toFixed(2);
  }
}

button.addEventListener("click", () => {
  increaseCounter(1);
});

buyFarmerButton.addEventListener("click", () => {
  increaseGrowthRate(0.1);
  increaseCounter(-10);
  updateCostAndOwned("farmer", ++farmerOwned);
});

buyBisonGrandmaButton.addEventListener("click", () => {
  increaseGrowthRate(2);
  increaseCounter(-100);
  updateCostAndOwned("grandma", ++grandmaOwned);
});

buyBisonShamanButton.addEventListener("click", () => {
  increaseGrowthRate(50);
  increaseCounter(-1000);
  updateCostAndOwned("shaman", ++shamanOwned);
});

let prev = performance.now();
requestAnimationFrame(counterCheck);

function counterCheck(timestamp: number) {
  increaseCounter(growthRate ? (timestamp - prev) / (1000 / growthRate) : 0);
  prev = performance.now();
  if (counter >= farmerCost) {
    buyFarmerButton.disabled = false;
  } else {
    buyFarmerButton.disabled = true;
  }
  if (counter >= grandmaCost) {
    buyBisonGrandmaButton.disabled = false;
  } else {
    buyBisonGrandmaButton.disabled = true;
  }
  if (counter >= shamanCost) {
    buyBisonShamanButton.disabled = false;
  } else {
    buyBisonShamanButton.disabled = true;
  }
  requestAnimationFrame(counterCheck);
}
