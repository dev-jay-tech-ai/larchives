const target_level = document.querySelectorAll('.mega-menu__link--level-2');
target_level[0].addEventListener('click',(e) => {
  e.preventDefault();
  console.log('it clicked!')
})