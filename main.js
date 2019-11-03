var playGameBtn = document.querySelector("#play-game-btn");
var playerOneInput = document.querySelector("#p1-input");
var pageOne = document.querySelector(".start");
var body = document.querySelector("body");

playerOneInput.addEventListener("keyup", allowStart);
playGameBtn.addEventListener("click", changeToPageTwo);

function allowStart(){
  playGameBtn.style.opacity = "1";
}

function changeToPageTwo(){
    pageOne.parentNode.removeChild(pageOne);
    pageTwo();
}

function pageTwo(){
body.innerHTML += `
<section class="page-two">
  <h2>WELCOME PLAYER 1 AND PLAYER 2!</h2>
  <p class="instructions">The goal of the game is to find all 5 pairs of cards as quickly as possible.
     The player that finds the greatest number of pairs, wins.</p>
  <p class="instructions">To begin playing, the player whose name is highlighted can click any card in
     the card pile. It will flip over and reveal a picture of Post Malone. Click
     another card. If they match, they will disappear and you will have completed
     a match! If they don't, you'll have three seconds to look at them before they
     flip back over. Then it's time for the other player to try!</p>
  <p class="instructions">After you play, you'll see the name of the final winner and how long it took
     to win the game.</p>
  <input id="play-game-btn-two" type="button" value="PLAY GAME"></input>
</section>
`;
var pageTwoBtn = document.querySelector("#play-game-btn-two");
var pageTwo = document.querySelector(".page-two");

pageTwoBtn.addEventListener("click", toGame);

function toGame() {

  pageTwo.parentNode.removeChild(pageTwo);
  }
}
