// const dbproductList =
//   localStorage.setItem("dbproductList", JSON.stringify(dbproductList)) || [];

const addBtn = document.querySelector(".add");
// display cái form ra
const form = document.querySelector(".add-form");
const addInForm = document.querySelector("#addp-btn");
// console.log(addInForm);
let cancelInForm = document.querySelector("#cancel-btn");
let sortCate = document.getElementById("select-cate");
const updateProductBtn = document.getElementById("update-product-btn");
const tbody = document.querySelector("#product-list-tbody");
const currentPage = JSON.parse(localStorage.getItem("current-page")) || 1;
const formTitle = document.querySelector(".form-title");
const updateBtn = document.querySelector("update-btn");
const inputName = document.getElementById("name-product-add");
const inputImage = document.getElementById("img-product-add");
const inputCategory = document.getElementById("categories-product-add");
const inputPrice = document.getElementById("price-product-add");
const inputStock = document.getElementById("stock-product-add");
const inputDescription = document.getElementById("description-product-add");

renderPage();
renderProductPage(currentPage);
// let currentPage = localStorage.getItem("currentPage");

// ==================================================
// renderProductEachPage();
// function renderProductList() {
//   let dbproductList =
// JSON.parse(window.localStorage.getItem("dbproductList")) || [];
//   console.log(dbproductList);
//   let currentPage = 1;
//   let totalPage = Math.ceil(dbproductList.length / 5);
//   let skip = (currentPage - 1) * 5;
//   dbproductList = dbproductList.slice(skip, skip + 5);
//   const pageControl = document.querySelector(".page");
//   for (let i = 1; i <= i + 5; i++) {
//     pageControl.innerHTML += `
// <button class="pagination" id="${i}">${i}</button>
// `;
//   }
//   Filter
//   if (!sortCate.value == "All") {
//     dbproductList = dbproductList.filter(
//       (e) => e.categories.toLowerCase() == sortCate.value.toLowerCase()
//     );
//   }
//   let stringHTML = "";
//   for (let i = 0; i < dbproductList.length; i++) {
//     stringHTML += `
// <tr>
//     <td>${dbproductList[i].id}</td>
//      <td>${dbproductList[i].name}</td>
//     <td class="pic">
//       <img src="${dbproductList[i].img}" alt="" />
//     </td>
//     <td>${dbproductList[i].categories}</td>
//     <td>${dbproductList[i].price}</td>
//     <td>${dbproductList[i].stock}</td>
//     <td>${dbproductList[i].status}</td>
//     <td class="btn-action">
//       <button id="update-product-btn" onclick="updateProduct(${dbproductList[i].id})">Update</button>
//       <button id="delete-product-btn" onclick="deleteProduct(${dbproductList[i].id})">Delete</button>
//     </td>
// </tr>
// <tr>
// <td colspan="8"><hr></td>
// </tr>
// `;
//   }
//   tbody.innerHTML = stringHTML;
// }
// renderProductList();
// ==================THEM SUA XOA SAN PHAM BANG ADD-FORM============================

// window.getComputedStyle(sqr[0]).backgroundColor;
//
// =====================PHÂN TRANG=========================

// RENDER PAGE [1,2,3,4,5,6,7]===============

function renderPage() {
  let dbproductList =
    JSON.parse(window.localStorage.getItem("dbProductList")) || [];
  let totalPage = Math.ceil(dbproductList.length / 5);
  const pageControl = document.querySelector(".page");
  let stringHTML = "";
  let page = [];
  for (let i = 0; i < totalPage; i++) {
    page.push(i + 1);
  }
  for (let i = 0; i < page.length; i++) {
    stringHTML += `
  <button
    class="pagination"
    id="${page[i]}"
    onclick="renderProductPage(${page[i]})"
  >
  ${page[i]}
  </button>
  `;
  }
  pageControl.innerHTML = stringHTML;
}

// RENDER PRODUCT IN EACH PAGE=================

function renderProductPage(currentPage) {
  window.localStorage.setItem("currentPage", JSON.stringify(currentPage));
  let dbproductList =
    JSON.parse(window.localStorage.getItem("dbProductList")) || [];
  // ===================
  //   Filter
  // if (!sortCate.value == "All") {
  //   dbproductList = dbproductList.filter(
  //     (e) => e.categories.toLowerCase() == sortCate.value.toLowerCase()
  //   );
  // }

  // ===================
  let skip = (currentPage - 1) * 5;

  dbproductList = dbproductList.slice(skip, skip + 5);

  let stringHTML = "";
  for (let i = 0; i < dbproductList.length; i++) {
    stringHTML += `
<tr>
    <td>${dbproductList[i].id}</td>
     <td class="td-product-name">${dbproductList[i].name}</td>
    <td class="pic">
      <img src="${dbproductList[i].img}" alt="" />
    </td>
    <td>${dbproductList[i].categories}</td>
    <td>${dbproductList[i].price}</td>
    <td>${dbproductList[i].stock}</td>
    <td>${dbproductList[i].status}</td>
    <td class="btn-action">
      <button id="update-product-btn" onclick="updateProduct(${dbproductList[i].id})">Update</button>
      <button id="delete-product-btn" onclick="deleteProduct(${dbproductList[i].id})">Delete</button>
    </td>
</tr>
<tr>
<td colspan="8"><hr></td>
</tr>
`;
  }
  tbody.innerHTML = stringHTML;
}

// 4_ADD FORM=============================================================

// 4.1_ADD BTN===========================
// lấy cái nút ra

addBtn.addEventListener("click", function () {
  form.style.display = "block";
});
//Change anh

//FUNCTION ADD FORM
// CHANGE IMG 64BASE
// const inputImage = document.getElementById("img-product-add");
let url;
inputImage.addEventListener("change", (e) => {
  const file = e.target.files;
  const reader = new FileReader();
  reader.onloadend = function () {
    url = reader.result;
    document.getElementById("img-product-add").src = reader.result;
  };
  reader.readAsDataURL(file);
});
// -------------------------------------------------
function addProduct() {
  const dbproductList =
    JSON.parse(window.localStorage.getItem("dbProductList")) || [];
  console.log(dbproductList);
  //   VALIDATE DU LIEU bi sai cho nay

  //   TAO OBJECT MOI
  const newProduct = {
    id: dbproductList.length + 1,
    name: document.getElementById("name-product-add").value,
    img: url,
    // img: document.getElementById("img-product-add").value,
    categories: document.getElementById("categories-product-add").value,
    price: document.getElementById("price-product-add").value,
    stock: document.getElementById("stock-product-add").value,
    status: "On Stock",
    description: `
                ${document.getElementById("description-product-add").value}
              `,
  };
  let findIndex = dbproductList.findIndex(
    (cate) =>
      cate.name.toLowerCase() ==
      document.getElementById("name-product-add").value.toLowerCase()
  );
  if (
    document.getElementById("name-product-add").value == "" ||
    document.getElementById("img-product-add").value == "" ||
    document.getElementById("categories-product-add") == "" ||
    document.getElementById("price-product-add") == "" ||
    document.getElementById("stock-product-add").value == "" ||
    document.getElementById("description-product-add").value == ""
  ) {
    alert("Vui lòng không bỏ trống dữ liệu");
  } else if (!findIndex == -1) {
    alert("Trùng tên sản phẩm");
  }
  // CHEN VAO MANG dbProductList
  dbproductList.push(newProduct);
  window.localStorage.setItem("dbProductList", JSON.stringify(dbproductList));
  form.style.display = "none";
  selectPage();
}
// 4.2CANCEL BTN===========================
//FUNCTION CANCEL FORM
cancelInForm.addEventListener("click", function () {
  form.style.display = "none";
});

// 1_SEARCH BTN===========================
const inputSearch = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
function search() {
  const dbproductList =
    JSON.parse(window.localStorage.getItem("dbProductList")) || [];
  if (inputSearch.value == "") {
    alert("Mời bạn nhập thông tin cần tìm");
  } else {
    dbproductList = dbproductList.filter((e) =>
      e.name.toLowerCase().include(inputSearch.value.toLowerCase())
    );
    let stringHTML = "";
    for (let i = 0; i < dbproductList.length; i++) {
      stringHTML += `
<tr>
    <td>${dbproductList[i].id}</td>
     <td>${dbproductList[i].name}</td>
    <td class="pic">
      <img src="${dbproductList[i].img}" alt="" />
    </td>
    <td>${dbproductList[i].categories}</td>
    <td>${dbproductList[i].price}</td>
    <td>${dbproductList[i].stock}</td>
    <td>${dbproductList[i].status}</td>
    <td class="btn-action">
      <button id="update-product-btn" onclick="updateProduct(${dbproductList[i].id})">Update</button>
      <button id="delete-product-btn" onclick="deleteProduct(${dbproductList[i].id})">Delete</button>
    </td>
</tr>
<tr>
<td colspan="8"><hr></td>
</tr>
`;
    }
    tbody.innerHTML = stringHTML;
  }
}
// renderProductPage();

// search();
// 2_FILTER===========================
// SORT===========================
sortCate.addEventListener("change", function () {
  console.log(sortCate.value.toLowerCase());
  renderProductPage();
});
// 3_SEE ALL===========================
// function seeAll() {
//   const dbproductList =
//     JSON.parse(window.localStorage.getItem("dbproductList")) || [];
//   sortCate.value = "";
//   selectPage();
// }
// 5_DELETE===========================
function deleteProduct(id) {
  const dbproductList =
    JSON.parse(window.localStorage.getItem("dbProductList")) || [];
  let findIndex = dbproductList.findIndex((cate) => cate.id == id);
  dbproductList.splice(findIndex, 1);
  window.localStorage.setItem("dbProductList", JSON.stringify(dbroductList));
  renderProductPage();
}
// 6. UPDATE=============================

// CLICK ADD BUTTON IN TABLE DISPLAY FORM
function updateProduct(id) {
  form.style.display = "block";
  formTitle.innerHTML = "UPDATE PRODUCT";
  addInForm.style.display = "none";
  updateProductBtn.style.display = "block";
  const dbproductList =
    JSON.parse(window.localStorage.getItem("dbProductList")) || [];
  let findIndex = dbproductList.findIndex((cate) => cate.id == id);
  inputName.value = dbproductList[findIndex].name;
  inputImage.value = dbproductList[findIndex].img;
  inputCategory.value = dbproductList[findIndex].categories;
  inputPrice.value = dbproductList[findIndex].price;
  inputStock.value = dbproductList[findIndex].stock;
  inputDescription.value = dbproductList[findIndex].description;
}
// AFTER UPDATE INPUT VALUE IN FORM,
// CLICK UPDATE BUTTON TO UPDATE
function updateProductForm() {
  // check input value is blank or not
  const dbproductList =
    JSON.parse(window.localStorage.getItem("dbProductList")) || [];
  let findIndex = dbproductList.findIndex(
    (cate) => cate.name.toLowerCase() == inputName.value.toLowerCase()
  );
  if (
    inputName.value == "" ||
    inputImage.value == "" ||
    inputCategory.value == "" ||
    inputPrice.value == "" ||
    inputStock.value == "" ||
    inputDescription.value == ""
  ) {
    alert("Vui lòng không bỏ trống dữ liệu");
  } else if (!findIndex == -1) {
    alert("Trùng tên sản phẩm");
  }
  // else {
  dbproductList[findIndex].name = inputName.value;
  // if (!inputImage.value) {
  dbproductList[findIndex].img = inputImage.value;
  // }
  dbproductList[findIndex].categories = inputCategory.value;
  dbproductList[findIndex].price = inputPrice.value;
  dbproductList[findIndex].stock = inputStock.value;
  dbproductList[findIndex].description = inputDescription.value;
  window.localStorage.setItem("dbProductList", JSON.stringify(dbproductList));
  form.style.display = "none";
  formTitle.innerHTML = "CREATE NEW PRODUCT";
  addInForm.style.display = "block";
  updateBtn.style.display = "none";
  renderProductPage();
}
