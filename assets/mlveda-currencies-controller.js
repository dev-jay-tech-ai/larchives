
const menu_drawer = document.querySelector('#Details-menu-drawer-container');
const target = document.querySelector('.menu-drawer_top div:last-child');
  
menu_drawer.addEventListener('click',(e) => {
  console.log('hello world')
  target.classList.add("mldDesk");
})
