//menu toggle
const ham = document.getElementById("menu-btn");
          const mobileMenu = document.getElementById("mobile-menu");

          ham.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
          });