const STORAGE_KEY = "flashcard-quiz-app-cards";

const initialCards = [
  {
    id: 1,
    question: "What is the capital of France?",
    answer: "Paris.",
  },
  {
    id: 2,
    question: "What does HTML stand for?",
    answer: "HyperText Markup Language.",
  },
  {
    id: 3,
    question: "What is 2 + 2?",
    answer: "4.",
  },
];

const elements = {
  questionText: document.getElementById("questionText"),
  answerText: document.getElementById("answerText"),
  answerArea: document.getElementById("answerArea"),
  cardCounter: document.getElementById("cardCounter"),
  cardCount: document.getElementById("cardCount"),
  cardList: document.getElementById("cardList"),
  showAnswerBtn: document.getElementById("showAnswerBtn"),
  prevBtn: document.getElementById("prevBtn"),
  nextBtn: document.getElementById("nextBtn"),
  addCardBtn: document.getElementById("addCardBtn"),
  editCardBtn: document.getElementById("editCardBtn"),
  deleteCardBtn: document.getElementById("deleteCardBtn"),
  cardForm: document.getElementById("cardForm"),
  questionInput: document.getElementById("questionInput"),
  answerInput: document.getElementById("answerInput"),
  formTitle: document.getElementById("formTitle"),
  cancelEditBtn: document.getElementById("cancelEditBtn"),
};

let cards = loadCards();
let currentIndex = 0;
let showingAnswer = false;
let editingId = null;

function loadCards() {
  const savedCards = localStorage.getItem(STORAGE_KEY);
  if (!savedCards) {
    return initialCards;
  }

  try {
    const parsed = JSON.parse(savedCards);
    return Array.isArray(parsed) && parsed.length ? parsed : initialCards;
  } catch (error) {
    console.error("Unable to parse saved cards", error);
    return initialCards;
  }
}

function saveCards() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

function render() {
  if (!cards.length) {
    elements.questionText.textContent = "No cards yet";
    elements.answerText.textContent = "";
    elements.answerArea.classList.add("hidden");
    elements.cardCounter.textContent = "0 / 0";
    elements.cardCount.textContent = "0 cards";
    elements.cardList.innerHTML = '<li class="empty-state">Add a card to start studying.</li>';
    elements.prevBtn.disabled = true;
    elements.nextBtn.disabled = true;
    elements.editCardBtn.disabled = true;
    elements.deleteCardBtn.disabled = true;
    return;
  }

  currentIndex = Math.min(currentIndex, cards.length - 1);
  const card = cards[currentIndex];

  elements.questionText.textContent = card.question;
  elements.answerText.textContent = card.answer;
  elements.answerArea.classList.toggle("hidden", !showingAnswer);
  elements.cardCounter.textContent = `${currentIndex + 1} / ${cards.length}`;
  elements.cardCount.textContent = `${cards.length} card${cards.length > 1 ? "s" : ""}`;

  elements.prevBtn.disabled = cards.length <= 1;
  elements.nextBtn.disabled = cards.length <= 1;
  elements.editCardBtn.disabled = false;
  elements.deleteCardBtn.disabled = false;

  renderCardList();
}

function renderCardList() {
  elements.cardList.innerHTML = "";

  cards.forEach((card, index) => {
    const listItem = document.createElement("li");
    listItem.className = `card-list-item${index === currentIndex ? " active" : ""}`;

    const selectButton = document.createElement("button");
    selectButton.type = "button";
    selectButton.dataset.index = index;
    selectButton.textContent = card.question;

    listItem.appendChild(selectButton);
    elements.cardList.appendChild(listItem);
  });
}

function resetForm() {
  editingId = null;
  elements.cardForm.reset();
  elements.formTitle.textContent = "Add New Card";
  elements.cancelEditBtn.classList.add("hidden");
}

function startAddCard() {
  resetForm();
  elements.questionInput.focus();
}

function startEditCard() {
  if (!cards.length) return;

  const card = cards[currentIndex];
  editingId = card.id;
  elements.formTitle.textContent = "Edit Card";
  elements.questionInput.value = card.question;
  elements.answerInput.value = card.answer;
  elements.cancelEditBtn.classList.remove("hidden");
  elements.questionInput.focus();
}

function saveCard(event) {
  event.preventDefault();

  const question = elements.questionInput.value.trim();
  const answer = elements.answerInput.value.trim();

  if (!question || !answer) {
    return;
  }

  if (editingId) {
    cards = cards.map((card) =>
      card.id === editingId ? { ...card, question, answer } : card
    );
  } else {
    const newCard = {
      id: Date.now(),
      question,
      answer,
    };
    cards = [...cards, newCard];
    currentIndex = cards.length - 1;
  }

  showingAnswer = false;
  saveCards();
  render();
  resetForm();
}

function deleteCurrentCard() {
  if (!cards.length) return;

  const card = cards[currentIndex];
  const confirmed = window.confirm(`Delete “${card.question}”?`);
  if (!confirmed) return;

  cards = cards.filter((item) => item.id !== card.id);

  if (!cards.length) {
    currentIndex = 0;
    showingAnswer = false;
    saveCards();
    render();
    resetForm();
    return;
  }

  currentIndex = Math.min(currentIndex, cards.length - 1);
  showingAnswer = false;
  saveCards();
  render();
}

function toggleAnswer() {
  if (!cards.length) return;
  showingAnswer = !showingAnswer;
  render();
}

function goToNext() {
  if (!cards.length) return;
  currentIndex = (currentIndex + 1) % cards.length;
  showingAnswer = false;
  render();
}

function goToPrevious() {
  if (!cards.length) return;
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  showingAnswer = false;
  render();
}

elements.showAnswerBtn.addEventListener("click", toggleAnswer);
elements.prevBtn.addEventListener("click", goToPrevious);
elements.nextBtn.addEventListener("click", goToNext);
elements.addCardBtn.addEventListener("click", startAddCard);
elements.editCardBtn.addEventListener("click", startEditCard);
elements.deleteCardBtn.addEventListener("click", deleteCurrentCard);
elements.cardForm.addEventListener("submit", saveCard);
elements.cancelEditBtn.addEventListener("click", resetForm);

elements.cardList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-index]");
  if (!button) return;

  currentIndex = Number(button.dataset.index);
  showingAnswer = false;
  render();
});

render();
let flashcards = [
  {question: "What is HTML?", answer: "HyperText Markup Language"},
  {question: "What is CSS?", answer: "Cascading Style Sheets"}
];
let currentIndex = 0;
let showAnswer = false;

const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const showBtn = document.getElementById("showBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const addBtn = document.getElementById("addBtn");
const editBtn = document.getElementById("editBtn");
const deleteBtn = document.getElementById("deleteBtn");

function displayCard() {
  if(flashcards.length === 0) {
    questionEl.textContent = "No flashcards. Add one!";
    answerEl.textContent = "";
    return;
  }
  questionEl.textContent = flashcards[currentIndex].question;
  answerEl.textContent = showAnswer? flashcards[currentIndex].answer : "";
}

showBtn.addEventListener("click", () => {
  showAnswer =!showAnswer;
  displayCard();
  showBtn.textContent = showAnswer? "Hide Answer" : "Show Answer";
});

nextBtn.addEventListener("click", () => {
  if(currentIndex < flashcards.length - 1) currentIndex++;
  showAnswer = false;
  displayCard();
  showBtn.textContent = "Show Answer";
});

prevBtn.addEventListener("click", () => {
  if(currentIndex > 0) currentIndex--;
  showAnswer = false;
  displayCard();
  showBtn.textContent = "Show Answer";
});

addBtn.addEventListener("click", () => {
  let q = prompt("Enter Question:");
  let a = prompt("Enter Answer:");
  if(q && a) {
    flashcards.push({question: q, answer: a});
    currentIndex = flashcards.length - 1;
    displayCard();
  }
});

editBtn.addEventListener("click", () => {
  let q = prompt("Edit Question:", flashcards[currentIndex].question);
  let a = prompt("Edit Answer:", flashcards[currentIndex].answer);
  if(q && a) {
    flashcards[currentIndex] = {question: q, answer: a};
    displayCard();
  }
});

deleteBtn.addEventListener("click", () => {
  if(confirm("Delete this flashcard?")) {
    flashcards.splice(currentIndex, 1);
    if(currentIndex > 0) currentIndex--;
    displayCard();
  }
});

displayCard();