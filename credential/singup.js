let fName = document.getElementById("userFirstName");
let lName = document.getElementById("userLastName");
let email = document.getElementById("email");
let pass = document.getElementById("pass");
let cnfpass = document.getElementById("cnfPass");
const submit = document.getElementById("submit");
const signup_form = document.getElementById("signup-form");
const error = document.querySelector(".error");
const success = document.querySelector(".success");
let v1 = document.querySelector(".v1");
let v2 = document.querySelector(".v2");

//creating arr where store the credential of the user
let credential = [];

//if any user existing
if (localStorage.getItem("users")) {
  credential = JSON.parse(localStorage.getItem("users"));
  console.log(credential);
}

//checking the length of password
let passLen;
let inputPass;
pass.addEventListener("input", () => {
  inputPass = pass.value.trim();
  pass.value = inputPass;
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

submit.addEventListener("click", (e) => {
  if (
    fName.value.trim() == "" ||
    lName.value.trim() == "" ||
    email.value.trim() == "" ||
    pass.value.trim() == ""
  ) {
    error.style.display = "block";
    return;
  } else if (passContain() === false) {
    alert("password must contain a-z, A-Z, 0-9");
    return;
  } else if (passLen < 8) {
    alert("password length should be atleast 8 char");
    return;
  } else {
    if (pass.value.trim() === cnfpass.value.trim()) {
      if (localStorage.getItem("users")) {
        credential = JSON.parse(localStorage.getItem("users"));
        //checking if email is already exist or not
        console.log(credential);
        for (let i = 0; i < credential.length; i++) {
          if (credential[i].email === email.value) {
            console.log(credential[i].email);
            error.style.display = "block";
            error.textContent = `${email.value} is already exits!!!`;
            return;
          }
        }
      } else {
        console.log("email is totally new you are  eligible for signup");
      }
      credential.push({
        fName: fName.value.trim(),
        lName: lName.value.trim(),
        email: email.value.trim(),
        pass: pass.value.trim(),
      });
      let id = credential.length;
      credential[id - 1]["ID"] = id;
      localStorage.setItem("users", JSON.stringify(credential));

      error.style.display = "none";

      setTimeout(() => {
        modalDisplay();
        resets();
      }, 2000);
    } else {
      alert("password not match");
      pass.value = "";
      cnfpass.value = "";
    }
  }
});

function resets() {
  fName.value = "";
  lName.value = "";
  email.value = "";
  pass.value = "";
  cnfpass.value = "";
}

function modalDisplay() {
  success.style.display = "block";
  document.getElementById("modal").style.display = "block";
  document.querySelector(".welcome").textContent = `Welcome to ${fName.value}`;
}

// making pass visible or invisible
v1.addEventListener("click", () => {
  if (v1.textContent === "visibility") {
    v1.textContent = "visibility_off";
    pass.type = "text";
  } else {
    v1.textContent = "visibility";
    pass.type = "password";
  }
});
v2.addEventListener("click", () => {
  if (v2.textContent === "visibility") {
    v2.textContent = "visibility_off";
    cnfpass.type = "text";
  } else {
    cnfpass.type = "password";
    v2.textContent = "visibility";
  }
});

//////////////////////////////////
document.querySelector(".close").addEventListener("click", () => {
  location.reload();
});
