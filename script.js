const gifs = [
  "gifs/200w.gif",
  "confetti/images (2).jpeg",
  "gifs/ISgw.gif",
  "confetti/WhatsApp Image 2026-01-04 at 00.21.02.jpeg",
  "gifs/source.gif",
  "gifs/kris.mp4"
];

const confettiImages = [
  "confetti/HD-wallpaper-cute-zootopia-bunny-cute-cartoon-judyhopps-movie.jpg",
  "confetti/images (1).jpeg",
  "confetti/images (2).jpeg",
  "confetti/images (3).jpeg",
  "confetti/Judy_Hopps.webp"
];

const mensajes = [
  "Te amo un montoooooon! Muero de ganas de estar asi con vos mi vida",
  "Us <3 Us <3 Us <3",
  "CUESTIONARIO DE ZOOTOPIA(la 1 por lo menos) A VER CUANTO SABES(sabes todo realmente)",
  "Te amo amor (te juro que soy re manco y me costó)",
  "Te amo mucho amor, mas que a nadie y vos sabes que es verdad. Me alegro de haberte conocido, me cambiaste el año y eso que apenas empieza. En vos encuentro una cantidad de amor la cual me agarró de sorpresa, sos esa persona con la que quiero compartir todo y espero que siempre encuentres un lugar en mi, sos a quien mas ame en mi vida hasta ahora y no le diria eso a cualquiera TE AMO KRIS TE AMO MUCHO MI AMOR ",
  "Te adoro"
];

let currentStep = 0;
const memoryGame = document.getElementById('memory-game');
const mensaje = document.getElementById("mensaje");
const button = document.getElementById("btn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const gif = document.getElementById("gif");
const audio = document.getElementById("bg-music");

audio.volume = 0.030; // volumen entre 0.0 y 1.0 (ej: 20%)
button.addEventListener("click", startExperience);
prevBtn.addEventListener("click", goToPrevious);
nextBtn.addEventListener("click", goToNext);

function startExperience() {
  document.body.classList.add("viewing", "step1");
  showStep(0);
  explosion();

  audio.play().catch(err => {
    console.log("El navegador bloqueó el audio:", err);
  });
}

function showStep(index) {
  currentStep = index;

  gif.src = gifs[index];
  mensaje.textContent = mensajes[index];
  mensaje.style.opacity = 1;

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
    question: "¿Cómo se llama la protagonista?",
    options: ["Judy Hops", "Judy Hopps", "Jenny Hopps"],
    correct: 1
  },
  {
    question: "¿Cual es el nombre de el zorro?",
    options: ["Nick wild", "Nick Wilde", "Nico de wilde"],
    correct: 1
  },
  {
    question: "¿Cuantas multas queria poner Judy en su primer dia de trabajo?",
    options: ["30", "100", "200"],
    correct: 2
  },
  {
    question: "¿De que color queria el 'hijo' de Nick el Jumbo Pop?",
    options: ["verde", "rojo", "azul"],
    correct: 1
  },
  {
    question: "¿Quien es la persona mas honesta, creativa, hermosa y amorosa del mundo?",
    options: ["Kris", "KRIIIIIIS", "Kris mi amor"],
    correct: "any"
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