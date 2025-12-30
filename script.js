const gifs = [
  "gifs/200w.gif",
  "confetti/images (2).jpeg",
  "gifs/ISgw.gif",
  "gifs/source.gif",
  "gifs/curva.mp4"
];

const confettiImages = [
  "confetti/HD-wallpaper-cute-zootopia-bunny-cute-cartoon-judyhopps-movie.jpg",
  "confetti/images (1).jpeg",
  "confetti/images (2).jpeg",
  "confetti/images (3).jpeg",
  "confetti/Judy_Hopps.webp"
];

const messages = [
  "Te quiero un montoooooon! mira esto",
  "Us??",
  "CUESTIONARIO DE ZOOTOPIA(la 1 por lo menos) A VER CUANTO SABES",
  "Te quiero un monton, mas que a nadie en un largo tiempo. Me alegro de haberte conocido y espero que siempre encuentres un lugar en mi "
];

let currentStep = 0;
const memoryGame = document.getElementById('memory-game');
const message = document.getElementById("message");
const button = document.getElementById("btn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const gif = document.getElementById("gif");

button.addEventListener("click", startExperience);
prevBtn.addEventListener("click", goToPrevious);
nextBtn.addEventListener("click", goToNext);

function startExperience() {
  document.body.classList.add("viewing", "step1");
  showStep(0);
  explosion();
}

function showStep(index) {
  currentStep = index;

  gif.src = gifs[index];
  message.textContent = messages[index];
  message.style.opacity = 1;

  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === gifs.length - 1;

  document.body.className = `viewing step${index + 1}`;

  // ocultar siempre
  quiz.classList.add("hidden");
  
  // ocultar/mostrar gif y video según la pestaña
  const videoElement = document.getElementById("video");
  
  if (index === gifs.length - 1) {
    // Última pestaña: mostrar video y ocultar gif
    gif.style.display = "none";
    videoElement.style.display = "block";
    videoElement.play(); // Auto-reproducir el video
  } else {
    // Otras pestañas: mostrar gif y ocultar video
    gif.style.display = "block";
    videoElement.style.display = "none";
    videoElement.pause(); // Pausar el video
  }

  // 👉 mostrar quiz en la penúltima pestaña (índice 2 de 4 elementos = 0,1,2,3)
  if (index === 2) {
    quiz.classList.remove("hidden");
    startQuiz();
  }

  explosion();
}

function goToNext() {
  if (currentStep < gifs.length - 1) {
    showStep(currentStep + 1);
  }
}

function goToPrevious() {
  if (currentStep > 0) {
    showStep(currentStep - 1);
  }
}

function explosion() {
  // confetti
  for (let i = 0; i < 25; i++) {
    const img = document.createElement("img");
    img.src = confettiImages[Math.floor(Math.random() * confettiImages.length)];
    img.className = "confetti-img";
    img.style.left = Math.random() * 100 + "vw";
    img.style.animationDuration = (Math.random() * 2 + 2) + "s";
    img.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(img);
    setTimeout(() => img.remove(), 3000);
  }

  if (navigator.vibrate) navigator.vibrate(100);
}

const quizData = [
  {
    question: "¿Cómo se llama la protagonista coneja?",
    options: ["Judy Hops", "Judy Hopps", "Jenny Hopps"],
    correct: 1
  },
  {
    question: "¿Qué animal es Nick Wilde?",
    options: ["Lobo", "Perro", "Zorro"],
    correct: 2
  },
  {
    question: "¿Cuál de estas profesiones tiene Judy en algún momento de la película?",
    options: ["Vendedora de zanahorias", "Policía", "Medidora de parquímetros"],
    correct: "any"
  },
  {
    question: "¿Quién es el jefe de policía?",
    options: ["Nick Wilde", "Jefe Bogo", "Flash"],
    correct: 1
  },
  {
    question: "¿Qué animal es Flash?",
    options: ["Tortuga", "Perezoso", "Perezoso 🦥"],
    correct: 2
  }
];

let quizIndex = 0;
let quizScore = 0;

const quiz = document.getElementById("quiz");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizNext = document.getElementById("quizNext");
const quizResult = document.getElementById("quizResult");

function startQuiz() {
  quizIndex = 0;
  quizScore = 0;
  quizResult.textContent = "";
  quizQuestion.style.display = "block";
  quizOptions.style.display = "block";
  quizNext.style.display = "inline-block";
  showQuizQuestion();
}

function showQuizQuestion() {
  const q = quizData[quizIndex];
  quizQuestion.textContent = q.question;
  quizOptions.innerHTML = "";

  q.options.forEach((opt, i) => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="radio" name="quiz" value="${i}">
      ${opt}
    `;
    quizOptions.appendChild(label);
  });

  quizNext.textContent =
    quizIndex === quizData.length - 1 ? "Ver puntaje" : "Siguiente";
}

quizNext.addEventListener("click", () => {
  const selected = document.querySelector('input[name="quiz"]:checked');
  if (!selected) return;

  const currentQuestion = quizData[quizIndex];
  
  // Si correct es "any", cualquier respuesta es correcta
  if (currentQuestion.correct === "any") {
    quizScore += 2;
  } else if (parseInt(selected.value) === currentQuestion.correct) {
    quizScore += 2;
  }

  quizIndex++;

  if (quizIndex < quizData.length) {
    showQuizQuestion();
  } else {
    quizQuestion.style.display = "none";
    quizOptions.style.display = "none";
    quizNext.style.display = "none";
    quizResult.textContent = `💖 Tu puntaje final es: ${quizScore} / 10`;
    explosion();
  }
});