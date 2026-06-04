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
      toggleButton.classList.add(
        'focus:bg-gray-700',
        'text-white',
        'hover:bg-gray-600',
        'bg-gray-700'
      );
      toggleButton.classList.remove(
        'focus:bg-white',
        'text-black',
        'hover:bg-gray-200'
      );
      toggleButton.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-icon lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg> Light Mode';
      localStorage.setItem('dark-mode', 'enabled');
      if (custom) {
        for (let i = 0; i < custom.length; i++) {
          custom[i].classList.add(
            'bg-gray-700',
            'text-white',
            'hover:bg-gray-600'
          );
        }
      }
    } else {
      body.classList.remove('bg-gray-900', 'text-gray-100');
      nav.classList.remove('bg-gray-800', 'text-white');
      main.classList.remove('bg-gray-800', 'text-white');
      paragraphs.forEach((p) => p.classList.remove('text-white'));
      toggleButton.classList.remove(
        'focus:bg-gray-700',
        'text-white',
        'hover:bg-gray-600',
        'bg-gray-700'
      );
      toggleButton.classList.add(
        'focus:bg-white',
        'text-black',
        'hover:bg-gray-200'
      );
      toggleButton.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon-icon lucide-moon"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg> Dark Mode';
      localStorage.setItem('dark-mode', 'disabled');
      if (custom) {
        for (let i = 0; i < custom.length; i++) {
          custom[i].classList.remove(
            'bg-gray-700',
            'text-white',
            'hover:bg-gray-600'
          );
        }
      }
    }
  }

  // Check local storage and apply saved theme
  const darkModeEnabled = localStorage.getItem('dark-mode') === 'enabled';
  applyDarkMode(darkModeEnabled);

  // Toggle mode when button is clicked
  toggleButton.addEventListener('click', () => {
    const isDarkMode = !body.classList.contains('bg-gray-900');
    applyDarkMode(isDarkMode);
    console.log(`Dark mode is now ${isDarkMode ? 'enabled' : 'disabled'}`);
  });
});
