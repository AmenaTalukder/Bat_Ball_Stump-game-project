let scoreStr = localStorage.getItem('Score');
    let score;
    resetScore(scoreStr);

    //score reset koarar function
    function resetScore(scoreStr) {
      score = scoreStr ? JSON.parse(scoreStr) : {
        win: 0,
        lost: 0,
        tie: 0,
      };

      //score display koarar function
      score.displayScore = function() {
        return `Won: ${score.win} | Lost: ${score.lost} | Tie: ${score.tie}`;
      };

      showResult();
    }

    function generateComputerChoice() {
      //This will generate random number between 0 and 3
      let randomNumber = Math.random() * 3;
      if (randomNumber<= 1) { 
        return 'Bat';
      } else if (randomNumber<= 2) {
        return 'Ball';
      } else {
        return 'Stump'
      }
    }

    // Right result pabar command
    function getResult(userMove, computerMove) {
      if (userMove === 'Bat') {
        if (computerMove === 'Ball') {
          score.win++;
          return 'User won.';
        } else if (computerMove === 'Bat') {
          score.tie++;
          return `It's a tie`;
        } else if (computerMove === 'Stump') {
          score.lost++;
          return 'Computer has won';
        }
      } else if (userMove === 'Ball') {
        if (computerMove === 'Ball') {
          score.tie++;
          return `It's a tie`;
        } else if (computerMove === 'Bat') {
          score.lost++;
          return 'Computer has won';
        } else if (computerMove === 'Stump') {
          score.win++;
          return 'User won.';
        }
      } else {
        if (computerMove === 'Ball') {
          score.lost++;
          return 'Computer has won';
        } else if (computerMove === 'Bat') {
          score.win++;
          return 'User won.';
        } else if (computerMove === 'Stump') {
          score.tie++;
          return `It's a tie`;
        }
      }
    }

    function showResult(userMove, computerMove, result) {

      // local drive a score store koarar command
      localStorage.setItem('Score', JSON.stringify(score));

      // h3 tag a result show koarar command
      document.querySelector('#user-move').innerText = 
        userMove ? `You have chosen ${userMove}` : '';

      document.querySelector('#computer-move').innerText =
        computerMove ? `Computer choice is ${computerMove}` : '';

      document.querySelector('#result').innerText = result || '';


      // Score display korar command
      document.querySelector('#score').innerText = score.displayScore();
    }