const nav = document.querySelector("nav");
const menu = document.querySelector(".menu");
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelectorAll(".nav-link");
const scrollButton = document.querySelector(".scroll-button");
const scrollProgress = document.querySelector(".scroll-progress");
const themeButtons = document.querySelectorAll(".theme-toggle");
const sections = document.querySelectorAll("main section");
const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-zoom");

document.getElementById("year").textContent = new Date().getFullYear();

/* Theme */
const updateThemeIcons = () => {
  const icon = document.body.classList.contains("dark-mode")
    ? "fa-solid fa-sun"
    : "fa-solid fa-moon";

  themeButtons.forEach(button => {
    button.querySelector("i").className = icon;
  });
};

const savedTheme = localStorage.getItem("theme");

if (savedTheme !== "light") {
  document.body.classList.add("dark-mode");
}

updateThemeIcons();

themeButtons.forEach(button => {
  button.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark-mode") ? "dark" : "light"
    );

    updateThemeIcons();
  });
});

/* Mobile menu */
const closeMenu = () => {
  menu.classList.remove("active");
  document.body.classList.remove("menu-open");
  menuBtn.querySelector("i").className = "fa-solid fa-bars";
};

menuBtn.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("active");
  document.body.classList.toggle("menu-open", isOpen);

  menuBtn.querySelector("i").className = isOpen
    ? "fa-solid fa-xmark"
    : "fa-solid fa-bars";
});

navLinks.forEach(link => link.addEventListener("click", closeMenu));

/* Scroll reveal */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    entry.target.classList.add("active");
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12 });

revealElements.forEach(element => revealObserver.observe(element));

/* Active navigation */
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    navLinks.forEach(link => link.classList.remove("active"));

    document
      .querySelector(`.nav-link[href="#${entry.target.id}"]`)
      ?.classList.add("active");
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach(section => sectionObserver.observe(section));

/* Scroll */
const handleScroll = () => {
  const scrollTop = window.scrollY;

  nav.classList.toggle("sticky", scrollTop > 30);
  scrollButton.classList.toggle("show", scrollTop > 500);

  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  scrollProgress.style.width =
    `${scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0}%`;
};

window.addEventListener("scroll", handleScroll, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth > 800) closeMenu();
});

handleScroll();

/* Resume Download Tracking */

const SUPABASE_URL =
  "https://notftzgptyduvsqxzsgq.supabase.co";
const SUPABASE_KEY =
  "sb_publishable_FTeLTKGF0Q3M8XDEuyoB1w_qONkrXRH";
const resumeDownload = document.getElementById("resumeDownload");
if (resumeDownload) {
  resumeDownload.addEventListener("click", () => {
    fetch(`${SUPABASE_URL}/rest/v1/resume_downloads`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    }).catch(error => {
      console.error("Resume tracking failed:", error);
    });
  });
}