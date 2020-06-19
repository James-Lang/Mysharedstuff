// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// This flappy bird implementation is adapted from:
// https://youtu.be/cXgA1d_E-jY&


// This file includes functions for creating a new generation
// of pieces.

// Start the game over
// function resetGame() {
//   counter = 0;
//   // anticounter = 40;
//   // Resetting best bird score to 0
//   if (bestPiece) {
//     bestPiece.score = 0;
//   }
//   obstacles = [];
// }

// Create the next generation
function nextGeneration() {
  //resetGame();
  // Normalize the fitness values 0-1
  normalizeFitness(allPieces);
  // Generate a new set of pieces
  activePieces = generate(allPieces);
  // Copy those pieces to another array
  allPieces = activePieces.slice();
}

// Generate a new population of pieces
function generate(oldPieces) {
  let newPieces = [];
  for (let i = 0; i < oldPieces.length; i++) {
    // Select a bird based on fitness
    let piece = poolSelection(oldPieces);
    newPieces[i] = piece;
  }
  return newPieces;
}

// Normalize the fitness of all pieces
function normalizeFitness(pieces) {
  // Make score exponentially better?
  for (let i = 0; i < pieces.length; i++) {
    pieces[i].score = pow(pieces[i].score, 2);
  }

  // Add up all the scores
  let sum = 0;
  for (let i = 0; i < pieces.length; i++) {
    sum += pieces[i].score;
  }
  // Divide by the sum
  for (let i = 0; i < pieces.length; i++) {
    pieces[i].fitness = pieces[i].score / sum;
  }
}


// An algorithm for picking one bird from an array
// based on fitness
function poolSelection(pieces) {
  // Start at 0
  let index = 0;

  // Pick a random number between 0 and 1
  let r = random(1);

  // Keep subtracting probabilities until you get less than zero
  // Higher probabilities will be more likely to be fixed since they will
  // subtract a larger number towards zero
  while (r > 0) {
    r -= pieces[index].fitness;
    // And move on to the next
    index += 1;
  }

  // Go back one
  index -= 1;

  // Make sure it's a copy!
  // (this includes mutation)
  return pieces[index].copy();
}
