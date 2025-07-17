//menu-toggle
 const ham = document.getElementById("menu-btn");
          const mobileMenu = document.getElementById("mobile-menu");

          ham.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
          });

// geolocation
 document.getElementById("getloc").addEventListener("click", () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            document.getElementById("google-map").src =
              `https://maps.google.com/maps?q=${lat},${long}&z=15&output=embed`;
          });
        } else {
          alert("Geolocation is not supported by this browser.");
        }
      });

// on form submit to display the name and coffee
 document.getElementById("coffee-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const coffee = document.getElementById("coffee").value;
        localStorage.setItem("name", name);
        localStorage.setItem("coffee", coffee);
        document.getElementById("form-msg").classList.remove("hidden");
        document.getElementById("form-msg").textContent = `Hello, ${localStorage.getItem("name")}! You Love ${localStorage.getItem("coffee")}!}.`;
      });