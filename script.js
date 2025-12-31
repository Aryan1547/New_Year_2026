/* ================= GLOBAL ================= */
let page = 0;
let openedCards = 0;
let memoryOpened = 0;

const pages = document.querySelectorAll(".page");
const totalMemories = 5;

/* ================= TEXT ================= */
const introText =
"Akshra… this year came with quiet surprises.\n\n" +
"Tumse milna was an accident,\n" +
"but remembering you slowly became a habit.\n\n" +
"Baat kam hoti hai,\n" +
"but they still manage to bring a bigger smile.\n\n" +
"Just a New Year reminder—\n" +
"kuch log bina try kiye hi year ka part ban jaate hain.\n\n" +
"Happy New Year 💖\n (khtam hone ke baad text ek uss chuhe pe wapas click kar dena then ,next karne se phele  )";



const wishText =
"Is saal ek achi cheez hui—\n" +
"tum mile, friendship hui,\n" +
"aur smile ka permanent subscription mil gaya 😄\n\n" +
"I hope this year our friendship becomes even deeper.\n" +
"Happy New Year 💕";


const cardTexts = [
  "Some people feel safe… you feel like home.",
  "Your smile stays longer than moments.",
  "Some memories already feel like you."
];

/* ================= AUDIO ================= */
const clickSound = document.getElementById("clickSound");
const bgMusic = document.getElementById("bgMusic");
const flipSound = document.getElementById("flipSound");

/* ================= AUDIO UNLOCK (IMPORTANT) ================= */
let audioUnlocked = false;

function unlockAudio() {
  if (audioUnlocked) return;

  [clickSound, bgMusic, flipSound].forEach(sound => {
    if (!sound) return;

    sound.volume = 0;
    sound.play().then(() => {
      sound.pause();
      sound.currentTime = 0;
      sound.volume = 0.5;
    }).catch(() => {});
  });

  audioUnlocked = true;
}

/* ================= AUDIO HELPERS ================= */
function playClick() {
  if (!clickSound) return;
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});
}

function playFlipSound() {
  if (!flipSound) return;
  flipSound.currentTime = 0;
  flipSound.volume = 0.5;
  flipSound.play().catch(() => {});
}

/* ================= NAVIGATION ================= */
function next() {
  unlockAudio();          // 🔓 unlock on user action
  playClick();

  pages[page].classList.remove("active");
  page++;
  pages[page].classList.add("active");
}

/* ================= TYPEWRITER ================= */
function type(el, text, cb) {
  let i = 0;
  el.innerHTML = "";
  el.style.opacity = 1;

  function run() {
    if (i < text.length) {
      el.innerHTML += text.charAt(i);
      i++;
      setTimeout(run, 40);
    } else if (cb) cb();
  }
  run();
}

/* ================= INTRO ================= */
function openIntro() {
  unlockAudio();          // 🔓 unlock audio
  playClick();

  type(
    document.getElementById("introText"),
    introText,
    () => document.getElementById("introNext").classList.remove("hidden")
  );

  if (bgMusic && bgMusic.paused) {
    bgMusic.volume = 0.35;
    bgMusic.play().catch(() => {});
  }
}

/* ================= PAGE 2 FLIP CARDS ================= */
function flip(card, i) {
  unlockAudio();          // 🔓 unlock audio
  if (card.classList.contains("flipped")) return;

  playClick();
  card.classList.add("flipped");

  const textEl = card.querySelector(".type");
  type(textEl, cardTexts[i], () => {
    openedCards++;
    if (openedCards === 3) {
      document.getElementById("unlock").classList.remove("hidden");
    }
  });
}

/* ================= PAGE 3 MEMORY FLIPS ================= */
function flipMemory(card, index) {
  unlockAudio();          // 🔓 unlock audio
  if (card.classList.contains("flipped")) return;

  playFlipSound();        // 🔊 sound per photo
  card.classList.add("flipped");
  memoryOpened++;

  const percent = (memoryOpened / totalMemories) * 100;
  document.getElementById("memoriesBar").style.width = percent + "%";
  document.getElementById("memoriesText").innerText =
    `${memoryOpened} / ${totalMemories} completed`;

  if (memoryOpened === totalMemories) {
    document.getElementById("memoryNext").classList.remove("hidden");
  }
}

/* ================= FINAL WISH ================= */
function openWish() {
  unlockAudio();          // 🔓 unlock audio
  playClick();

  type(
    document.getElementById("wishText"),
    wishText,
    () => document.getElementById("wishNext").classList.remove("hidden")
  );
}

/* ================= COUNTDOWN ================= */
const target = new Date("January 1, 2026 00:00:00").getTime();

setInterval(() => {
  const now = Date.now();
  const diff = target - now;
  if (diff <= 0) return;

  const h = Math.floor(diff / (1000 * 60 * 60));
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  const el = document.getElementById("countdown");
  if (el) el.innerText = `${h}h ${m}m ${s}s`;
}, 1000);

/* ================= FLOATING HEARTS ================= */
setInterval(() => {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = Math.random() > 0.5 ? "💖" : "🎈";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 4 + Math.random() * 3 + "s";
  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 7000);
}, 650);
