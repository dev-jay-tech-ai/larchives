const target_level = document.querySelectorAll('.mega-menu__link--level-2.mega-menu__link--active');
console.log(target_level)
target_level[0].addEventListener('click',(e) => {
  e.preventDefault();
  console.log('it clicked!')
})