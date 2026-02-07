// --------------------
// Cinematic Intro
// --------------------
const cinematicMessages = [
    "Every story begins with a moment...",
    "Mine began when I met you...",
    "Ammulu💗🙈, you changed my world...",
    "This is for you ❤️"
];

let cinematicIndex = 0;

function startCinematic() {
    const text = document.getElementById("cinematicText");

    function showNext() {
        if (cinematicIndex < cinematicMessages.length) {
            text.style.opacity = 0;
            setTimeout(() => {
                text.innerText = cinematicMessages[cinematicIndex];
                text.style.opacity = 1;
                cinematicIndex++;
                setTimeout(showNext, 2500);
            }, 500);
        } else {
            document.getElementById("cinematic").style.display = "none";
            showScreen("welcome");
        }
    }

    showNext();
}

window.onload = startCinematic;

// --------------------
// Music
// --------------------
let musicStarted = false;

function playMusic() {
    if (!musicStarted) {
        document.getElementById("bgMusic").play();
        musicStarted = true;
    }
}

// --------------------
// Screen Control
// --------------------
function showScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

// --------------------
// Slideshow
// --------------------
const photos = [
    "images/photo1.JPG",
    "images/photo2.JPG",
    "images/photo3.JPG",
    "images/photo4.JPG",
    "images/photo5.JPG"
];

let slideIndex = 0;
let slideInterval;

function startMemories() {
    showScreen("memories");

    slideInterval = setInterval(() => {
        slideIndex = (slideIndex + 1) % photos.length;
        document.getElementById("slide").src = photos[slideIndex];
    }, 2000);
}

// --------------------
// Quiz
// --------------------
const quiz = [
    { q: "Who makes your day brighter?", o: ["Sankar", "Sankar", "Obviously Sankar 😄"] },
    { q: "Who cares about you the most?", o: ["Sankar", "Sankar", "No doubt Sankar"] },
    { q: "Ready for something special?", o: ["Yes", "Of course", "Always"] }
];

let qIndex = 0;

function startQuiz() {
    clearInterval(slideInterval);
    showScreen("quiz");
    loadQuestion();
}

function loadQuestion() {
    document.getElementById("question").innerText = quiz[qIndex].q;
    const div = document.getElementById("options");
    div.innerHTML = "";

    quiz[qIndex].o.forEach(opt => {
        const btn = document.createElement("button");
        btn.innerText = opt;
        btn.onclick = nextQuestion;
        div.appendChild(btn);
    });
}

function nextQuestion() {
    qIndex++;
    if (qIndex < quiz.length) loadQuestion();
    else showScreen("proposal");
}

// --------------------
// Proposal Buttons
// --------------------
document.addEventListener("DOMContentLoaded", () => {

    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");

    // YES
    yesBtn.onclick = () => {
        showScreen("success");
        startConfetti();

        document.getElementById("finalMessage").innerText =
            finalMessages[Math.floor(Math.random() * finalMessages.length)];
    };

    // Escaping NO with color + text change
const noTexts = [
    "Are you sure? 😢",
    "Really? 🥺",
    "Think again!",
    "No option 😄",
    "Love is inevitable ❤️"
];

const noColors = [
    "#ff6b6b",
    "#f7b267",
    "#70c1b3",
    "#9b5de5",
    "#ff4d6d",
    "#577590",
    "#f15bb5"
];

let noIndex = 0;

function escapeButton() {
    const card = document.querySelector(".card");
    const rect = card.getBoundingClientRect();

    const maxX = rect.width - noBtn.offsetWidth;
    const maxY = rect.height - noBtn.offsetHeight;

    // Move button
    noBtn.style.position = "absolute";
    noBtn.style.left = Math.random() * maxX + "px";
    noBtn.style.top = Math.random() * maxY + "px";

    // Change text
    noBtn.innerText = noTexts[noIndex % noTexts.length];

    // Change background color
    noBtn.style.background = noColors[noIndex % noColors.length];

    // Optional: slight rotation for fun effect
    noBtn.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;

    noIndex++;
}

noBtn.addEventListener("mouseover", escapeButton);
noBtn.addEventListener("click", escapeButton);

});

// --------------------
// Floating Hearts
// --------------------
function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
}
setInterval(createHeart, 300);

// --------------------
// Confetti (Working)
// --------------------
const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let confetti = [];
let confettiRunning = false;

function createConfetti() {
    confetti = [];
    for (let i = 0; i < 200; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 2,
            d: Math.random() * 50,
            color: `hsl(${Math.random()*360},70%,60%)`
        });
    }
}

function drawConfetti() {
    if (!confettiRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confetti.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        p.y += 3;
        p.x += Math.sin(p.d);

        if (p.y > canvas.height) p.y = -10;
    });

    requestAnimationFrame(drawConfetti);
}

function startConfetti() {
    confettiRunning = true;
    createConfetti();
    drawConfetti();
}

// --------------------
// Final Messages
// --------------------
const finalMessages = [
    "Srimathi💖, you are my happiness, my peace, and my forever. — Ni Srivaru 🥰",
    "Srimathi💖, Every moment with you feels magical. I want forever with you. — Ni Srivaru 🥰",
    "Srimathi💖, You are the most beautiful part of my life. — Ni Srivaru 🥰",
    "Srimathi💖, Life with you is the dream I want to live every day. — Ni Srivaru 🥰",
    "Srimathi💖, From today to forever, my heart belongs only to you. — Ni Srivaru 🥰"
];
