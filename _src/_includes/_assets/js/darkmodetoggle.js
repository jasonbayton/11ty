var toggle = document.getElementById("darktoggle");
  toggle.onclick = function() {
    var currentTheme = document.documentElement.getAttribute("data-theme");
    var targetTheme = "light";
    if (currentTheme === "light") {
      targetTheme = "dark";
    }

  document.documentElement.setAttribute('data-theme', targetTheme)
  localStorage.setItem('theme', targetTheme);
};

const clearStorageButton = document.getElementById('clear-storage');

clearStorageButton.addEventListener('click', () => {
  localStorage.clear();
  location.reload();
});