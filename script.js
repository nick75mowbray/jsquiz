
//opening screen full width div with button
//button starts game and closes div

//create timer to count up
//create function that increases timer if incorrect answer

//create carosel for questions and answers
//function to change answer appearance once clicked

//new div for final score / name input

//store name and score as an object

//new page for high scores
$('.carousel').carousel('pause');
var answerbtn = document.getElementsByClassName("answer");


function nextQuestion() {
    $('.carousel').carousel('next')
}

//add functions to every button with class of answer
// START code from https://flaviocopes.com/how-to-add-event-listener-multiple-elements-javascript/
document.querySelectorAll('.answer').forEach(item => {
    item.addEventListener('click', event => {
      nextQuestion();
    })
  });
// END code from flaviocopes.com