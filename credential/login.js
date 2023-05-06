if (localStorage.getItem("users")) {
  localStorage.setItem("boolean", JSON.stringify(true));
} else {
  alert("please signup First");
  window.location.href = "./singup.html";
}
if (localStorage.getItem("user")) {
  window.location.href = "../shop/index.html";
}

let email = document.getElementById("email");
let login_form = document.getElementById("login-form");
let pass = document.getElementById("pass");
let v1 = document.querySelector(".v1");
let message = document.querySelector(".message");
let submit = document.getElementById("submit");

let checker = [];
checker = JSON.parse(localStorage.getItem("users"));
let user = {};
submit.addEventListener("click", (e) => {
  let ind;

  let flag = false;
  for (let i = 0; i < checker.length; i++) {
    if (checker[i].email === email.value.trim()) {
      ind = checker[i].ID;
      flag = true;
      break;
    }
  }
  if (flag === true) {
    if (checker[ind - 1]["pass"] === pass.value.trim()) {
      message.textContent = `Login Successful`;
      message.style.color = "green";
      let tokenNumber = getRandomStr();
      user["tokenAccess"] = tokenNumber;
      user["password"] = pass.value;
      user["email"] = email.value;
      user["index"] = ind;
      user["FName"] = checker[ind - 1].fName;
      user["LName"] = checker[ind - 1].lName;
      localStorage.setItem("user", JSON.stringify(user));
      setTimeout(() => {
        window.location.href = "../profile/index.html";
      }, 1500);
    } else {
      message.textContent = `password incorrect`;
      return;
    }
  } else {
    message.textContent = `invalid email`;
  }
  resets();
});

//creating random string
let token = "";
function getRandomStr() {
  let str =
    "abcdefghijklmnopqrstuvwxyzABCDEEGHIKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+-=";

  for (let i = 0; i < 16; i++) {
    let ind = Math.floor(Math.random() * str.length);
    token += str[ind];
  }
  return token;
}
v1.addEventListener("click", () => {
  if (v1.textContent === "visibility") {
    v1.textContent = "visibility_off";
    pass.type = "text";
  } else {
    v1.textContent = "visibility";
    pass.type = "password";
  }
});
function resets() {
  email.value = "";
  pass.value = "";
}
console.log(getRandomStr());
console.log("script is running");
