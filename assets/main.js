let diffEls = document.querySelector(".diff__btn");
let diffEl = document.querySelector(".diff__btn.active").innerHTML; // Get value of button
let colorsEl = document.querySelector(".colors"); // Get the colors parent element
let colorsBlocks; // Set variable for individual color blocks
let rgbEl = document.querySelector(".rgb"); // Get the rgb element - generated rgb color is displayed here
let statusEl = document.querySelector(".status"); // Get the status element - display the game status here
let colors = []; // Generated colors will be stored in a colors array

createBlocks(diffEl); // function call to create color blocks
resetGame(); // Reset the game

/**
 * Add event listener for setting number of color blocks displayed
 */

addGlobalEventListener("click", ".diff__btn", (e) => {
  [...e.target.parentElement.children].forEach(sib => sib.classList.remove("active"))
  e.target.classList.add("active");

  setNumberOfTiles(e.target.innerHTML);
});

/**
 * Add event listener for selected color
 */

addGlobalEventListener("click", ".colors__block", (e) => {
  checkColors(e);
});

/**
 * Generate a global event listener for every clicked action
 * @param {*} type
 * @param {*} selector
 * @param {*} callback
 */

function addGlobalEventListener(type, selector, callback) {
  document.addEventListener(type, (e) => {
    if (e.target.matches(selector)) callback(e);
  });
}

/**
 * Function to check colors selected?
 * An event will trigger this action to be fired
 *
 * Choose a tile matching the RGB color - if you choose the right tile you win
 * If the player wins:
 * - All the tiles change their color to the RGB.
 * - A text is displayed saying they have won and a new game will start.
 * - A new game starts after a second with a different RGB and tiles.
 *
 * If the player clicks on the wrong tile:
 * - The tile disappears and they get a chance to click on the remaining tiles.
 * @param {e}
 */

function checkColors(e) {
  if (rgbEl.innerText.toLowerCase() == e.target.style.backgroundColor) {
    statusEl.innerHTML = "You Win!";

    // cycle through the colorsBlocks and assign each a backgroundColor of selected color
    for (let i = 0; i < colorsBlocks.length; i++) {
      colorsBlocks[i].style.backgroundColor = e.target.style.backgroundColor;
    }

    setTimeout(() => {
      resetGame();
    }, 5000);

    console.log("You win!");
  } else {
    e.target.style.display = "none";
  }
}

function resetGame() {
  createBlocks(diffEl); // crete new color blocks based on number of tiles selected by player
  document.body.style.color = "black"; // reset do cument style color to black
  colors = []; // reset color array to empty
  pickColors(); // Invoke pickColors function
  pickedColor = random(diffEl);
  rgbEl.innerHTML = colors[pickedColor];
  setColors();
  statusEl.innerHTML = "Try to guess the right color based on the RGB value by clicking on the blocks.";
}

function setColors() {
  for (let i = 0; i < colorsBlocks.length; i++) {
    colorsBlocks[i].style.backgroundColor = colors[i];
  }
}

function pickColors() {
  for (let i = 0; i < diffEl; i++) {
    colors.push(randomColor());
  }
}

/**
 * Generate random rgb color
 * @returns
 */

function randomColor() {
  return "rgb(" + random(255) + ", " + random(255) + ", " + random(255) + ")";
}

/**
 * Generates random number with limited characters
 * @param {*} r
 * @returns
 */

function random(r) {
  return Math.floor(Math.random() * r);
}

/**
 * Function sets the number of tiles to that which is selected
 * Generates new colors
 * Sets the backgroundColor for each new block
 * @param {e}
 */

function setNumberOfTiles(e) {
  createBlocks(e);
  pickColors();
  setColors();
}

/**
 * Function to create blocks of color depending on your choice i.e. 6 or 9
 * @param {num}
 */

function createBlocks(num) {
  colorsEl.innerHTML = "";

  for (let i = 0; i < num; i++) {
    let block = document.createElement("div");
    block.classList.add("colors__block");
    colorsEl.appendChild(block);
  }

  colorsBlocks = document.querySelectorAll(".colors__block");

  for (let i = 0; i < colorsBlocks.length; i++) {
    colorsBlocks[i].addEventListener("click", checkColors);
  }
}