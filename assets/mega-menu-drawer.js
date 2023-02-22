const target_level = document.querySelectorAll('.mega-menu__list--condensed .mega-menu__link--level-2');
console.log(target_level)
target_level.forEach((el) => {
  el.addEventListener('click',(e) => {
    e.preventDefault();
    console.log('it clicked!')
  })
})  