"use strict";
const ok_begin = document.querySelector(".ok_begin");
const beginning = document.querySelector(".beginning");
const ok_end = document.querySelector(".ok_end");
const end = document.querySelector(".end");
const questionCard = document.querySelector(".questionCard");
const start = document.querySelector(".start");
const next = document.querySelector(".next");
const container = document.querySelector(".container");
const questionElement = document.querySelector(".question");
const answerElement = document.querySelector(".choices");
const body = document.querySelector("body");

let question_index; //index of the current question
let currentQuestion = []; //empty array indicates current question set

ok_begin.addEventListener("click", function () {
  beginning.classList.add(`hide`);
  questionCard.classList.remove(`hide`);
});

start.addEventListener("click", startGame);

next.addEventListener("click", function () {
  question_index++;
  nextQuestion();
});

ok_end.addEventListener("click", function () {
  end.classList.add(`hide`);
  beginning.classList.remove(`hide`);
});

//start button function
function startGame() {
  question_index = 0; //always start from the 1st
  currentQuestion = questions[question_index];
  start.classList.add(`hide`);
  container.classList.remove(`hide`);
  resetChoices();
  showContainer(questions[question_index]);
}

//remove the default choices from HTML
function resetChoices() {
  next.classList.add(`hide`);
  while (answerElement.firstChild) {
    answerElement.removeChild(answerElement.firstChild);
  }
}

//show the questions and choices
function showContainer(container) {
  //show the question
  questionElement.innerHTML = container.question;
  container.answers.forEach((element) => {
    //create buttons for the answers
    const answerButton = document.createElement(`button`);
    answerButton.innerText = element.content;
    answerButton.classList.add(`btn`);
    answerButton.addEventListener("click", selectAnswer);
    //show the buttons
    answerElement.appendChild(answerButton);
  });
}

//answer buttons function
function selectAnswer(e) {
  const selectedChoice = e.target;
  console.log(e.target);
  currentQuestion.answers.forEach((answer) => {
    if (answer.content === selectedChoice.innerText && answer.correct) {
      body.classList.add(`correct`);
      e.target.classList.add(`correct`);
      next.classList.remove(`hide`);
      // document.getElementsByClassName("next").disabled = true;
    }
  });
}

//next button function
function nextQuestion() {
  console.log(`nextQuestion!`);
  body.classList.remove(`correct`);
  if (question_index < questions.length) {
    currentQuestion = questions[question_index];
    resetChoices();
    showContainer(questions[question_index]);
  } else {
    end.classList.remove(`hide`);
    questionCard.classList.add(`hide`);
    container.classList.add(`hide`);
    next.classList.add(`hide`);
    // start.innerText = "Restart";
    start.classList.remove(`hide`);
  }
}

const questions = [
  {
    question: "What's my name?",
    answers: [
      { content: "John Xue", correct: true },
      { content: "Willy Wonka", correct: false },
      { content: "King Kong", correct: false },
    ],
  },
  {
    question: "Which city I'm living in?",
    answers: [
      { content: "Adelaide", correct: false },
      { content: "Alice Spring", correct: false },
      { content: "Brisbane", correct: false },
      { content: "Sydney", correct: true },
    ],
  },
  {
    question: "What position I'm after?",
    answers: [
      { content: "Janitor", correct: false },
      { content: "Java developer", correct: false },
      { content: "Front End developer", correct: true },
      { content: "CEO", correct: false },
    ],
  },
];
