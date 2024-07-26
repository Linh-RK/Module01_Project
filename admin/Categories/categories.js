// const categoriesList = [
//   {
//     id: 1,
//     category: "Gateaux Kem Tươi",
//   },
//   {
//     id: 2,
//     category: "Gateaux Kem Bơ",
//   },
//   {
//     id: 3,
//     category: "Bánh Sinh Nhật 2024",
//   },
//   {
//     id: 4,
//     category: "Bánh số",
//   },
//   {
//     id: 5,
//     category: "Bánh mì",
//   },
//   {
//     id: 6,
//     category: "Bánh mặn",
//   },
//   {
//     id: 7,
//     category: "Cookie",
//   },
//   {
//     id: 8,
//     category: "Mini",
//   },
// ];
// localStorage.setItem("categoriesList", JSON.stringify(categoriesList));
// const dbCate = JSON.parse(window.localStorage.getItem("categories")) || [];
// ====================================================================
const addBtn = document.querySelector("#add");
const cancelBtn = document.querySelector("#cancelBtn");
const updateTop = document.querySelector("#updateTop");
const inputNew = document.querySelector("#inputNew");
const sort = document.querySelector("#sort");
const inputSearch = document.querySelector("#input-search");
const searchBtn = document.querySelector(".search-btn");
const updateBtn = document.querySelector(".update-cate");
const deleteBtn = document.querySelector(".delete-cate");
const lineCate = document.querySelector("#lineCate");
const title = document.querySelector(".title");

// console.log(inputSearch.value);
// --------------------------------------------------------------------

function render() {
  let categoriesList = JSON.parse(localStorage.getItem("categoriesList")) || [];
  // ---------------
  categoriesList = categoriesList.filter((e) =>
    e.category.toLowerCase().includes(inputSearch.value.trim().toLowerCase())
  );
  // ----------------
  if (sort.value == "az") {
    categoriesList.sort((a, b) => a.category.localeCompare(b.category));
  } else if(sort.value == "za"){
    categoriesList.sort((a, b) => b.category.localeCompare(a.category));
  } 
  // ----------------
  let stringHTML = "";
  for (let i = 0; i < categoriesList.length; i++) {
    stringHTML += `
    <tr class="add-area">
         <td>${categoriesList[i].id}</td>
         <td id="nameCate">${categoriesList[i].category}</td>
         <td>
         <button id="add" onclick = "updateCate(${categoriesList[i].id})">Sửa</button>
         <button id="cancel" onclick="deleteCate(${categoriesList[i].id})">Xoá</button>
         </td>
        
     </tr>
    `;
  }
  lineCate.innerHTML = stringHTML;
}
render();
// UPDATE----------------------------------------
function updateCate(id) {
  const categoriesList =
    JSON.parse(localStorage.getItem("categoriesList")) || [];
    console.log(categoriesList);
  let index = categoriesList.findIndex((e) => (e.id == id));
  console.log(categoriesList[index]);
  console.log(categoriesList[index].category);
  inputNew.value = categoriesList[index].category;
  updateTop.style.display = "block";
  addBtn.style.display = "none";
  title.innerHTML = "UPDATE CATEGORY";
}
function update(){
  const categoriesList =
    JSON.parse(localStorage.getItem("categoriesList")) || [];
  if(!inputNew.value){
    alert("Không được để trống dữ liệu")
  } else {
    let index = categoriesList.findIndex((e) => (e.category.toLowerCase() = inputNew.value.trim().toLowerCase()));
    if(index !== -1){
      alert(`Đã tồn tại category ${inputNew.value}`)
    } else{
      categoriesList[index].category = inputNew.value.trim();
      localStorage.setItem("categoriesList",JSON.stringify(categoriesList));
      inputNew.value = "";
      updateTop.style.display = "none";
      addBtn.style.display = "block";
      title.innerHTML = "ADD NEW CATEGORY";

      render()
    }
  }
}
// ADD----------------------------------------
function add(){
  const categoriesList =
    JSON.parse(localStorage.getItem("categoriesList")) || [];
    if(!inputNew.value){
      alert("Không được để trống dữ liệu")
    } else {
      let index = categoriesList.findIndex((e) => (e.category.toLowerCase() == inputNew.value.trim().toLowerCase()));
      if(index !== -1){
        alert(`Đã tồn tại category ${inputNew.value}`)
      } else {
        let newCate ={
          id:categoriesList.length +1,
          category: inputNew.value.trim()
        }
        categoriesList.push(newCate)
        localStorage.setItem("categoriesList",JSON.stringify(categoriesList));
        render()
      }
    }  
  }
// CANCEL----------------------------------------
function cancel(){
  inputNew.value = "";
}
// DELETE----------------------------------------
function deleteCate(id){
  const categoriesList =
    JSON.parse(localStorage.getItem("categoriesList")) || [];
    let index = categoriesList.findIndex((e) => e.id == id)
    categoriesList.splice(index,1)
    localStorage.setItem("categoriesList", JSON.stringify(categoriesList));
    render()
}
// ----------------------------------------------
