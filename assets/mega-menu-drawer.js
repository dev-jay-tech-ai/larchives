const target_level = document.querySelectorAll('.mega-menu__list--condensed .mega-menu__link--level-2');
target_level.forEach((el) => {
  el.addEventListener('click',(e) => {
    e.preventDefault();
    target_level.forEach((ele) => {
      if(ele.nextSibling) ele.nextSibling.style.display = 'none';
    })
    console.log(el.nextSibling.style.display)
    if(el.nextSibling.style.display !== 'block') el.nextSibling.style.display = 'block';
    else el.nextSibling.style.display = 'none';
  })
})  