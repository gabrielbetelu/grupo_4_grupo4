const menuIcon = document.querySelector('#logo-burguer');
const menuContent = document.querySelector('.desplegable');

menuIcon.addEventListener('click', () => {
    console.log(menuContent.style.zIndex);
//    menuContent.style.display = (menuContent.style.display == 'none') ? 'flex' : 'none';
    menuContent.style.zIndex = (menuContent.style.zIndex == '-1') ? '0' : '-1';
//    menuContent.style.right = (menuContent.style.right == '-500px') ? '0' : '-500px';
    menuContent.style.opacity = (menuContent.style.opacity == '0') ? '.9' : '0';
 
});