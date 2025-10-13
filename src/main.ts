import "./style.css";

let counter: number = 0;

interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "Farmer",
    cost: 10,
    rate: 0.1,
    description: "A hardworking bison farmer. (0.1 Bisons/sec)",
  },
  {
    name: "Grandma",
    cost: 100,
    rate: 2,
    description: "A wise old bison grandma. (2 Bisons/sec)",
  },
  {
    name: "Shaman",
    cost: 1000,
    rate: 50,
    description: "A mystical bison shaman. (50 Bisons/sec)",
  },
  {
    name: "Whisperer",
    cost: 5000,
    rate: 200,
    description:
      "A prodigious shaman who can communicate with bison. (200 Bisons/sec)",
  },
  {
    name: "Master",
    cost: 20000,
    rate: 1000,
    description:
      "A legendary figure who has mastered the art of bison growth. (1000 Bisons/sec)",
  },
];

const itemsHtml = availableItems.map((item) => {
  const idName = item.name.toLowerCase();
  return `
    <div>
      <button id="buy${item.name}" disabled>
        Purchase Bison ${item.name}
      </button>
      Cost: <span id="${idName}Cost">${item.cost}</span>
      Owned: <span id="${idName}Owned">0</span>
      <div>${item.description}</div>
    </div>
  `;
}).join("");

document.body.innerHTML = `
  <div>Bisons: <span id="counter">0</span></div>
  <div>Bison Growth Rate: <span id="growthRate">0</span> bisons/sec</div>
  <button id="increment">🦬</button>
  ${itemsHtml}
`;

const button = document.getElementById("increment")! as HTMLButtonElement;
const counterElement = document.getElementById("counter")!;
const growthRateElement = document.getElementById("growthRate")!;

interface itemParts {
  button: HTMLButtonElement;
  costElement: HTMLElement;
  ownedElement: HTMLElement;
  dynamicCost: number;
  owned: number;
}

const itemPartsList: itemParts[] = availableItems.map((item) => {
  const idName = item.name.toLowerCase();
  return {
    button: document.getElementById(`buy${item.name}`) as HTMLButtonElement,
    costElement: document.getElementById(`${idName}Cost`)!,
    ownedElement: document.getElementById(`${idName}Owned`)!,
    dynamicCost: item.cost,
    owned: 0,
  };
});

function increaseCounter(value: number) {
  counter += value;
  counterElement.textContent = counter.toFixed(2);
}

let growthRate: number = 0;

function increaseGrowthRate(value: number) {
  growthRate += value;
  growthRateElement.textContent = growthRate.toFixed(1);
}

function updateCostAndOwned(type: string, owned: number) {
  const idx = availableItems.findIndex((item) =>
    item.name.toLowerCase() === type.toLowerCase()
  );
  if (idx !== -1) {
    itemPartsList[idx].owned = owned;
    itemPartsList[idx].ownedElement.textContent = owned.toString();
    itemPartsList[idx].dynamicCost = itemPartsList[idx].dynamicCost * 1.15;
    itemPartsList[idx].costElement.textContent = itemPartsList[idx].dynamicCost
      .toFixed(2);
  }
}

button.addEventListener("click", () => {
  increaseCounter(1);
});

itemPartsList.forEach((part, idx) => {
  part.button.addEventListener("click", () => {
    const item = availableItems[idx];
    increaseGrowthRate(item.rate);
    increaseCounter(-part.dynamicCost);
    updateCostAndOwned(item.name, ++part.owned);
  });
});

let prev = performance.now();
requestAnimationFrame(counterCheck);

function counterCheck(timestamp: number) {
  increaseCounter(growthRate ? (timestamp - prev) / (1000 / growthRate) : 0);
  prev = performance.now();
  itemPartsList.forEach((part) => {
    part.button.disabled = counter < part.dynamicCost;
  });

  requestAnimationFrame(counterCheck);
}
