// Birthday website personalized for Suresh by Ganesh.
const cousinName = "Suresh";
const yourName = "Ganesh";

document.title = `Happy Birthday, ${cousinName}! 🎂`;
document.getElementById("heroName").textContent = `${cousinName}.`;

const toast = document.getElementById("toast");
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
}
function confettiBurst(amount = 110) {
  const colors = ["#ff729e", "#ffd166", "#b6a0ff", "#69dfbf", "#ff9b71", "#ffffff"];
  for (let i = 0; i < amount; i++) {
    const bit = document.createElement("i");
    bit.className = "confetti";
    bit.style.left = Math.random() * 100 + "vw";
    bit.style.background = colors[Math.floor(Math.random() * colors.length)];
    bit.style.setProperty("--drift", (Math.random() * 280 - 140) + "px");
    bit.style.animationDuration = (2.2 + Math.random() * 2.7) + "s";
    bit.style.animationDelay = (Math.random() * .35) + "s";
    bit.style.width = (5 + Math.random() * 8) + "px";
    bit.style.height = (8 + Math.random() * 12) + "px";
    document.body.appendChild(bit);
    setTimeout(() => bit.remove(), 5600);
  }
}
document.getElementById("startBtn").addEventListener("click", () => {
  confettiBurst(95);
  document.getElementById("report").scrollIntoView({behavior:"smooth"});
  showToast(`Surprise protocol activated for ${cousinName}! 🎉`);
});
document.getElementById("confettiBtn").addEventListener("click", () => {
  confettiBurst(160);
  showToast("CHAOS DEPLOYED. Happy birthday, Suresh! 🥳");
});
document.getElementById("finalSurprise").addEventListener("click", () => {
  confettiBurst(220);
  showToast(`Happy birthday, ${cousinName}! Love you, bro — ${yourName} ❤️`);
});

/* Personalize these questions with real shared memories or inside jokes. */
const questions = [
  {q:"Who is most likely to turn a simple plan into a full adventure?", options:["Suresh, obviously 😂","The family group chat","The neighbour's cat","Nobody. We're always organised."], answer:0, note:"Correct. The chaos has a name. 😂"},
  {q:"What is the one non-negotiable birthday item?", options:["A spreadsheet","Cake. This is not up for debate.","A Monday meeting","Extra homework"], answer:1, note:"Correct. Cake is a human right. 🍰"},
  {q:"How long is the cousin contract valid?", options:["One birthday","Until the phone battery dies","For life: laughs, support, and memories","Only on weekends"], answer:2, note:"Correct. Lifetime cousin membership unlocked. 🫶"}
];
let currentQuestion = 0, score = 0, answered = false;
function renderQuestion() {
  answered = false;
  const q = questions[currentQuestion];
  document.getElementById("quizCount").textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  document.getElementById("quizScore").textContent = `Score: ${score}`;
  document.getElementById("progressBar").style.width = `${(currentQuestion / questions.length) * 100}%`;
  document.getElementById("questionText").textContent = q.q;
  document.getElementById("quizNote").textContent = "";
  const answers = document.getElementById("answers");
  answers.innerHTML = "";
  q.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.textContent = option;
    button.addEventListener("click", () => chooseAnswer(index, button));
    answers.appendChild(button);
  });
}
function chooseAnswer(index, chosenButton) {
  if (answered) return;
  answered = true;
  const q = questions[currentQuestion];
  const all = [...document.querySelectorAll(".answer")];
  all.forEach((button, i) => {
    button.disabled = true;
    if (i === q.answer) button.classList.add("correct");
  });
  if (index === q.answer) {
    score++;
    document.getElementById("quizNote").textContent = q.note;
    confettiBurst(25);
  } else {
    chosenButton.classList.add("wrong");
    document.getElementById("quizNote").textContent = "Wrong answer, but birthday rules say you get another slice. 😌";
  }
  document.getElementById("quizScore").textContent = `Score: ${score}`;
  document.getElementById("progressBar").style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  const next = document.createElement("button");
  next.className = "btn next";
  next.textContent = currentQuestion === questions.length - 1 ? "Reveal my result 🎉" : "Next question →";
  next.addEventListener("click", () => {
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      renderQuestion();
      return;
    }
    document.getElementById("questionText").textContent = score === questions.length
      ? "PERFECT SCORE. Suresh, cousin legend confirmed. 🏆"
      : `You scored ${score}/${questions.length}. Still a certified family legend. 🏆`;
    document.getElementById("answers").innerHTML = "";
    document.getElementById("quizNote").textContent = "Your prize: birthday love, lifetime cousin support, and first dibs on the cake.";
    document.getElementById("quizCount").textContent = "Mission complete!";
    document.getElementById("progressBar").style.width = "100%";
    confettiBurst(130);
    showToast("Quiz complete. Legend status confirmed! 💛");
  });
  document.getElementById("answers").appendChild(next);
}
document.getElementById("restartQuiz").addEventListener("click", () => {
  currentQuestion = 0; score = 0; renderQuestion();
});
renderQuestion();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.12});
document.querySelectorAll(".reveal").forEach(section => observer.observe(section));

// If a photo is loaded, hide its placeholder overlay.
document.querySelectorAll(".memory img").forEach(img => {
  img.addEventListener("load", () => {
    const placeholder = img.parentElement.querySelector(".photo-empty");
    if (placeholder) placeholder.style.display = "none";
  });
  if (img.complete && img.naturalWidth > 0) {
    const placeholder = img.parentElement.querySelector(".photo-empty");
    if (placeholder) placeholder.style.display = "none";
  }
});
