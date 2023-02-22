const target_level = document.querySelectorAll('.mega-menu__list--condensed .mega-menu__link--level-2');
target_level.forEach((el) => {
  el.addEventListener('click',(e) => {
    e.preventDefault();
    ele.prentNodes.querySelectorAll('.list-unstyled').forEach((ele) => {
      console.log(ele)
    })
    el.nextSibling.style.display = 'block';
    console.log('it clicked!')
  })
})  