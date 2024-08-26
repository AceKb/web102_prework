// Import the JSON data about the crowd-funded games from the games.js file
import GAMES_DATA from './games.js';

// Use the imported data directly
const GAMES_JSON = GAMES_DATA;

// Remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// Grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// Create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // Clear the current content
    deleteChildElements(gamesContainer);

    // Loop over each item in the data
    for (let game of games) {
        // Create a new div element, which will become the game card
        let gameCard = document.createElement('div');
        gameCard.classList.add('game-card');

        // Set the inner HTML using a template literal to display some info about each game
        gameCard.innerHTML = `
            <img src="${game.img}" class="game-img" alt="${game.name}">
            <h2>${game.name}</h2>
            <p>${game.description}</p>
            <p>Pledged: $${game.pledged.toLocaleString()}</p>
            <p>Goal: $${game.goal.toLocaleString()}</p>
            <p>Backers: ${game.backers.toLocaleString()}</p>
        `;

        // Append the game to the games-container
        gamesContainer.appendChild(gameCard);
    }
}

// Call the function to add all games to the page
addGamesToPage(GAMES_JSON);

// Challenge 4: Create summary statistics at the top of the page
const contributionsCard = document.getElementById("num-contributions");
const totalBackers = GAMES_JSON.reduce((sum, game) => sum + game.backers, 0);
contributionsCard.innerHTML = `<p>${totalBackers.toLocaleString()}</p>`;

const raisedCard = document.getElementById("total-raised");
const totalPledged = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0);
raisedCard.innerHTML = `<p>$${totalPledged.toLocaleString()}</p>`;

const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `<p>${GAMES_JSON.length}</p>`;

// Challenge 5: Functions to filter the funded and unfunded games
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    addGamesToPage(unfundedGames);
}

function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    addGamesToPage(fundedGames);
}

function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
}

const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

// Challenge 6: Add information about the company
const descriptionContainer = document.getElementById("description-container");

// Calculate the number of unfunded games
const numUnfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// Create the description text using a ternary operator
const description = `Currently, there ${numUnfundedGames === 1 ? 'is' : 'are'} ${numUnfundedGames} unfunded game${numUnfundedGames === 1 ? '' : 's'}.`;

// Create a new paragraph element and add the description text
const descriptionElement = document.createElement('p');
descriptionElement.innerHTML = description;
descriptionContainer.appendChild(descriptionElement);

// Challenge 7: Select & display the top 2 games
const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

// Sort games by amount pledged in descending order
const sortedGames = [...GAMES_JSON].sort((a, b) => b.pledged - a.pledged);

// Destructure the top 2 games
const [topGame, runnerUp] = sortedGames;

// Display the top game
firstGameContainer.innerHTML = `<h2>${topGame.name}</h2><p>Pledged: $${topGame.pledged.toLocaleString()}</p>`;

// Display the runner-up game
secondGameContainer.innerHTML = `<h2>${runnerUp.name}</h2><p>Pledged: $${runnerUp.pledged.toLocaleString()}</p>`;
