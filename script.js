var startBtn = document.getElementById('begin-btn');
var openingDiv = document.getElementById('opener');
var answerbtn = document.getElementsByClassName("answer");
var navBar = document.getElementById('navbar');
var myCarousel = document.getElementById('mycarousel');
var timerDisplay = document.getElementById('timer-display');
var dots = document.getElementById('digit-dots');
var addFive = document.getElementById('addfive');
var enterNameDiv = document.getElementById('enter-name');
var yourScore = document.getElementById('your-score');
var name = document.getElementById('name');
var scoreBoard = document.getElementById('scoreboard');

var timeoutColor;
var timer;
var seconds = 0;
var minutes = 0;
var secondsOutput;
var minutesOutput;
var minutesDigits = document.getElementById('minutesDigits');
var secondsDigits = document.getElementById('secondsDigits');

var finalScore = "";
var scoreSeconds = "";
var scoreMinutes = "";

var score = {
    name: 

}

//opening screen full width div with button
//button starts game and closes div

startBtn.addEventListener("click", function(){
    openingDiv.style.display="none";
    navBar.style.display="block";
    myCarousel.style.display="block";
    timer = setInterval(counter, 1000);
});
//create timer to count up
//create function that increases timer if incorrect answer
function counter(){
    seconds++;
    if (seconds < 10){
        secondsOutput = "0"+seconds;
    } else {
        secondsOutput = seconds;
    }
    if (seconds == 60){
        seconds = 0;
        secondsOutput = "00"
        minutes++;
    }
    secondsDigits.innerHTML = secondsOutput
    if (minutes < 10){
        minutesOutput = "0"+minutes;
    } else {
        minutesOutput = minutes;
    }
    minutesDigits.innerHTML = minutesOutput;
}

//function to add 15 seconds to timer and to change color of the timer digits
function addSeconds(){
    seconds = seconds + 15;
    secondsDigits.style.color = "#F79128";
    minutesDigits.style.color = "#F79128";
    dots.style.color = "#F79128";
    addFive.style.display= "inline";
    //return styles to normal after 2 seconds
    timeoutColor = setTimeout(function(){
        secondsDigits.style.color = "#ffffff";
        minutesDigits.style.color = "#ffffff";
        dots.style.color = "#ffffff";
        addFive.style.display="none";
    }, 2000);
}

function endTimer(){
    scoreMinutes = minutesOutput;
    console.log(scoreMinutes);
    scoreSeconds = secondsOutput;
    console.log(scoreSeconds);
    clearInterval(timer);
}

function saveScore(){
    enterNameDiv.style.display="none";
    scoreBoard.style.display="block";
}
//create carosel for questions and answers
//function to change answer appearance once clicked

//new div for final score / name input

//store name and score as an object

//new page for high scores


function nextQuestion() {
    $('.carousel').carousel('next')
};

//add functions to every button with class of answer
// START code from https://flaviocopes.com/how-to-add-event-listener-multiple-elements-javascript/
document.querySelectorAll('.answer').forEach(item => {
    item.addEventListener('click', event => {
      nextQuestion();
    })
  });
// END code from flaviocopes.com

document.querySelectorAll('.incorrect').forEach(item => {
    item.addEventListener('click', event => {
      addSeconds();
    })
  });

//add events to all buttons with class of last  
document.querySelectorAll('.last').forEach(item => {
    item.addEventListener('click', event => {
        endTimer();
        navBar.style.display="none";
        myCarousel.style.display="none";
        enterNameDiv.style.display="flex";
        yourScore.innerHTML = scoreMinutes + ":" + scoreSeconds;
    })
  });