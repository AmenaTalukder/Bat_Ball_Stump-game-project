let scoreStr = localStorage.getItem("Score");
let score;
resetScore(scoreStr);

// Function to reset score
function resetScore(scoreStr) {
  score = scoreStr
    ? JSON.parse(scoreStr)
    : {
        win: 0,
        lost: 0,
        tie: 0,
      };

  // Function to display score
  score.displayScore = function () {
    return `Won: ${score.win} | Lost: ${score.lost} | Tie: ${score.tie}`;
  };

  showResult();
}

function generateComputerChoice() {
  // Generate a random number between 0 and 3
  let randomNumber = Math.random() * 3;
  if (randomNumber <= 1) {
    return "Bat";
  } else if (randomNumber <= 2) {
    return "Ball";
  } else {
    return "Stump";
  }
}

// Function to get the result
function getResult(userMove, computerMove) {
  let winSound = document.getElementById("win-sound");

  if (userMove === "Bat") {
    if (computerMove === "Ball") {
      score.win++;
      winSound.play();
      return "User won";
    } else if (computerMove === "Bat") {
      score.tie++;

      return `It's a tie`;
    } else if (computerMove === "Stump") {
      score.lost++;
      return "Computer has won";
    }
  } else if (userMove === "Ball") {
    if (computerMove === "Ball") {
      score.tie++;

      return `It's a tie`;
    } else if (computerMove === "Bat") {
      score.lost++;
      return "Computer has won";
    } else if (computerMove === "Stump") {
      score.win++;
      winSound.play();
      return "User won";
    }
  } else {
    if (computerMove === "Ball") {
      score.lost++;
      return "Computer has won";
    } else if (computerMove === "Bat") {
      score.win++;
      winSound.play();
      return "User won";
    } else if (computerMove === "Stump") {
      score.tie++;

      return `It's a tie`;
    }
  }
}

function showResult(userMove, computerMove, result) {
  localStorage.setItem("Score", JSON.stringify(score));

  document.querySelector("#user-move").innerText = userMove
    ? `You have chosen ${userMove}`
    : "";
  document.querySelector("#computer-move").innerText = computerMove
    ? `Computer choice is ${computerMove}`
    : "";

  const resultElement = document.querySelector("#result");
  resultElement.innerText = result || "";

  if (result && result.includes("User won")) {
    resultElement.style.color = "rgb(223, 31, 31)";
    resultElement.style.fontSize = "32px";
  } else {
    resultElement.style.color = "black";
  }

  // Display the score
  document.querySelector("#score").innerText = score.displayScore();
}
