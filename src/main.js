const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll("[data-nav-link]")];
const contactForm = document.querySelector("#contact-form");
const subjectField = document.querySelector("#subject");
const messageField = document.querySelector("#message");

if (!(contactForm instanceof HTMLFormElement)) {
  throw new Error("Expected contact form");
}

if (!(subjectField instanceof HTMLInputElement)) {
  throw new Error("Expected contact subject field");
}

if (!(messageField instanceof HTMLTextAreaElement)) {
  throw new Error("Expected contact message field");
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const subject = encodeURIComponent(subjectField.value.trim());
  const message = encodeURIComponent(messageField.value.trim());
  window.location.href = `mailto:petros.oratiou@outlook.com?subject=${subject}&body=${message}`;
});

function updateActiveLink() {
  const activeLine = window.innerHeight * 0.32;
  let currentSection = sections[0];

  for (const section of sections) {
    const bounds = section.getBoundingClientRect();
    if (bounds.top <= activeLine) {
      currentSection = section;
    } else {
      break;
    }
  }

  for (const link of navLinks) {
    if (link.dataset.section === currentSection.id) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  }
}

let updateScheduled = false;

function scheduleActiveLinkUpdate() {
  if (updateScheduled) return;

  updateScheduled = true;
  requestAnimationFrame(() => {
    updateActiveLink();
    updateScheduled = false;
  });
}

window.addEventListener("scroll", scheduleActiveLinkUpdate, { passive: true });
window.addEventListener("resize", updateActiveLink);
updateActiveLink();