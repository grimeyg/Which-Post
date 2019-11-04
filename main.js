var playGameBtn = document.querySelector("#play-game-btn");
var playerOneInput = document.querySelector("#p1-input");
var pageOne = document.querySelector(".start");
var body = document.querySelector("body");
var cardArray = [];
var

playerOneInput.addEventListener("keyup", allowStart);
playGameBtn.addEventListener("click", changeToPageTwo);

function allowStart(){
  playGameBtn.style.opacity = "1";
}

function changeToPageTwo(){
    pageOne.parentNode.removeChild(pageOne);
    loadPageTwo();
}

function loadPageTwo(){
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
  //After inserting new html we need new JS to run on it
  var pageTwoBtn = document.querySelector("#play-game-btn-two");
  pageTwoBtn.addEventListener("click", toGame);
}

function toGame() {
  var pageTwo = document.querySelector(".page-two");
  pageTwo.parentNode.removeChild(pageTwo);
  makeCards();
  loadGamePage();
}

function makeCards(){
  for(var i = 0; i < 5; i++){
    cardArray[i] = new Card(i);
  }
  cardArray = cardArray.concat(cardArray);
}

function randomizeRotation(cardNum) {
  var a = Math.floor(Math.random() * 16);
  // sets a 50 percent chance of the number being negative
  a *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
  var individualCard = document.getElementById(`cardArray${cardNum}`);
  individualCard.style.transform = `rotate(${a}deg)`
  }

function loadGamePage() {
  body.style.backgroundColor = "black";
  body.innerHTML += `
  <section class='game-page'>
    <aside id='p1-left'>
      <h2 class="margin">${playerOneInput.value}</h2>
      <h3>MATCHES THIS ROUND</h3>
      <h2>GAME WINS</h2>
    </aside>
    <section id="game-section">
    <script>
    </section>
    <aside id='p2-right'>
      <h2></h2>
      <h3>MATCHES THIS ROUND</h3>
      <h2>GAME WINS</h2>
    </aside>
  </section>
`;
insertCards();
for(var i = 0; i < 10; i++){
 randomizeRotation(i)
  }
}

function insertCards()
for(i = 0; i < 10; i++){

}

</script>
  <div id = "cardArray0" class="card">${cardArray[0]}</div>
  <div id = "cardArray1" class="card">${cardArray[1]}</div>
  <div id = "cardArray2" class="card">${cardArray[2]}</div>
  <div id = "cardArray3" class="card">${cardArray[3]}</div>
  <div id = "cardArray4" class="card">${cardArray[4]}</div>
  <div id = "cardArray5" class="card">${cardArray[5]}</div>
  <div id = "cardArray6" class="card">${cardArray[6]}</div>
  <div id = "cardArray7" class="card">${cardArray[7]}</div>
  <div id = "cardArray8" class="card">${cardArray[8]}</div>
  <div id = "cardArray9" class="card">${cardArray[9]}</div>
