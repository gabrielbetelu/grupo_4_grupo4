const menuIcon = document.querySelector('#logo-burguer');
const menuContent = document.querySelector('.desplegable');

menuIcon.addEventListener('click', () => {
    console.log(menuContent.style)
  menuContent.style.right = (menuContent.style.right == '-500px') ? '0' : '-500px';
});