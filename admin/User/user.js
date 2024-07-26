const listUser = JSON.stringify(localStorage.getItem("listUser"));
const inputSearch = document.querySelector(".input-search");
const searchBtn = document.querySelector("search-btn");
const tbody = document.querySelector(".tbody");
const pageControl = document.querySelector(".page-control");
const page = document.querySelector(".page");
const sort = document.querySelector("#sort");
const userDisplay = document.querySelector(".userDisplay");
// const  = document.querySelector("")
// const  = document.querySelector("")
// const  = document.querySelector("")
// const  = document.querySelector("")
// const  = document.querySelector("")
// const  = document.querySelector("")
let totalPage = 1;
let pageSize = 5;
let currentPage = 1;

// console.log(account);
// if (!account) {
//   window.location.href = "../../Login/login.html";
// }
// --------------------
function render() {
  let listUser = JSON.parse(localStorage.getItem("listUser"));
  // --------------------
  listUser = listUser.filter(
    (e) => e.userName.includes(inputSearch.value.trim()) == true
  );
  // SORT ABC--------------------
  if (sort.value == "az") {
    listUser.sort((a, b) => a.userName.localeCompare(b.userName));
  } else if (sort.value == "za") {
    listUser.sort((a, b) => b.userName.localeCompare(a.userName));
  }
  // PAGINATION-------------------
  totalPage = Math.ceil(listUser.length / pageSize);
  // --------------------
  let stringPage = "";
  for (let i = 1; i <= totalPage; i++) {
    stringPage += `
    <button onclick="renderPage(${i})">${i}</button>
    `;
  }
  page.innerHTML = stringPage;
  // --------------------
  let skip = (currentPage - 1) * pageSize;
  listUser = listUser.slice(skip, skip + pageSize);
  // --------------------
  let stringHTML = "";
  for (let i = 0; i < listUser.length; i++) {
    stringHTML += `
 <tr>
  <td>${listUser[i].id}</td>
  <td>${listUser[i].userName}</td>
  <td>${listUser[i].email}</td>
  <td>${listUser[i].phone}</td>
  <td class="statusUser" style="color: ${
    listUser[i].status == "on" ? "green" : "red"
  };">${listUser[i].status}</td>
  <td>
    <button 
    onclick="switchStatus(${listUser[i].id})" 
    class="control-status-btn">Ban/Open</button>
  </td>
</tr>
    `;
  }
  tbody.innerHTML = stringHTML;
}
render();
// ---------------------
function search() {
  render();
}
// ---------------------
function renderPage(i) {
  currentPage = i;
  render();
}
// ---------------------
// BAN / OPEN ACC---------------------
function switchStatus(id) {
  let listUser = JSON.parse(localStorage.getItem("listUser"));
  let findIndex = listUser.findIndex((user) => user.id == id);
  if (listUser[findIndex].status == "on") {
    listUser[findIndex].status = "off";
    localStorage.setItem("listUser", JSON.stringify(listUser));
  } else {
    listUser[findIndex].status = "on";
    localStorage.setItem("listUser", JSON.stringify(listUser));
  }
  render();
}
// LOGOUT------------------------------
function logout() {
  localStorage.setItem("adminLogin", []);
  window.location.href = "../../Login/login.html";
}
const logged = document.querySelector(".logged");
const unLog = document.querySelector(".un-log");
let account = JSON.parse(localStorage.getItem("adminLogin")) || "";
// if (!account) {
//   unLog.style.display = "block";
//   logged.style.display = "none";
// } else {
//   unLog.style.display = "none";
//   logged.style.display = "block";
userDisplay.innerHTML = account.userName;
// }
