const typingWords = [
  "Full Stack Developer",
  "MERN Stack Developer",
  "Web Application Developer"
];

const typingText = document.getElementById("typing-text");
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;
let erasingDelay = 100;
let nextWordDelay = 1000;

function type() {
  const currentWord = typingWords[wordIndex];

  if (!isDeleting) {
    typingText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(type, nextWordDelay);
    } else {
      setTimeout(type, typingDelay);
    }
  } else {
    typingText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % typingWords.length;
      setTimeout(type, 500);
    } else {
      setTimeout(type, erasingDelay);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (typingWords.length && typingText) {
    type();
  }
});
