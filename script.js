// declare variables
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
var againBtn = document.getElementById('go-again');

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

// set the previous time display in navbar
var previousTime = localStorage.getItem("prevTimeKey");
var prevTimeText = document.getElementById("highscore-display");
if (previousTime!==null){
    prevTimeText.innerHTML = "Previous Time: "+previousTime;
}

//button starts game and closes div
startBtn.addEventListener("click", function(){
    // show questions/ nav and close opening screen
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

// slide carousel to next question with a delay of 500ms
var sliderDelay;
function nextQuestion() {
    sliderDelay = setTimeout(function(){
        $('.carousel').carousel('next')
    }, 500);
};

// end the timer and collect final values
function endTimer(){
    scoreMinutes = minutesOutput;
    scoreSeconds = secondsOutput;
    clearInterval(timer);
}

// declare variables for score in localStorage
var scoresArray = [];
var scoreKey = localStorage.getItem("scoreKey");
var scoreList = document.getElementById('scorelist');
var namesArray = [];
var nameKey = localStorage.getItem("nameKey");

// save the users time and name
function saveScore(){
    enterNameDiv.style.display="none";
    scoreBoard.style.display="block";
    init();
    scoresArray.push(finalScore);
    namesArray.push(nameText.value.trim());
    
    storeScores();
    renderScores();
}

// function to render names and score to page
function renderScores(){
    // clear scores
    scoreList.innerHTML = "";
    // render a new li for each score
    for (var i = 0; i < scoresArray.length; i++){
        var score = scoresArray[i];
        var name = namesArray[i]

        // create div
        var scoreDiv = document.createElement('div');
        scoreDiv.classList.add('score-entries');
        // create h2 element for name
        var nameh2 = document.createElement("h2");
        nameh2.textContent = name;
        nameh2.setAttribute("data-index", i);
        // create h2 element for score
        var scoreh2 = document.createElement("h2");
        scoreh2.textContent = score;
        scoreh2.setAttribute("data-index", i); 

        // add name, score and div to page
        scoreDiv.appendChild(nameh2);
        scoreDiv.appendChild(scoreh2);
        scoreList.appendChild(scoreDiv);
    }
}

// function to get names and scores and render to page
function init(){
    if(scoreKey===null||nameKey===null){
        console.log("nothing in localStorage for scores or names");
    } else {
        scoresArray = JSON.parse(localStorage.getItem("scoreKey"));
        namesArray = JSON.parse(localStorage.getItem("nameKey"));
    }
    renderScores();
};
// function to send names and scores to local storage
function storeScores() {
    localStorage.setItem("scoreKey", JSON.stringify(scoresArray));
    localStorage.setItem("nameKey", JSON.stringify(namesArray));
};

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

  var endSlides;
//add events to all buttons with class of last  
document.querySelectorAll('.last').forEach(item => {
    item.addEventListener('click', event => {
        // delay end timer to make sure any penalties on the question are added
        endSlides = setTimeout(function(){
            endTimer();
            navBar.style.display="none";
            myCarousel.style.display="none";
            enterNameDiv.style.display="flex";
            finalScore = scoreMinutes + ":" + scoreSeconds;
            yourScore.innerHTML = finalScore;
            localStorage.setItem("prevTimeKey", finalScore);
    }, 1000);
  });
});

// add event to button on final score page
nameBtn.addEventListener("click", saveScore);

// add event to go again button on scoreboard page
againBtn.addEventListener("click", function(){
    //reload the page
    location.reload();
});