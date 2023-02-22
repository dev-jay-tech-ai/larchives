const target_level = document.querySelectorAll('.mega-menu__list--condensed .mega-menu__link--level-2');
target_level.forEach((el) => {
  el.addEventListener('click',(e) => {
    e.preventDefault();
    target_level.forEach((ele) => {
      console.log(ele.nextSibling)
    })
    el.nextSibling.style.display = 'block';
    console.log('it clicked!')
  })
})  