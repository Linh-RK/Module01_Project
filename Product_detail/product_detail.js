const subtractBtn = document.querySelector(".subtract-btn");
const addBtn = document.querySelector(".add-btn");
const inputQty = document.querySelector("#input-qty");
console.log(inputQty);
// ----------------
const addCart = document.querySelector(".add-cart-btn");
const buyNow = document.querySelector(".buy-now");
inputQty.value = 1;
// const  = document.querySelector("")
// const  = document.querySelector("")
// const  = document.querySelector("")
// const  = document.querySelector("")
// ---------------
function render() {}
// ---------------
function add() {
  inputQty.value = +inputQty.value + 1;
}
//----------------
function subtract() {
  if (inputQty.value > 1) {
    inputQty.value -= 1;
  } else {
    return;
  }
}
//----------------
// function addToCart() {
//     inputQty.value
// }
// //----------------
// function buyNow() {}
