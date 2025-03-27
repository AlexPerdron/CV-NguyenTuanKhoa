document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('dark-mode-toggle');
  const body = document.body;
  const nav = document.querySelector('nav');
  const main = document.querySelector('main');
  const paragraphs = document.querySelectorAll('p');
  const custom = document.getElementsByClassName('custom');

  // Function to apply dark mode styles
  function applyDarkMode(isDark) {
    if (isDark) {
      body.classList.add('bg-gray-900', 'text-gray-100');
      nav.classList.add('bg-gray-800', 'text-white');
      main.classList.add('bg-gray-800', 'text-white');
      paragraphs.forEach((p) => p.classList.add('text-white'));
      toggleButton.classList.add('bg-gray-700', 'text-white', 'hover:bg-gray-600');
      toggleButton.classList.remove('bg-white', 'text-black' , 'hover:bg-gray-200');
      toggleButton.textContent = '☀️ Light Mode';
      localStorage.setItem('dark-mode', 'enabled');
      if (custom) {
        for (let i = 0; i < custom.length; i++) {
          custom[i].classList.add('bg-gray-700', 'text-white', 'hover:bg-gray-600');
        }
      }
    } else {
      body.classList.remove('bg-gray-900', 'text-gray-100');
      nav.classList.remove('bg-gray-800', 'text-white');
      main.classList.remove('bg-gray-800', 'text-white');
      paragraphs.forEach((p) => p.classList.remove('text-white'));
      toggleButton.classList.remove('bg-gray-700', 'text-white', 'hover:bg-gray-600');
      toggleButton.classList.add('bg-white', 'text-black', 'hover:bg-gray-200');  
      toggleButton.textContent = '🌙 Dark Mode';
      localStorage.setItem('dark-mode', 'disabled');
      if (custom) {
        for (let i = 0; i < custom.length; i++) {
          custom[i].classList.remove('bg-gray-700', 'text-white', 'hover:bg-gray-600');
        }
      }
    }
  }

  // Check local storage and apply saved theme
  const darkModeEnabled = localStorage.getItem('dark-mode') === 'enabled';
  applyDarkMode(darkModeEnabled);

  // Toggle mode when button is clicked
  toggleButton.addEventListener('click', () => {
    const isDarkMode = !body.classList.contains("bg-gray-900");
    applyDarkMode(isDarkMode);
    console.log(`Dark mode is now ${isDarkMode ? 'enabled' : 'disabled'}`);
  });
});