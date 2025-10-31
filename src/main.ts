import "./style.css";

// Define interfaces for items and their UI state
interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
}

interface ItemUIState {
  button: HTMLButtonElement;
  costElement: HTMLElement;
  ownedElement: HTMLElement;
  dynamicCost: number;
  owned: number;
}

// Define available items available for purchase by the player
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

// Generate HTML for items to be inserted into the document body
const itemsHtml = availableItems.map((item) => {
  const idName = item.name.toLowerCase();
  return `
      <div class="item-row">
        <button id="buy${item.name}" disabled>
          Purchase Bison ${item.name}
        </button>
        <div class="meta">
          <div class="meta-line">Cost: <span id="${idName}Cost">${item.cost}</span></div>
          <div class="meta-line">Owned: <span id="${idName}Owned">0</span></div>
        </div>
        <div class="desc">${item.description}</div>
      </div>
    `;
}).join("");

// Set up the HTML structure of the document body
document.body.innerHTML = `
  <div>Bisons: <span id="counter">0</span></div>
  <div>Bison Growth Rate: <span id="growthRate">0</span> bisons/sec</div>
  <button id="increment">🦬</button>
  ${itemsHtml}
`;

// Initialize game state variables and UI elements
let counter: number = 0;
let growthRate: number = 0;

const button = document.getElementById("increment")! as HTMLButtonElement;
const counterElement = document.getElementById("counter")!;
const growthRateElement = document.getElementById("growthRate")!;

// Create UI state for each item
const itemUIStates: ItemUIState[] = availableItems.map((item) => {
  const idName = item.name.toLowerCase();
  return {
    button: document.getElementById(`buy${item.name}`) as HTMLButtonElement,
    costElement: document.getElementById(`${idName}Cost`)!,
    ownedElement: document.getElementById(`${idName}Owned`)!,
    dynamicCost: item.cost,
    owned: 0,
  };
});

// Functions
// Functions to update counter by a fixed value
function increaseCounter(value: number) {
  counter += value;
  counterElement.textContent = counter.toFixed(2);
}

// Functions to update growth rate by a fixed value
function increaseGrowthRate(value: number) {
  growthRate += value;
  growthRateElement.textContent = growthRate.toFixed(1);
}

// Function to update item cost and owned count after purchase
function updateCostAndOwned(type: string, owned: number) {
  const index = availableItems.findIndex((item) =>
    item.name.toLowerCase() === type.toLowerCase()
  );
  if (index !== -1) {
    itemUIStates[index].owned = owned;
    itemUIStates[index].ownedElement.textContent = owned.toString();
    itemUIStates[index].dynamicCost = itemUIStates[index].dynamicCost * 1.15;
    itemUIStates[index].costElement.textContent = itemUIStates[index]
      .dynamicCost
      .toFixed(2);
  }
}

// Event Listeners
// Increment counter on button click
button.addEventListener("click", () => {
  increaseCounter(1);
});

// Purchase items on button click
itemUIStates.forEach((itemState, index) => {
  itemState.button.addEventListener("click", () => {
    const item = availableItems[index];
    increaseGrowthRate(item.rate);
    increaseCounter(-itemState.dynamicCost);
    updateCostAndOwned(item.name, ++itemState.owned);
  });
});

// Animation loop to update counter based on growth rate and manage button states
let prev = performance.now();
requestAnimationFrame(counterCheck);

function counterCheck(timestamp: number) {
  increaseCounter(growthRate ? (timestamp - prev) / (1000 / growthRate) : 0);
  prev = performance.now();
  itemUIStates.forEach((itemState) => {
    itemState.button.disabled = counter < itemState.dynamicCost;
  });

  requestAnimationFrame(counterCheck);
}
