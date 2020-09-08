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
var nameText = document.getElementById('name');
var scoreBoard = document.getElementById('scoreboard');
var nameBtn = document.getElementById('name-btn');

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

var scoresArray = [];

//button starts game and closes div
startBtn.addEventListener("click", function(){
    openingDiv.style.display="none";
    navBar.style.display="block";
    myCarousel.style.display="block";
    // start timer
    timer = setInterval(counter, 1000);
});

// timer function
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

// end the timer and collect final values
function endTimer(){
    scoreMinutes = minutesOutput;
    console.log(scoreMinutes);
    scoreSeconds = secondsOutput;
    console.log(scoreSeconds);
    clearInterval(timer);
}

// slide carousel to next question
function nextQuestion() {
    $('.carousel').carousel('next')
};

// save the users time and name
function saveScore(){
    enterNameDiv.style.display="none";
    scoreBoard.style.display="block";
    var scoreObject = {
        name: nameText.value,
        score: finalScore
    };
    scoresArray.push(scoreObject);
    console.log("scoresArray"+ scoresArray);
}

//add functions to every button with class of answer
// START code from https://flaviocopes.com/how-to-add-event-listener-multiple-elements-javascript/
document.querySelectorAll('.answer').forEach(item => {
    item.addEventListener('click', event => {
      nextQuestion();
    })
  });
// END code from flaviocopes.com

// add event to all buttons with a class of incorrect
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
        finalScore = scoreMinutes + ":" + scoreSeconds;
        yourScore.innerHTML = finalScore;
    })
  });

// add event to button on final score page
nameBtn.addEventListener("click", saveScore);