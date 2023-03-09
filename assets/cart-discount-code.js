let clearBtn = document.querySelector("#clear-discount-btn");
let discountCodeError = document.querySelector("#discount-code-error");
let discountCodeInput = document.querySelector("#discount-code-input");
let totalCartSelector = document.querySelector(".totals__subtotal-value span.money"); // Total Cart Selector to update the total amount. 
let authorization_token;
  
let checkoutContainer = document.createElement('div');
document.body.appendChild(checkoutContainer);
if (localStorage.discountCode) applyDiscount( JSON.parse(localStorage.discountCode).code);
discountCodeInput.addEventListener("change", function(e){
  e.preventDefault()
  applyDiscount(discountCodeInput.value);
});
// clearBtn.addEventListener("click", function(e){
//   e.preventDefault()
//   clearDiscount();
// });
function clearDiscount() {
  discountCodeError.innerHTML = "";
  clearLocalStorage();
  fetch("/discount/CLEAR");
}

function clearLocalStorage() {
  totalCartSelector.innerHTML = JSON.parse(localStorage.discountCode).totalCart;
  localStorage.removeItem("discountCode");
}

function applyDiscount(code) {
  let discountApplyUrl = "/discount/"+code+"?v="+Date.now()+"&redirect=/checkout/";
  fetch(discountApplyUrl, {}).then(function(response) { return response.text(); })
  .then(function(data) {
    checkoutContainer.innerHTML = data;
    const checkout_json_url = '/wallets/checkouts/';
    authorization_token = checkoutContainer.querySelector('[data-serialized-id="shopify-checkout-api-token"]').getAttribute('data-serialized-value').replace('\\n', '=').replaceAll('"', '');
    fetch('/cart.js', {}).then(function(res){return res.json();})
    .then(function(data){
      let body = {"checkout": {"discount_code": code,"line_items": data.items}}
      fetch(checkout_json_url, {
        "headers": {
          "accept": "*/*", "cache-control": "no-cache",
          "authorization": "Basic " + authorization_token,
          "content-type": "application/json, text/javascript",
          "pragma": "no-cache", "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors", "sec-fetch-site": "same-origin"
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "method": "POST", "mode": "cors", "credentials": "include",
        "body": JSON.stringify(body)
    })
    .then(function(response) { return response.json() })
    .then(function(data) {
      console.log(data);
      if(data.checkout && data.checkout.applied_discounts.length > 0){
        console.log('case1')
        discountCodeError.innerHTML = "";
        discountCodeInput.value = data.checkout.applied_discounts[0].title; 
        let localStorageValue = {
          'code': code.trim(),
          'totalCart': data.checkout.total_line_items_price
        };
        localStorage.setItem("discountCode", JSON.stringify(localStorageValue));
        totalCartSelector.innerHTML = "<s>" + data.checkout.currency_format.symbol + data.checkout.total_line_items_price + "</s>" + " " + data.checkout.currency_format.symbol + data.checkout.total_price;
      } else {
        console.log('case2')
        if(localStorage.getItem("discountCode") !== null) clearLocalStorage();
        discountCodeError.innerHTML = errors.applied_discount.code[0].message;
        // discountCodeError.innerHTML = "Please Enter Valid Coupon Code."
      }
    })
   .catch((err) => {
      console.error(err);
    })
   .finally(function(params) { });
  });
});
}