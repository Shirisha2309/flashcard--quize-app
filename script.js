let flashcards = [];
let currentIndex = 0;
let showAnswer = false;

const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const counterEl = document.getElementById("counter");
const showBtn = document.getElementById("showBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const editBtn = document.getElementById("editBtn");
const deleteBtn = document.getElementById("deleteBtn");
const saveBtn = document.getElementById("saveBtn");
const questionInput = document.getElementById("questionInput");
const answerInput = document.getElementById("answerInput");

function displayCard() {
  if(flashcards.length === 0) {
    questionEl.textContent = "No cards yet";
    answerEl.textContent = "";
    counterEl.textContent = "0/0";
    return;
  }
  questionEl.textContent = flashcards[currentIndex].question;
  answerEl.textContent = showAnswer? flashcards[currentIndex].answer : "";
  counterEl.textContent = `${currentIndex+1}/${flashcards.length}`;
}

showBtn.onclick = () => {
  showAnswer =!showAnswer;
  displayCard();
  showBtn.textContent = showAnswer? "Hide Answer" : "Show Answer";
};

nextBtn.onclick = () => {
  if(currentIndex < flashcards.length - 1) currentIndex++;
  showAnswer = false;
  displayCard();
};

prevBtn.onclick = () => {
  if(currentIndex > 0) currentIndex--;
  showAnswer = false;
  displayCard();
};

saveBtn.onclick = () => {
  let q = questionInput.value.trim();
  let a = answerInput.value.trim();
  if(q && a) {
    flashcards.push({question: q, answer: a});
    currentIndex = flashcards.length - 1;
    questionInput.value = "";
    answerInput.value = "";
    displayCard();
  } else {
    alert("Please enter both Question and Answer");
  }
};

editBtn.onclick = () => {
  if(flashcards.length === 0) return;
  let q = prompt("Edit Question:", flashcards[currentIndex].question);
  let a = prompt("Edit Answer:", flashcards[currentIndex].answer);
  if(q && a) {
    flashcards[currentIndex] = {question: q, answer: a};
    displayCard();
  }
};

deleteBtn.onclick = () => {
  if(flashcards.length === 0) return;
  if(confirm("Delete this flashcard?")) {
    flashcards.splice(currentIndex, 1);
    if(currentIndex > 0) currentIndex--;
    displayCard();
  }
};

displayCard();