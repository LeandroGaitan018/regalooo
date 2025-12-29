const gifs = [
    "gifs/200w.gif",
    "gifs/source.gif"
  ];
  
  const confettiImages = [
    "confetti/HD-wallpaper-cute-zootopia-bunny-cute-cartoon-judyhopps-movie.jpg",
    "confetti/images (1).jpeg",
    "confetti/images (2).jpeg",
    "confetti/images (3).jpeg",
    "confetti/Judy_Hopps.webp"

  ];
  
  let step = 0;
  
  const message = document.getElementById("message");

  const button = document.getElementById("btn");
  const nextBtn = document.getElementById("nextBtn");
  const gif = document.getElementById("gif");
  
  button.addEventListener("click", showFirst);
  nextBtn.addEventListener("click", showSecond);
  
  function showFirst() {
    if (step !== 0) return;
    document.body.className = "step1";
  
    gif.src = gifs[0];
    gif.style.display = "block";
    nextBtn.style.display = "inline-block";
    step = 1;
  
    explosion();
    message.textContent = "Te quiero un montoooooon! mira esto";
message.style.opacity = 1;
  }
  
  function showSecond() {
    if (step !== 1) return;
  
    document.body.className = "step2";

    gif.src = gifs[1];
    nextBtn.style.display = "none";
    step = 2;
    message.textContent = "Te quiero una banda y me alegro de haberte conocido!! :D";

    explosion();
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
  