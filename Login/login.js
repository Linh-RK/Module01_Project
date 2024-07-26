// const listUser = [
//   {
//     id: 1,
//     userName: "linh-linh",
//     email: "pttlinh101193@gmail.com",
//     status: "on",
//     password: "123456",
//     phone: "0369398618",
//     role: true,
//     card: [],
//   },
//   {
//     id: 2,
//     userName: "ngoc-rk",
//     email: "ngoc@gmail.com",
//     status: "on",
//     password: "123456",
//     phone: "0369398618",
//     role: false,
//     card: [],
//   },
//   {
//     id: 3,
//     userName: "huong-rk",
//     email: "huong@gmail.com",
//     status: "on",
//     password: "123456",
//     phone: "0369398618",
//     role: false,
//     card: [],
//   },
//   {
//     id: 4,
//     userName: "hung-rk",
//     email: "hung@gmail.com",
//     status: "on",
//     password: "123456",
//     phone: "0369398618",
//     role: false,
//     card: [],
//   },
//   {
//     id: 5,
//     userName: "yen-rk",
//     email: "yen@gmail.com",
//     status: "on",
//     password: "123456",
//     phone: "0369398618",
//     role: false,
//     card: [],
//   },
//   {
//     id: 6,
//     userName: "huynh-rk",
//     email: "huynh@gmail.com",
//     status: "on",
//     password: "123456",
//     phone: "0369398618",
//     role: false,
//     card: [],
//   },
//   {
//     id: 7,
//     userName: "duong-rk",
//     email: "duong@gmail.com",
//     status: "on",
//     password: "123456",
//     phone: "0369398618",
//     role: false,
//     card: [],
//   },
//   {
//     id: 8,
//     userName: "minh-rk",
//     email: "minh@gmail.com",
//     status: "on",
//     password: "123456",
//     phone: "0369398618",
//     role: false,
//     card: [],
//   },
//   {
//     id: 9,
//     userName: "nghia-rk",
//     email: "nghia@gmail.com",
//     status: "on",
//     password: "123456",
//     phone: "0369398618",
//     role: false,
//     card: [],
//   },
// ];

// const listUser = [];
// window.localStorage.setItem("listUser", JSON.stringify(listUser));
const emailLogIn = document.getElementById("email-login");
const passwordLogIn = document.getElementById("password-login");
const loginBtn = document.getElementById("login");
//
const userNameSignIn = document.getElementById("user-name-sign-in");
const nameSignIn = document.getElementById("name-sign-in");
const passwordSignIn = document.getElementById("password-sign-in");
const confirmPasswordSignIn = document.getElementById(
  "confirm-password-sign-in"
);
const emailSignIn = document.getElementById("email-sign-in");
const phoneSignIn = document.getElementById("phone-sign-in");
const signInBtn = document.getElementById("signIn");
const loginForm = document.querySelector(".login");
const signinForm = document.querySelector(".signin");

// const  = document.getElementById("")
let format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
// userNameSignIn.value;
// nameSignIn.value;
// passwordSignIn.value;
// emailSignIn.value;
// phoneSignIn.value;
// console.log(emailSignIn.value);
// -------------------------

function signInAcc() {
  let listUser = JSON.parse(localStorage.getItem("listUser")) || [];
  console.log(passwordSignIn.value);
  console.log(passwordSignIn.value.length);
  //-----------------
  if (
    !userNameSignIn.value ||
    !userNameSignIn.value ||
    !passwordSignIn.value ||
    !emailSignIn.value ||
    !phoneSignIn.value
  ) {
    alert("Không được bỏ trống dữ liệu");
  } else {
    if (format.test(userNameSignIn.value)) {
      alert("userName không được chứa kí tự đặc biệt");
      window.addEventListener("beforeunload", (event) => {
        event.preventDefault();
        event.returnValue = "";
      });
    } else {
      //-----------------
      let findIndexName = listUser.findIndex(
        (user) => user.userName == userNameSignIn.value
      );
      console.log(findIndexName);
      if (findIndexName !== -1) {
        alert("Username đã tồn tại");
        window.addEventListener("beforeunload", (event) => {
          event.preventDefault();
          event.returnValue = "";
        });
      } else {
        //email-----------------
        let findIndexEmail = listUser.findIndex(
          (user) => user.email == userNameSignIn.value
        );
        console.log(findIndexEmail);
        if (findIndexEmail !== -1) {
          alert("Email đã tồn tại");
          window.addEventListener("beforeunload", (event) => {
            event.preventDefault();
            event.returnValue = "";
          });
        } else {
          //pass-----------------
          console.log(passwordSignIn.value);
          console.log(passwordSignIn.value.length);
          if (passwordSignIn.value.length < 5) {
            alert("Password must be at least 6 character");
          } else {
            //confirm pass-----------------
            if (passwordSignIn.value !== confirmPasswordSignIn.value) {
              alert("Confirm password is incorrect !");
              window.addEventListener("beforeunload", (event) => {
                event.preventDefault();
                event.returnValue = "";
              });
            } else {
              let id = 1;
              if (!listUser) {
                id = listUser.length + 1;
              }
              let newUser = {
                id: id,
                userName: userNameSignIn.value,
                email: emailSignIn.value,
                status: "on",
                password: passwordSignIn.value,
                phone: phoneSignIn.value,
                role: true,
                card: [],
              };

              listUser.push(newUser);
              window.localStorage.setItem("listUser", JSON.stringify(listUser));
            }
          }
        }
      }
    }
  }

  //-----------------
}

// LOGIN------------------------------------
function loginAcc() {
  let listUser = JSON.parse(localStorage.getItem("listUser")) || [];
  //   const emailLogIn = document.getElementById("email-login");
  //   const passwordLogIn = document.getElementById("password-login");
  //   const loginBtn = document.getElementById("login");

  let findIndexEmail = listUser.findIndex(
    (user) => user.email == emailLogIn.value
  );
  if (!emailLogIn.value || !passwordLogIn.value) {
    alert("Must input data");
  } else {
    if (findIndexEmail == -1) {
      alert("Email is incorrect");
    } else {
      if (passwordLogIn.value !== listUser[findIndexEmail].password) {
        alert("Password is incorrect");
      } else {
        // alert("Access success !");
        // --------------------
        if (listUser[findIndexEmail].role == false) {
          localStorage.setItem(
            "userLogin",
            JSON.stringify(listUser[findIndexEmail])
          );
          window.location.href = "../home/home.html";
        } else {
          localStorage.setItem(
            "adminLogin",
            JSON.stringify(listUser[findIndexEmail])
          );
          // localStorage.setItem("loginAdmin", 1);
          window.location.href = "../admin/User/user.html";
        }
      }
    }
  }
}
// -----------
function switchSignIn() {
  loginForm.style.display = "none";
  signinForm.style.display = "block";
}
function switchLogin() {
  loginForm.style.display = "block";
  signinForm.style.display = "none";
}
