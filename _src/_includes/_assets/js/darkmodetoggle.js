var toggle = document.getElementById("darktoggle");
toggle.onclick = function() {
  var currentTheme = document.documentElement.getAttribute("data-theme");
  var targetTheme = currentTheme === "light" ? "dark" : "light";

  // We assume .js-theme-applied is already present after page load, but now transitions will be allowed
  document.documentElement.setAttribute('data-theme', targetTheme);
  localStorage.setItem('theme', targetTheme);
};

const clearStorageButton = document.getElementById('clear-storage');

clearStorageButton.addEventListener('click', () => {
  localStorage.clear();
  location.reload();
});