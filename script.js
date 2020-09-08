var startBtn = document.getElementById('begin-btn');
var openingDiv = document.getElementById('opener');
var answerbtn = document.getElementsByClassName("answer");
var navBar = document.getElementById('navbar');
var myCarousel = document.getElementById('mycarousel');
var timer;
var seconds = 0;
var minutes = 0;
var secondsOutput;
var minutesOutput;
var minutesDigits = document.getElementById('minutesDigits');
var secondsDigits = document.getElementById('secondsDigits');

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