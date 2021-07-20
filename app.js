import {q as data} from "./test.js";

const button = document.querySelector("button");
const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const answerOne = document.querySelector(".op1");
const answerTwo = document.querySelector(".op2");
const answerThree = document.querySelector(".op3");
const answerOneRadio = document.querySelector("#op1");
const answerTwoRadio = document.querySelector("#op2");
const answerThreeRadio = document.querySelector("#op3");
const level = document.querySelector(".level");
const wholeQuestion = document.getElementById("question");
const endScreen = document.querySelector(".end-screen");
const results = endScreen.querySelector("div");

let currentStep = localStorage.getItem("step") || 1;
const guesses = JSON.parse(localStorage.getItem("guesses")) || [];
const solutions = [];
for(let i = 0; i < data.length; i++){
  solutions[i] = data[i].answer;
}




if(currentStep >= 10){
  loadEndScreen();
}
loadQuestion(currentStep);
button.onclick = next;


// functions
function next(){

  let value;
  if(answerOneRadio.checked){
    value = 1;
    answerOneRadio.checked = false;
  }
  else if(answerTwoRadio.checked){
    value = 2;
    answerTwoRadio.checked = false;
  }
  else if(answerThreeRadio.checked){
    value = 3;
    answerThreeRadio.checked = false;
  }
  else{
    alert("You must select one of the answers!");
    return false;
  }

  guesses.push(value);  
  const lsValue = JSON.stringify(guesses);
  localStorage.setItem("guesses", lsValue);

  let dontStop = true;
  if(currentStep >= 10){
    loadEndScreen();
    dontStop = false;
  }
  if(dontStop){
    currentStep++;
    loadQuestion(currentStep);
  }
}

function loadQuestion(step){
  const questionData = data[step-1];
  
  localStorage.setItem("step", currentStep);

  level.innerHTML = questionData.level;
  level.classList.add(questionData.level);
  questionNumber.innerHTML = step;
  questionText.innerHTML = questionData.question;
  answerOne.innerHTML = questionData.allAnswers[0];
  answerTwo.innerHTML = questionData.allAnswers[1];
  answerThree.innerHTML = questionData.allAnswers[2];
}
function loadEndScreen(){
  wholeQuestion.remove();
  endScreen.classList.remove("hidden");

  const storedGuesses = JSON.parse(localStorage.getItem("guesses"));
  let correct = 0;
  for(let i = 0; i < 10; i++){
    const div = document.createElement("div");
    const b1 = document.createElement("b");
    const p1 = document.createElement("p");
    const b2 = document.createElement("b");
    const p2 = document.createElement("p"); 
    const span = document.createElement("span");

    span.innerHTML = data[i].question;

    b1.innerHTML = "Answer is: ";
    p1.innerHTML = data[i].allAnswers[data[i].answer-1];
    b2.innerHTML = "You guessed: ";
    p2.innerHTML = data[i].allAnswers[storedGuesses[i]-1];
    p2.classList.add("ans");

    p1.prepend(b1);
    p2.prepend(b2);

    div.appendChild(span);
    div.appendChild(p1);
    div.appendChild(p2);

    if(solutions[i] === storedGuesses[i]){
      correct++;
      div.querySelector(".ans").classList.add("green");
    } else{
      div.querySelector(".ans").classList.add("red");
    }

    results.appendChild(div);

  }

  endScreen.querySelector("span").innerHTML = correct;


  const button = document.createElement("button");
  button.innerHTML = "Try again";
  button.onclick = function (){
    localStorage.clear();
    location.reload();
  }
  endScreen.appendChild(button);
}