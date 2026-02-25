
const nav = document.querySelector("nav");
const scrollBtn = document.querySelector(".scroll-button a");
const sections = document.querySelectorAll("section");

const body = document.body;
const navBar = document.querySelector(".navbar");
const menuBtn = document.querySelector(".menu-btn");
const cancelBtn = document.querySelector(".cancel-btn");

const revealElements = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right, .reveal-zoom, .reveal-fade"
);

let currentSection = 0;
let isScrolling = false;


function updateCurrentSection() {
  let scrollPos = window.scrollY;

  sections.forEach((section, index) => {
    if (
      scrollPos >= section.offsetTop - 100 &&
      scrollPos < section.offsetTop + section.offsetHeight - 100
    ) {
      currentSection = index;
    }
  });
}


function resetReveal() {
  revealElements.forEach((el) => {
    el.classList.remove("active");
  });
}


function revealOnScroll() {
  revealElements.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 100;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
}


window.addEventListener("scroll", () => {
  nav.classList.toggle("sticky", document.documentElement.scrollTop > 20);
  scrollBtn.style.display =
    document.documentElement.scrollTop > 20 ? "block" : "none";

  updateCurrentSection();
  revealOnScroll();

  // Reseting when reaching TOP
  if (window.scrollY === 0) {
    resetReveal();
  }

  //Reset when reaching BOTTOM
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 2
  ) {
    resetReveal();
  }
});

// section snp scrl
window.addEventListener("wheel", (e) => {
  if (isScrolling) return;

  updateCurrentSection();

  isScrolling = true;

  if (e.deltaY > 0) {
    currentSection++;
  } else {
    currentSection--;
  }

  currentSection = Math.max(0, Math.min(currentSection, sections.length - 1));

  sections[currentSection].scrollIntoView({
    behavior: "smooth",
  });

  setTimeout(() => {
    isScrolling = false;
  }, 700);
});

// mobile menu 
menuBtn.onclick = () => {
  navBar.classList.add("active");
  body.style.overflow = "hidden";
};

cancelBtn.onclick = () => {
  navBar.classList.remove("active");
  body.style.overflow = "auto";
};