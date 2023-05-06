// Write your script here
if (!localStorage.getItem("user")) {
  window.location.href = "../credential/login.html";
}
let valueofName = JSON.parse(localStorage.getItem("user"));

let bool = JSON.parse(localStorage.getItem("boolean"));
if (bool == true) {
  document.querySelector(".warning").style.display = "block";
} else {
  document.querySelector(".warning").style.display = "none";
}

console.log("profile page");
let save = document.getElementById("save");
let PFName = document.getElementById("FirstName");
let PLName = document.getElementById("LastName");

PFName.value = valueofName.FName;
PLName.value = valueofName.LName;

let AllCart = [];

if (localStorage.getItem("Cart")) {
  AllCart = JSON.parse(localStorage.getItem("Cart"));
}

save.addEventListener("click", () => {
  PFName = PFName.value.trim();
  PLName = PLName.value.trim();
  let MyInfo = JSON.parse(localStorage.getItem("user"));
  MyInfo["FName"] = PFName;
  MyInfo["LName"] = PLName;

  let flags = false;
  if (AllCart.length > 0) {
    for (let i = 0; i < AllCart.length; i++) {
      if (AllCart[i][0] === MyInfo.email) {
        flags = true;
        break;
      }
    }
  }

  if (!flags) {
    let CartList = [];
    let UserN = MyInfo.email;
    CartList.push(UserN);
    AllCart.push(CartList);

    localStorage.setItem("Cart", JSON.stringify(AllCart));
  }

  let myUsers = JSON.parse(localStorage.getItem("users"));

  let ind = MyInfo.index;
  console.log(myUsers[ind - 1].fName);
  myUsers[ind - 1].fName = PFName;
  myUsers[ind - 1].lName = PLName;
  console.log(MyInfo);
  localStorage.setItem("users", JSON.stringify(myUsers));
  localStorage.setItem("user", JSON.stringify(MyInfo));

  localStorage.setItem("boolean", JSON.stringify(false));

  alert("You Profile is set");
  location.reload();
});

// //////////////////////////
//logout
let logout = document.getElementById("logout");
logout.addEventListener("click", () => {
  document.querySelector(".modal").style.display = "block";
  document.querySelector(".no").onclick = () => {
    document.querySelector(".modal").style.display = "none";
  };
  document.querySelector(".yes").onclick = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("boolean");
    document.querySelector(".modal").style.display = "none";
    window.location.href = "../credential/login.html";
  };
});

//////////////////////////////////////////
//change Password

let oldPass = document.getElementById("oldPass");
let NewPass = document.getElementById("NewPass");
let cnfNewPass = document.getElementById("cnfNewPass");
let change = document.getElementById("change");

//checking the length of password
let passLen;
let inputPass;
NewPass.addEventListener("input", () => {
  inputPass = NewPass.value.trim();
  NewPass.value = inputPass;
  passLen = inputPass.length;
  console.log(passLen);
});

//checking pass word must be contain some strong pass
let passContain = () => {
  if (inputPass.match(/[0-9]/i)) {
    if (inputPass.match(/[a-b]/i)) {
      if (inputPass.match(/[A-Z]/i)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};

change.addEventListener("click", () => {
  let myUsers = JSON.parse(localStorage.getItem("users"));
  let myUser = JSON.parse(localStorage.getItem("user"));

  let ind = myUser.index;

  if (oldPass.value === myUser.password) {
    if (8 > passLen) {
      alert("pass should be altleast 8 char");
      return;
    } else if (passContain() === false) {
      alert("password must contain b/w a-z A-Z 0-9");
      return;
    } else if (NewPass.value !== cnfNewPass.value) {
      alert("NewPassword and confirm Password not match");
      return;
    } else {
      myUser.password = NewPass.value;
      myUsers[ind - 1]["pass"] = NewPass.value;
    }
    localStorage.setItem("users", JSON.stringify(myUsers));
    localStorage.setItem("user", JSON.stringify(myUser));
  } else {
    alert("old password not match");
    reset();
    return;
  }
});

function reset() {
  NewPass.value = "";
  oldPass.value = "";
  cnfNewPass.value = "";
}

let v1 = document.querySelector(".v1");
let v2 = document.querySelector(".v2");
let v3 = document.querySelector(".v3");

v2.addEventListener("click", () => {
  if (v2.textContent === "visibility") {
    v2.textContent = "visibility_off";
    NewPass.type = "text";
  } else {
    v2.textContent = "visibility";
    NewPass.type = "password";
  }
});
v3.addEventListener("click", () => {
  if (v3.textContent === "visibility") {
    v3.textContent = "visibility_off";
    cnfNewPass.type = "text";
  } else {
    cnfNewPass.type = "password";
    v3.textContent = "visibility";
  }
});
v1.addEventListener("click", () => {
  if (v1.textContent === "visibility") {
    v1.textContent = "visibility_off";
    oldPass.type = "text";
  } else {
    oldPass.type = "password";
    v1.textContent = "visibility";
  }
});
