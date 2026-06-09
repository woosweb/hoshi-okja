const slides = Array.from(document.querySelectorAll(".slide"));
const railLinks = Array.from(document.querySelectorAll(".slide-rail a"));
const controls = Array.from(document.querySelectorAll(".slide-controls button"));

let activeIndex = 0;

function setActiveSlide(index) {
  activeIndex = index;

  railLinks.forEach((link, linkIndex) => {
    link.classList.toggle("is-active", linkIndex === index);
  });

  const currentTheme = slides[index]?.dataset.theme;
  document.body.classList.toggle("is-dark-ui", currentTheme === "dark");
}

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    const index = slides.indexOf(visible.target);
    if (index >= 0) {
      setActiveSlide(index);
    }
  },
  {
    threshold: [0.42, 0.62, 0.82],
  }
);

slides.forEach((slide) => observer.observe(slide));
setActiveSlide(0);

controls.forEach((button) => {
  button.addEventListener("click", () => {
    const direction = Number(button.dataset.direction);
    const nextIndex = Math.min(Math.max(activeIndex + direction, 0), slides.length - 1);
    slides[nextIndex].scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

window.addEventListener("keydown", (event) => {
  const isNext = event.key === "ArrowDown" || event.key === "PageDown";
  const isPrev = event.key === "ArrowUp" || event.key === "PageUp";

  if (!isNext && !isPrev) return;

  event.preventDefault();
  const nextIndex = Math.min(
    Math.max(activeIndex + (isNext ? 1 : -1), 0),
    slides.length - 1
  );
  slides[nextIndex].scrollIntoView({ behavior: "smooth", block: "start" });
});
