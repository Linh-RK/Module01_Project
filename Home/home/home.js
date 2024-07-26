let currentSlide = 0;
const listSlides = document.getElementsByClassName("mySlides");
const nameUser = document.querySelector(".name-user");
const userLogin = JSON.parse(localStorage.getItem("userLogin"));
// DISPLAY USER NAME ON TOP---------------
nameUser.innerHTML = `${userLogin.userName}`;
// SLIDE SHOW------------------------------
setInterval(function () {
  if (currentSlide == listSlides.length - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  for (let i = 0; i < listSlides.length; i++) {
    if (currentSlide == i) {
      listSlides[i].style.display = "block";
    } else {
      listSlides[i].style.display = "none";
    }
  }
}, 2000);
// RENDER PRODUCT------------------------------
const categoriesList = JSON.parse(localStorage.getItem("categoriesList"));
const grid = document.querySelector(".grid");
const product = document.querySelector(".product1");
let cate;
for (let i = 0; i < categoriesList.length; i++) {
  //   let stringAll;
  cate = categoriesList[i];
  function render(cate) {
    let dbProductList = JSON.parse(localStorage.getItem("dbProductList"));
    dbProductList = dbProductList.filter((e) => e.categories == cate.category);

    for (let j = 0; j < dbProductList.length; j++) {
      grid.innerHTML += `
              <div class="product1">             
                  <div class="product-img">
                      <a href=""><img src="${dbProductList[j].img}" alt="" /></a>
                  </div>
                  <div class="product-title">
                      <a href="">
                          <h5>${dbProductList[j].name}</h5>
                      </a>
                  </div>
                  <div class="product-price">
                      <div class="price">${dbProductList[j].price}</div>
                      <div class="cart">
                      <button><i class="fa-solid fa-cart-plus"></i></button>
                  </div>
              </div>
                  `;
    }
    // grid.innerHTML = stringHTML;
  }
  render(cate);
}

/* ${dbProductList[j].price}


id: 32,
//     name: "BÁNH SU DAI KEM PHOMAI",
//     img: "./img/mini-4.jpeg",
//     categories: "MINI",
//     price: "13,000đ",
//     stock: 10,
//     status: "On stock",
//     description: `
//     -Bột mì, trứng, dầu ăn, kem cheese
//   `, */
