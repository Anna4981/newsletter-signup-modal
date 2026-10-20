const DELAY_MS = 5000;               // modal appears after 5 seconds
const STORAGE_KEY = "newsletterModalDismissed";

const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");
const form = document.getElementById("signupForm");
const emailInput = document.getElementById("email");
const message = document.getElementById("formMessage");
const resetBtn = document.getElementById("resetBtn");

let lastFocused = null;
let timerId = null;

// localStorage can throw (private mode etc.), so wrap it
function wasDismissed() {
  try { return localStorage.getItem(STORAGE_KEY) === "true"; }
  catch (e) { return false; }
}
function rememberDismissed() {
  try { localStorage.setItem(STORAGE_KEY, "true"); } catch (e) {}
}

function openModal() {
  if (wasDismissed()) return;
  lastFocused = document.activeElement;
  overlay.classList.add("open");
  emailInput.focus();
}

function closeModal() {
  overlay.classList.remove("open");
  rememberDismissed();
  if (lastFocused) lastFocused.focus();
}

// Email format: something@something.tld
function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function showMessage(text, type) {
  message.textContent = text;
  message.className = "message " + type;
}

// Show after delay
if (!wasDismissed()) {
  timerId = setTimeout(openModal, DELAY_MS);
}

// Close: button, overlay click (not clicks inside the modal), Escape
closeBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (!overlay.classList.contains("open")) return;
  if (e.key === "Escape") closeModal();

  // Simple focus trap
  if (e.key === "Tab") {
    const focusables = overlay.querySelectorAll("button, input");
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }
});

// Validate on submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = emailInput.value.trim();

  if (value === "") {
    emailInput.className = "invalid";
    showMessage("Please enter your email address.", "error");
    emailInput.focus();
    return;
  }
  if (!isValidEmail(value)) {
    emailInput.className = "invalid";
    showMessage("That doesn't look like a valid email (e.g. name@example.com).", "error");
    emailInput.focus();
    return;
  }

  emailInput.className = "valid";
  showMessage("Thanks for subscribing! 🎉", "success");
  rememberDismissed();
  form.reset();
  setTimeout(closeModal, 1800);
});

// Clear the error as soon as the user starts fixing it
emailInput.addEventListener("input", () => {
  emailInput.className = "";
  showMessage("", "");
});

// Testing helper
resetBtn.addEventListener("click", () => {
  try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  clearTimeout(timerId);
  timerId = setTimeout(openModal, DELAY_MS);
  alert("Reset! The modal will appear again in 5 seconds.");
});