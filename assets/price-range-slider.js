/** price range slider */
const rangeInput = document.querySelectorAll(".range-input input"),
  priceInput = document.querySelectorAll(".facets__price input"),
  range = document.querySelector(".slider .progress"),
  rangeNum = document.querySelector(".slider .range-bar"),
  rangeNumInfo = document.querySelectorAll(".slider .range-bar div");
let priceGap = 10;

priceInput.forEach(input =>{
  input.addEventListener("input", e =>{
      let minPrice = parseInt(priceInput[0].value),
      maxPrice = parseInt(priceInput[1].value);    
      console.log('**** 3 ****')
      if((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max){
          if(e.target.className === "range-min"){
              rangeInput[0].value = minPrice;
              range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
              rangeNum.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
          }else{
              rangeInput[1].value = maxPrice;
              range.style.right = (100 - (maxPrice / rangeInput[1].max) * 100) + "%";
              rangeNum.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
          }
      }
  });
});

rangeInput.forEach(input => {
  let minVal = parseInt(rangeInput[0].value),
  maxVal = parseInt(rangeInput[1].value); 
  /* 값을 입력 후 새로고침, 일처리 */
  if((maxVal - minVal) < priceGap){
    if(input.className === "range-min"){
      rangeInput[0].value = maxVal - priceGap
    }else{
      rangeInput[1].value = minVal + priceGap;
    }
  } else {
    console.log('**** 1 ***** 7')
    priceInput[0].value = minVal;
    priceInput[1].value = maxVal;
    range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
    range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
    rangeNum.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
    rangeNum.style.right = (100 - (maxVal / rangeInput[1].max) * 100) + "%";
  }
});

/* 새로고침은 안하고 손으로 밀었을 때 */ 
rangeInput.forEach(input =>{
  input.addEventListener("input", e => {
    let minVal = parseInt(rangeInput[0].value),
    maxVal = parseInt(rangeInput[1].value);

    console.log('손으로 밀었을 떄')
    
    if((maxVal - minVal) < priceGap){
      if(e.target.className === "range-min"){
          rangeInput[0].value = maxVal - priceGap
      } else {
          rangeInput[1].value = minVal + priceGap;
      }
    } else {
      console.log('**** 2 *****')
      priceInput[0].value = minVal;
      priceInput[1].value = maxVal;
      range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
      range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
      console.log(maxVal, rangeInput[1].max)
      rangeNum.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
      rangeNum.style.right = (100 - (maxVal / rangeInput[1].max) * 100) + "%";
      rangeNumInfo[0].innerText = "£" + minVal;
      rangeNumInfo[1].innerText = "£" + maxVal;
      console.log(priceGap);
    }
  });
})