document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const overlay = document.getElementById("overlay");
    const closeMenu = document.getElementById("close-menu");

    // Open menu
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.remove("-translate-x-full");
      overlay.classList.remove("hidden");
    });

    // Close menu
    closeMenu.addEventListener("click", () => {
      mobileMenu.classList.add("-translate-x-full");
      overlay.classList.add("hidden");
    });

    // Close menu when clicking outside
    overlay.addEventListener("click", () => {
      mobileMenu.classList.add("-translate-x-full");
      overlay.classList.add("hidden");
    }); 
});