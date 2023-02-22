const target_level = document.querySelectorAll('.mega-menu__list--condensed .mega-menu__link--level-2');
target_level.forEach((el) => {
  el.addEventListener('click',(e) => {
    target_level.forEach((el) => {
      el.nextSibling.style.display = 'none';
    }
    e.preventDefault();
    el.nextSibling.style.display = 'block';
    console.log('it clicked!')
  })
})  