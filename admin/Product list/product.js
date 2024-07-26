// //
const addBtn = document.querySelector(".add");
const form = document.querySelector(".add-form");
const addInForm = document.querySelector("#addp-btn");
let cancelInForm = document.querySelector("#cancel-btn");
let sortCate = document.getElementById("select-cate");
const updateProductBtn = document.getElementById("update-product-btn");
const tbody = document.querySelector("#product-list-tbody");
// const currentPage = JSON.parse(localStorage.getItem("current-page")) || 1;
const formTitle = document.querySelector(".form-title");
// const updateBtn = document.querySelector("update-btn");
const inputName = document.getElementById("name-product-add");
const inputImage = document.getElementById("img-product-add");
const imageProduct = document.getElementById("image-product");
// const inputCategory = document.getElementById("categories-product-add");
const inputPrice = document.getElementById("price-product-add");
const inputStock = document.getElementById("stock-product-add");
const inputDescription = document.getElementById("description-product-add");
const inputSearch = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const selectCategory = document.querySelector("#select-categories");
// console.log(selectCategory);
//

// ---------------------------------------------------------------------------------
const pageControl = document.querySelector(".page");

let totalPage = 1;
let pageSize = 5;
let currentPage = 1;

function render() {
  let dbProductList =
    JSON.parse(window.localStorage.getItem("dbProductList")) || [];

  console.log(dbProductList);
  // -----------------
  dbProductList = dbProductList.filter((e) =>
    e.name.toLowerCase().includes(inputSearch.value.toLowerCase())
  );
  // -----------------
  if (sortCate.value) {
    dbProductList = dbProductList.filter((e) => e.categories == sortCate.value);
  }

  // -----------------
  totalPage = Math.ceil(dbProductList.length / pageSize);
  // -----------------
  let stringHTML = "";
  for (let i = 1; i <= totalPage; i++) {
    stringHTML += `
    <button
      class="pagination"
      onclick="renderProductPage(${i})"
    >
    ${i}
    </button>
    `;
  }
  pageControl.innerHTML = stringHTML;

  let skip = (currentPage - 1) * pageSize;
  dbProductList = dbProductList.slice(skip, skip + pageSize);

  let stringProductHTML = "";
  for (let i = 0; i < dbProductList.length; i++) {
    stringProductHTML += `
      <tr>
        <td>${dbProductList[i].id}</td>
        <td class="td-product-name">${dbProductList[i].name}</td>
        <td class="pic">
          <img src="${dbProductList[i].img}" alt="" />
        </td>
        <td>${dbProductList[i].categories}</td>
        <td>${dbProductList[i].price}</td>
        <td>${dbProductList[i].stock}</td>
        <td>${dbProductList[i].status}</td>
        <td class="btn-action">
          <button id="update-product-btn" onclick="updateProduct(${dbProductList[i].id})">Update</button>
          <button id="delete-product-btn" onclick="deleteProduct(${dbProductList[i].id})">Delete</button>
        </td>
      </tr>
      <tr >
      <td colspan="8"><hr></td>
      </tr>
    `;
  }

  tbody.innerHTML = stringProductHTML;
}
render();

function renderProductPage(i) {
  currentPage = i;
  localStorage.setItem("currentPageProduct", JSON.stringify(currentPage));
  render();
}
// search===============
function search() {
  render();
}
// //FUNCTION CANCEL FORM
cancelInForm.addEventListener("click", function () {
  form.style.display = "none";
});
// 5_DELETE===========================
function deleteProduct(id) {
  const dbProductList =
    JSON.parse(window.localStorage.getItem("dbProductList")) || [];
  let findIndex = dbProductList.findIndex((cate) => cate.id == id);
  dbProductList.splice(findIndex, 1);
  window.localStorage.setItem("dbProductList", JSON.stringify(dbProductList));
  render();
}
// // 6. UPDATE=============================

// CLICK ADD BUTTON IN TABLE DISPLAY FORM
function updateProduct(id) {
  form.style.display = "block";
  formTitle.innerHTML = "UPDATE PRODUCT";
  addInForm.style.display = "none";
  updateProductBtn.style.display = "block";
  const dbProductList =
    JSON.parse(window.localStorage.getItem("dbProductList")) || [];
  // ----------------------
  selectCateDisplay();
  // ----------------------
  let findIndex = dbProductList.findIndex((cate) => cate.id == id);
  inputName.value = dbProductList[findIndex].name;
  imageProduct.src = dbProductList[findIndex].img;
  selectCategory.value = dbProductList[findIndex].categories;
  inputPrice.value = dbProductList[findIndex].price;
  inputStock.value = +dbProductList[findIndex].stock;
  inputDescription.value = dbProductList[findIndex].description;
}
// AFTER UPDATE INPUT VALUE IN FORM,
// CLICK UPDATE BUTTON TO UPDATE
function updateProductForm() {
  // check input value is blank or not
  const dbProductList =
    JSON.parse(window.localStorage.getItem("dbProductList")) || [];
  let findIndex = dbProductList.findIndex(
    (cate) => cate.name.toLowerCase() == inputName.value.toLowerCase()
  );
  if (
    inputName.value == "" ||
    imageProduct.src == "" ||
    selectCategory.value == "" ||
    inputPrice.value == "" ||
    inputStock.value == "" ||
    inputDescription.value == ""
  ) {
    alert("Vui lòng không bỏ trống dữ liệu");
  } else if (!findIndex == -1) {
    alert("Trùng tên sản phẩm");
  }
  dbProductList[findIndex].name = inputName.value;
  dbProductList[findIndex].img = imageProduct.src;
  [];
  dbProductList[findIndex].categories = selectCategory.value;
  dbProductList[findIndex].price = inputPrice.value;
  dbProductList[findIndex].stock = +inputStock.value;
  dbProductList[findIndex].description = inputDescription.value;
  window.localStorage.setItem("dbProductList", JSON.stringify(dbProductList));
  form.style.display = "none";
  formTitle.innerHTML = "CREATE NEW PRODUCT";
  addInForm.style.display = "block";
  updateProductBtn.style.display = "none";
  const currentPage = JSON.parse(window.localStorage.getItem("currentPage"));
  renderProductPage(currentPage);
}
// ADD NEW-------------------------------------------------
let url;
let pic = document.getElementById("image-product");
inputImage.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onloadend = function () {
    document.getElementById("img-product-add").src = reader.result;
    url = reader.result;
    pic.src = reader.result;
  };
  reader.readAsDataURL(file);
});
// -------------------------------------------------
function addProduct() {
  form.style.display = "block";
  selectCateDisplay();
}
function addProductForm() {
  const dbProductList =
    JSON.parse(window.localStorage.getItem("dbProductList")) || [];
  console.log(dbProductList);
  //   VALIDATE DU LIEU bi sai cho nay

  //   TAO OBJECT MOI
  const newProduct = {
    id: dbProductList.length + 1,
    name: document.getElementById("name-product-add").value,
    img: url,
    // img: document.getElementById("img-product-add").value,
    categories: document.getElementById("select-categories").value,
    price: document.getElementById("price-product-add").value,
    stock: document.getElementById("stock-product-add").value,
    status: "On Stock",
    description: `
                ${document.getElementById("description-product-add").value}
              `,
  };
  let findIndex = dbProductList.findIndex(
    (cate) =>
      cate.name.toLowerCase() ==
      document.getElementById("name-product-add").value.toLowerCase()
  );
  if (
    document.getElementById("name-product-add").value == "" ||
    document.getElementById("img-product-add").value == "" ||
    document.getElementById("select-categories").value == "" ||
    document.getElementById("price-product-add").value == "" ||
    document.getElementById("stock-product-add").value == "" ||
    document.getElementById("description-product-add").value == ""
  ) {
    alert("Vui lòng không bỏ trống dữ liệu");
  } else if (!findIndex == -1) {
    alert("Trùng tên sản phẩm");
  }
  // CHEN VAO MANG dbProductList
  dbProductList.push(newProduct);
  window.localStorage.setItem("dbProductList", JSON.stringify(dbProductList));
  form.style.display = "none";
  render();
}
// selectCate------------------------------------
function selectCateDisplay() {
  let categoriesList = JSON.parse(localStorage.getItem("categoriesList"));
  console.log(categoriesList);
  let stringHTML;
  for (let i = 0; i < categoriesList.length; i++) {
    stringHTML += `
    <option value="${categoriesList[i].category}">${categoriesList[i].category}</option>
    `;
  }
  selectCategory.innerHTML = stringHTML;
}
