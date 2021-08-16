// HAM
let ham = document.querySelector(".ham");
let side = document.querySelector(".side");
ham.addEventListener("click", (e) => {
  ham.classList.toggle("hamActive");
  side.classList.toggle("sideActive");
});

// PARALLAX
// let scenes = document.querySelectorAll(".transparent");

// for (let scene of scenes) {
//   let parallax = new Parallax(scene);
//   parallax.invert(false, false);
//   parallax.scalar(8, 15);
// }

// --------------------- change theme ----------------------------
let btn = document.querySelector(".fa-lightbulb");

let changeMode = () => {
  theme = localStorage.getItem("theme");
  if (theme == "dark") {
    document.body.classList.add("light");
    theme = localStorage.setItem("theme", "light");
  } else {
    document.body.classList.remove("light");
    theme = localStorage.setItem("theme", "dark");
  }
};

btn.addEventListener("click", () => {
  changeMode();
});

let loader = document.querySelector(".loader");
let body = document.body;
let shapes = document.querySelectorAll(".transparent img");

let loaded = () => {
  body.classList.remove("loading");
  loader.classList.add("loaded");
};

let nav = () => {
  let nav = document.querySelector("nav");
  nav.style.transform = "none";
  for (let shape of shapes) {
    shape.style.opacity = "1";
    shape.style.transform = "translate(0)";
  }
};

let theTrans = () => {
  let b = document.querySelector(".hero .btn");
  if (b) b.classList.add("theTrans");
};

let load = () => {
  // loaded();
  nav();
  setTimeout(theTrans, 2);
};

load();

// FOOTER
const title = document.getElementById("titleF");
const cursor = document.getElementById("cursorF");

const typingDelay = 60;
const eraseDelay = 60;
const newTextDelay = 1000;
let textArrayIndex = 0;
let charIndex = 0;

const textArray = [
  "The code even killed the experts",
  "We are the Warriors that built this town",
  "We build cool stuff and pwn at events",
  "Once a warrior, Always a Warrior",
];

let type = () => {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursor.classList.contains("cursorActive"))
      cursor.classList.add("cursorActive");
    title.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursor.classList.remove("cursorActive");
    setTimeout(erase, newTextDelay);
  }
};

let erase = () => {
  if (charIndex > 0) {
    if (!cursor.classList.contains("cursorActive"))
      cursor.classList.add("cursorActive");
    title.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, eraseDelay);
  } else {
    cursor.classList.remove("cursorActive");
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) {
      textArrayIndex = 0;
    }
    setTimeout(type, typingDelay + 1100);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  if (textArray.length) setTimeout(type, 1000);
});
