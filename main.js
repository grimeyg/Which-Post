var playGameBtn = document.querySelector("#play-game-btn");
var playerOneInput = document.querySelector("#p1-input");
var pageOne = document.querySelector(".start");
var body = document.querySelector("body");
var cardArray = [];
var cardMatch = [];
var nums = []
var seconds = 0;

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
      <h2>WELCOME ${playerOneInput.value} AND PLAYER 2!</h2>
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


function loadGamePage() {
  body.style.backgroundColor = "black";
  body.innerHTML += `
    <section class='game-page'>
      <aside id='p1-left'>
        <h2 class="margin">${playerOneInput.value}</h2>
        <div class="box">
          <h3>MATCHES THIS ROUND</h3>
          <p class="score">0</p>
        </div>
        <h2>GAME WINS</h2>
      </aside>
      <section id="game-section">
      <div id="start-msg">
        <p>Welcome ${playerOneInput.value}, when you click this button the game
           will start and your time will be recorded. Good Luck!
        </p>
        <input class="start-time" type="button" value="Start">
      </div>
      </section>
      <aside id='p2-right'>
        <h2></h2>
        <h3>MATCHES THIS ROUND</h3>
        <h2>GAME WINS</h2>
      </aside>
    </section>
  `;
  var startTimeBtn = document.querySelector(".start-time")
  startTimeBtn.addEventListener ("click", insertCards)
}

function insertCards(){
  clearInterval(count);
  var count = setInterval(timer.startTimer, 1000);
  var startMsg = document.querySelector("#start-msg")
  startMsg.innerHTML = "";
  var cardContainer = document.querySelector("#game-section");

  for (var a = Math.floor(Math.random() * 10); nums.length < 10; a = Math.floor(Math.random() * 10)){
    if(!nums.includes(a)){
      nums.push(a);
    }
  }
  for(var i = 0; i < 10; i++){
    cardContainer.innerHTML +=`<div id = "cardArray${nums[i]}" class="card">${cardArray[nums[i]].matchInfo}</div>`;
    randomizeRotation(nums[i]);
  }
  clickCard(cardContainer);
}

var clickHandler = function(event){
  var cardContainer = document.querySelector("#game-section");
  if(event.target.classList.contains("card") && event.target === cardMatch[0]){
    null;
  }else if (event.target.classList.contains("card")){
     cardMatch.push(event.target);
     animateClick(event, cardContainer);
     if(cardMatch.length === 2){
       event.target.parentNode.removeEventListener("click", clickHandler);
      // this sleep function removes the EL for the length of the second card animation, then adds it back
       function sleep(ms) {
         return new Promise(resolve => setTimeout(resolve, ms));
       }
       async function demo() {
        console.log('Taking a break...');
        await sleep(3100);
        clickCard(cardContainer)
       }
       demo();
    }
  }
}

function clickCard(cardContainer){
  cardContainer.addEventListener("click", clickHandler)
}

function animateClick(event, cardContainer){
  event.target.classList.add("flip-fwd");
  // stay flipped if only one card is selected
  if(cardMatch.length === 1){
    null;
  }else{
    // allow flip-fwd animation of 2nd card to go through
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function demo() {
      console.log('Taking a break...');
      await sleep(900);
      event.target.classList.remove("flip-fwd");
      event.target.classList.add("flip-back");
      cardMatch[0].classList.remove("flip-fwd");
      cardMatch[0].classList.add("flip-back");
      checkForMatch(cardContainer);
    }
    demo();
  }
}

function checkForMatch(cardContainer) {
  var p1ScoreString = document.querySelector(".score").innerText;
  var p1ScoreNum = parseInt(p1ScoreString);
  if (cardMatch[0].innerText === cardMatch[1].innerText){
    var toggleInfo = parseInt(cardMatch[0].innerText)
    for(i = 0; i < cardArray.length; i++){
      if(toggleInfo === cardArray[i].matchInfo){
        cardArray[i].matched = true;
      }
    }
    removeCards(cardContainer);
    p1ScoreNum ++;
    document.querySelector(".score").innerText = `${p1ScoreNum}`
    checkForGameOver(p1ScoreNum, cardContainer);
  }
  cardMatch.splice(0,2)
}

function removeCards(cardContainer) {
  cardContainer.removeChild(cardMatch[1]);
  cardContainer.removeChild(cardMatch[0]);

}

function randomizeRotation(cardNum) {
  //number betwwen 15 degrees
  var a = Math.floor(Math.random() * 16);
  // sets a 50 percent chance of the number being negative
  a *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
  var individualCard = document.getElementById(`cardArray${cardNum}`);
  individualCard.style.transform = `rotate(${a}deg)`
}

function checkForGameOver (p1ScoreNum, cardContainer){
  if(p1ScoreNum === 5){
    var timeMin = 0;
    var timeSec = timer.endTimer();
    if(timeSec > 59){
      timeMin = Math.floor(timeSec / 60);
      timeSec = timeSec % 60;
    }
    if (timeMin === 1){
    cardContainer.innerHTML += `
      <p class="congrats"> Congratulations ${playerOneInput.value} you have smashed
      this gaming challenge! 🤙 It took you ${timeMin} minute and ${timeSec} seconds.
    `
    }else{
      cardContainer.innerHTML += `
        <p class="congrats"> Congratulations ${playerOneInput.value} you have smashed
        this gaming challenge! 🤙 It took you ${timeMin} minutes and ${timeSec} seconds.
      `
    }
  }
}

var timer = {
  startTimer(){
    seconds ++;
  },
  endTimer(){
    return seconds;
  }
}
