// Sincronización exacta con ChristianBasso&HaienQiu-Flowers.mp3
const audio = document.getElementById("bgMusic") || document.querySelector("audio");
const lyrics = document.getElementById("lyrics");
const replayBtn = document.getElementById("replayBtn");

const lyricsData = [
  // --- Parte 1 ---
  { start: 16.8, end: 20.8, text: "At the time", translation: "En aquel momento" },
  { start: 21.2, end: 26.5, text: "The whisper of birds", translation: "El susurro de las aves" },
  { start: 27.2, end: 32.8, text: "Lonely before the sun cried", translation: "Solitario antes de que el sol llorara" },
  { start: 33.2, end: 36.0, text: "Fell from the sky", translation: "Cayó del cielo" },
  { start: 36.5, end: 41.0, text: "Like water drops", translation: "Como gotas de agua" },
  { start: 41.5, end: 47.8, text: "Where I'm now? I don't know why", translation: "¿Dónde estoy ahora? No sé por qué" },
  { start: 48.2, end: 54.0, text: "Nice butterflies in my hands", translation: "Hermosas mariposas en mis manos" },
  { start: 54.5, end: 59.2, text: "Too much light for twilight", translation: "Demasiada luz para el atardecer" },
  { start: 59.8, end: 65.5, text: "In the mood for the flowers' love", translation: "Con el alma lista para el amor de las flores" },

  // --- Puente intermedio ---
  { start: 66.2, end: 72.8, text: "That visions...", translation: "Aquellas visiones..." },
  { start: 73.2, end: 79.5, text: "Really strong, blow my mind", translation: "Tan intensas, cautivan mi mente" },
  { start: 80.0, end: 86.8, text: "Silence, let me see what it was", translation: "Silencio, déjame ver lo que era" },
  { start: 87.2, end: 94.0, text: "I only want to live in clouds", translation: "Solo quiero vivir en las nubes" },

  // --- Parte 2 ---
  { start: 94.8, end: 101.0, text: "Where I'm now? I don't know why", translation: "¿Dónde estoy ahora? No sé por qué" },
  { start: 101.5, end: 107.5, text: "Nice butterflies in my hands", translation: "Hermosas mariposas en mis manos" },
  { start: 108.0, end: 113.0, text: "Too much light for twilight", translation: "Demasiada luz para el atardecer" },
  { start: 113.5, end: 122.0, text: "In the mood for the flowers' love", translation: "Con el alma lista para el amor de las flores" },

  // --- Parte 3 (Inicio exacto en el minuto 2:25 = 145.0 segundos) ---
  { start: 145.0, end: 149.2, text: "At the time", translation: "En aquel momento" },
  { start: 149.6, end: 155.0, text: "The whisper of birds", translation: "El susurro de las aves" },
  { start: 155.5, end: 161.2, text: "Lonely before the sun cried", translation: "Solitario antes de que el sol llorara" },
  { start: 161.6, end: 164.5, text: "Fell from the sky", translation: "Cayó desde el cielo" },
  { start: 165.0, end: 169.5, text: "Like water drops", translation: "Como gotas de agua" },
  { start: 170.0, end: 176.2, text: "Where I'm now? I don't know why", translation: "¿Dónde estoy ahora? No sé por qué" },
  { start: 176.6, end: 182.8, text: "Nice butterflies in my hands", translation: "Hermosas mariposas en mis manos" },
  { start: 183.2, end: 188.5, text: "Too much light for twilight", translation: "Demasiada luz para el atardecer" },
  { start: 189.0, end: 202.0, text: "In the mood for the flowers' love...", translation: "Con el alma lista para el amor de las flores..." }
];

let currentIndex = -1;

function updateLyrics() {
  if (!audio || !lyrics) return;
  const curTime = audio.currentTime;

  const activeIndex = lyricsData.findIndex(
    line => curTime >= line.start && curTime <= line.end
  );

  if (activeIndex !== -1) {
    if (currentIndex !== activeIndex) {
      currentIndex = activeIndex;
      const line = lyricsData[activeIndex];
      lyrics.innerHTML = `
        <div class="line-original">${line.text}</div>
        <div class="line-spanish">${line.translation}</div>
      `;
      lyrics.style.opacity = "1";
      lyrics.style.transform = "translateY(0)";
    }
  } else {
    if (currentIndex !== -1) {
      currentIndex = -1;
      lyrics.style.opacity = "0";
      lyrics.style.transform = "translateY(-6px)";
    }
  }
}

function syncLoop() {
  updateLyrics();
  requestAnimationFrame(syncLoop);
}
requestAnimationFrame(syncLoop);

// Mostrar botón para repetir al terminar la canción
if (audio) {
  audio.addEventListener("ended", () => {
    if (replayBtn) replayBtn.classList.add("visible");
  });

  audio.addEventListener("timeupdate", () => {
    if (audio.currentTime >= 204 && replayBtn) {
      replayBtn.classList.add("visible");
    }
  });
}

if (replayBtn) {
  replayBtn.addEventListener("click", () => {
    replayBtn.classList.remove("visible");
    currentIndex = -1;
    if (lyrics) {
      lyrics.innerHTML = "";
      lyrics.style.opacity = "0";
    }

    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }

    document.body.classList.add("container");
    setTimeout(() => {
      document.body.classList.remove("container");
    }, 150);
  });
}
