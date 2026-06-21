import './scss/main.scss';

const submenus = document.querySelectorAll('.submenu');
const submenuLinks = document.querySelectorAll('.submenu a');

document.addEventListener('click', (event) => {
  const target = event.target;

  if (!(target instanceof Element) || target.closest('.submenu')) {
    return;
  }

  submenus.forEach((submenu) => {
    submenu.removeAttribute('open');
  });
});

submenuLinks.forEach((link) => {
  link.addEventListener('click', () => {
    submenus.forEach((submenu) => {
      submenu.removeAttribute('open');
    });
  });
});
