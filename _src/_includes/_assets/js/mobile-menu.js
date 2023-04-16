const cornerMenu = document.getElementById('corner_menu');
const menuModal = document.getElementById('menu_modal');

cornerMenu.addEventListener('click', () => {
  menuModal.classList.add('visible');
});

menuModal.addEventListener('click', () => {
  menuModal.classList.remove('visible');
});
