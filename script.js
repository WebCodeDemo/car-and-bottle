// Game variables
let bankAccount = 30;
let health = 100;
let repairCosts = 500;
let carFuel = 100;
let waterBottle = 100;

// DOM elements
const bankAccountEl = document.getElementById('bank-account');
const healthFillEl = document.getElementById('health-fill');
const healthValueEl = document.getElementById('health-value');
const fuelFillEl = document.getElementById('fuel-fill');
const fuelValueEl = document.getElementById('fuel-value');
const repairFillEl = document.getElementById('repair-fill');
const repairValueEl = document.getElementById('repair-value');
const waterLevelEl = document.getElementById('water-level');
const waterValueEl = document.getElementById('water-value');
const gameOverEl = document.getElementById('game-over');
const gameOverReasonEl = document.getElementById('game-over-reason');

// Button elements
const workBtn = document.getElementById('work-btn');
const refillCarBtn = document.getElementById('refill-car-btn');
const refillBottleBtn = document.getElementById('refill-bottle-btn');
const drinkWaterBtn = document.getElementById('drink-water-btn');
const repairCarBtn = document.getElementById('repair-car-btn');
const restartBtn = document.getElementById('restart-btn');

// Game loop
function gameLoop() {
    // Decrease resources over time (slightly slower rates)
    carFuel -= 1.5;
    waterBottle -= 1;
    health -= 0.75;
    repairCosts += 2.5;

    // Ensure values stay within bounds
    carFuel = Math.max(0, Math.min(100, carFuel));
    waterBottle = Math.max(0, Math.min(100, waterBottle));
    health = Math.max(0, Math.min(100, health));
    repairCosts = Math.max(0, Math.min(1000, repairCosts));

    // Check for game over conditions
    if (carFuel <= 0 || waterBottle <= 0 || health <= 0 || repairCosts >= 1000) {
        gameOver();
    }

    // Update UI
    updateUI();

    // Continue the game loop (slightly slower update rate)
    setTimeout(gameLoop, 250);
}

// Update UI function
function updateUI() {
    bankAccountEl.textContent = bankAccount.toFixed(2);
    
    healthFillEl.style.width = `${health}%`;
    healthValueEl.textContent = `${health.toFixed(1)}%`;
    
    fuelFillEl.style.width = `${carFuel}%`;
    fuelValueEl.textContent = `${carFuel.toFixed(1)}%`;
    
    repairFillEl.style.width = `${repairCosts / 10}%`;
    repairValueEl.textContent = `$${repairCosts.toFixed(2)}`;
    
    waterLevelEl.style.height = `${waterBottle}%`;
    waterValueEl.textContent = `${waterBottle.toFixed(1)}%`;
}

// Game over function
function gameOver() {
    let reason = '';
    if (carFuel <= 0) reason = 'Your car ran out of fuel!';
    else if (waterBottle <= 0) reason = 'Your water bottle is empty!';
    else if (health <= 0) reason = 'Your health reached zero!';
    else if (repairCosts >= 1000) reason = 'Repair costs exceeded $1,000!';

    gameOverReasonEl.textContent = reason;
    gameOverEl.style.display = 'block';
}

// Button click handlers
workBtn.addEventListener('click', () => {
    bankAccount += 15;
    health -= 5;
});

refillCarBtn.addEventListener('click', () => {
    if (bankAccount >= 50) {
        bankAccount -= 50;
        carFuel = 100;
    }
});

refillBottleBtn.addEventListener('click', () => {
    if (bankAccount >= 20) {
        bankAccount -= 20;
        waterBottle = 100;
    }
});

drinkWaterBtn.addEventListener('click', () => {
    if (waterBottle >= 10) {
        waterBottle -= 10;
        health = 100; // Changed to heal all health
    }
});

repairCarBtn.addEventListener('click', () => {
    if (bankAccount >= 100) {
        bankAccount -= 100;
        repairCosts = Math.max(0, repairCosts - 100);
    }
});

restartBtn.addEventListener('click', () => {
    location.reload();
});

// Start the game
gameLoop();
