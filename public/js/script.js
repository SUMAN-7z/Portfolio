// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

//this is for index.ejs Start

document.addEventListener("DOMContentLoaded", () => {
  // Define animation configurations for different elements
  const animations = [
    {
      selector: ".popup-section",
      animateClass: "popup-animate",
      threshold: 0.4,
    },
    {
      selector: ".popup-up-section",
      animateClass: "popup-up-animate",
      threshold: 0.2,
    },
  ];
  // Loop through each animation config
  animations.forEach(({ selector, animateClass, threshold }) => {
    const targets = document.querySelectorAll(selector);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // When element enters view, remove hidden class and add animation class
            entry.target.classList.remove("hidden-popup");
            entry.target.classList.add(animateClass);
            observer.unobserve(entry.target); // Remove to allow re-triggering on scroll
          }
        });
      },
      { threshold: threshold }
    );
    // Add hidden class initially and start observing
    targets.forEach((target) => {
      target.classList.add("hidden-popup");
      observer.observe(target);
    });
  });
});

// Scroll to #Home smoothly when sticky button is clicked
document.querySelector(".sticky-btn").addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector("#Home").scrollIntoView({ behavior: "smooth" });
});

//this is for index.ejs End

//this is for Experiance, Education,project and Certificate .ejs   start
//Scroll Animation Script Overview:

document.addEventListener("DOMContentLoaded", () => {
  const animations = [
    {
      selector: ".popup-section",
      animateClass: "popup-animate",
      threshold: 0.4,
    },
    {
      selector: ".popup-up-section",
      animateClass: "popup-up-animate",
      threshold: 0.2,
    },
  ];

  animations.forEach(({ selector, animateClass, threshold }) => {
    const targets = document.querySelectorAll(selector);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("hidden-popup"); // Show the element
            entry.target.classList.add(animateClass); // Add animation class
            observer.unobserve(entry.target); // Stop observing after animation
          }
        });
      },
      { threshold } // Visibility threshold
    );

    // Hide elements initially and observe them
    targets.forEach((target) => {
      target.classList.add("hidden-popup");
      observer.observe(target);
    });
  });
});

//this is for Experiance, Education,project and Certificate .ejs   End

/* === Fullscreen Preloader javascript start=== */
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  preloader.classList.add("hidden");
  setTimeout(() => {
    preloader.style.display = "none";
  }, 800);
});
/* === Fullscreen Preloader java script end=== */

//  If user scrolled more than 100px — show the "Back to Top" button start

  // 🪄 Smooth scroll to top
  document.getElementById("backToTop").addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // 🎢 Toggle visibility when scrolling
  window.addEventListener("scroll", () => {
    const button = document.getElementById("backToTop");
    if (window.scrollY > 250) {
      button.classList.add("show");
    } else {
      button.classList.remove("show");
    }
  });
//  If user scrolled more than 100px — show the "Back to Top" button End
