const projects = Array.isArray(window.PORTFOLIO_PROJECTS) ? window.PORTFOLIO_PROJECTS : [];
const portfolioSettings = window.PORTFOLIO_SETTINGS || {};
const track = document.querySelector(".work-track");
const dots = document.querySelector(".slider-dots");
const prevButton = document.querySelector(".slider-prev");
const nextButton = document.querySelector(".slider-next");
let activeIndex = 0;
let autoplayTimer;
let dragStartX = null;
let dragging = false;

document.querySelector("#works-label").textContent = portfolioSettings.sectionLabel || "Selected projects";
document.querySelector("#works-title").textContent = portfolioSettings.sectionTitle || "My recent work";
document.querySelector("#works-description").textContent = portfolioSettings.sectionDescription || "A rotating collection of visual design and product work.";

function relativePosition(index) {
  const total = projects.length;
  let difference = index - activeIndex;
  if (difference > total / 2) difference -= total;
  if (difference < -total / 2) difference += total;
  return Math.max(-2, Math.min(2, difference));
}

function updateSlider() {
  document.querySelectorAll(".project-card").forEach((card, index) => {
    const position = relativePosition(index);
    card.dataset.position = String(position);
    card.setAttribute("aria-hidden", position === 0 ? "false" : "true");
    card.tabIndex = position === 0 ? 0 : -1;
  });
  document.querySelectorAll(".slider-dots button").forEach((dot, index) => {
    dot.classList.toggle("active", index === activeIndex);
    dot.setAttribute("aria-current", index === activeIndex ? "true" : "false");
  });
}

function goTo(index) {
  if (!projects.length) return;
  activeIndex = (index + projects.length) % projects.length;
  updateSlider();
  restartAutoplay();
}

function restartAutoplay() {
  window.clearInterval(autoplayTimer);
  autoplayTimer = window.setInterval(() => goTo(activeIndex + 1), 4500);
}

const previewDialog = document.querySelector(".project-dialog");
const previewImage = previewDialog?.querySelector(".dialog-media img");
const previewTitle = previewDialog?.querySelector("#preview-title");
const previewCategory = previewDialog?.querySelector(".preview-category");
const previewDescription = previewDialog?.querySelector(".preview-description");
const previewLink = previewDialog?.querySelector(".preview-link");

function openPreview(index) {
  const project = projects[index];
  if (!project || !previewDialog) return;
  previewImage.src = project.image;
  previewImage.alt = project.alt;
  previewTitle.textContent = project.title;
  previewCategory.textContent = project.category;
  previewDescription.textContent = project.description;
  previewLink.href = project.link;
  previewDialog.showModal();
  window.clearInterval(autoplayTimer);
}

function closePreview() {
  previewDialog?.close();
  restartAutoplay();
}

projects.forEach((project, index) => {
  const card = document.createElement("article");
  card.className = "project-card";
  card.innerHTML = `
    <img src="${project.image}" alt="${project.alt}" />
    <div class="project-meta">
      <div><strong>${project.title}</strong><span>${project.category}</span></div>
      <span class="project-preview">Preview ↗</span>
    </div>`;
  card.addEventListener("click", () => {
    if (dragging) return;
    if (index === activeIndex) openPreview(index);
    else goTo(index);
  });
  card.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") goTo(activeIndex - 1);
    if (event.key === "ArrowRight") goTo(activeIndex + 1);
    if ((event.key === "Enter" || event.key === " ") && index === activeIndex) openPreview(index);
  });
  track.appendChild(card);

  const dot = document.createElement("button");
  dot.type = "button";
  dot.setAttribute("aria-label", `Show ${project.title}`);
  dot.addEventListener("click", () => goTo(index));
  dots.appendChild(dot);
});

prevButton?.addEventListener("click", () => goTo(activeIndex - 1));
nextButton?.addEventListener("click", () => goTo(activeIndex + 1));

track?.addEventListener("pointerdown", event => {
  dragStartX = event.clientX;
  dragging = false;
  track.classList.add("dragging");
  track.setPointerCapture?.(event.pointerId);
  window.clearInterval(autoplayTimer);
});
track?.addEventListener("pointermove", event => {
  if (dragStartX === null) return;
  if (Math.abs(event.clientX - dragStartX) > 8) dragging = true;
});
track?.addEventListener("pointerup", event => {
  if (dragStartX === null) return;
  const distance = event.clientX - dragStartX;
  track.classList.remove("dragging");
  dragStartX = null;
  if (Math.abs(distance) > 55) goTo(activeIndex + (distance < 0 ? 1 : -1));
  else restartAutoplay();
  window.setTimeout(() => { dragging = false; }, 0);
});
track?.addEventListener("pointercancel", () => {
  dragStartX = null;
  dragging = false;
  track.classList.remove("dragging");
  restartAutoplay();
});

previewDialog?.querySelector(".dialog-close")?.addEventListener("click", closePreview);
previewDialog?.addEventListener("click", event => {
  if (event.target === previewDialog) closePreview();
});
previewDialog?.addEventListener("cancel", event => {
  event.preventDefault();
  closePreview();
});
updateSlider();
restartAutoplay();

document.querySelector(".work-stage")?.addEventListener("mouseenter", () => window.clearInterval(autoplayTimer));
document.querySelector(".work-stage")?.addEventListener("mouseleave", restartAutoplay);

const menuButton = document.querySelector(".menu-toggle");
const mainNavigation = document.querySelector("#main-navigation");
menuButton?.addEventListener("click", () => {
  const open = mainNavigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});
mainNavigation?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNavigation.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
}));

document.querySelector("#year").textContent = String(new Date().getFullYear());

const form = document.querySelector(".contact-form");
form?.addEventListener("submit", () => {
  const note = form.querySelector(".form-note");
  note.textContent = "Opening your email app…";
});
