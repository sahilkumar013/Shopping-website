let items = document.querySelector(".items");
let totalAmt = document.querySelector(".totalAmt");
let removeBtn;

if (!localStorage.getItem("user")) {
  window.location.href = "../credential/login.html";
} else {
  let userFullName = JSON.parse(localStorage.getItem("user"));

  if (!localStorage.getItem("Cart")) {
    console.log("your cart is empty");
    window.location.href = "../shop/index.html";
  } else {
    let NameOfCartList = JSON.parse(localStorage.getItem("Cart"));
    for (let i = 0; i < NameOfCartList.length; i++) {
      // let str = userFullName.email + userFullName.LName;
      if (NameOfCartList[i][0] === userFullName.email) {
        console.log("both name is equal ");
        if (NameOfCartList[i].length < 2) {
          items.innerHTML = `<h1>Your Cart is Empty</h1>`;
          console.log("cart is empty");
        } else {
          totalAmt.style.display = "flex";
          document.querySelector(".userInfo").innerHTML = userFullName.FName;
          AddingProd(NameOfCartList[i]);
          addMoney(NameOfCartList[i]);
        }
      }
    }
    removeBtn = Array.from(document.querySelectorAll(".removeBtn"));
    removeBtn.forEach((ele) => {
      // console.log(ele);
      ele.addEventListener("click", (e) => {
        deleted(e);
      });
    });
  }
}

function AddingProd(productsArr) {
  items.innerHTML = "";
  for (let i = 1; i < productsArr.length; i++) {
    items.innerHTML += `
      <div class="item">
      <img src="${productsArr[i].image}" alt="Item" />
      <div class="info">
         <div class="row">
             <div class="price">$${productsArr[i].price}</div>
             <div class="sized">${productsArr[i].Size}</div>
            </div>
           <div class="colors">
               Colors:
              <div class="row">
                  <div class="circle" style="background-color: ${productsArr[i]["color"]["red"]}"></div>
                  <div class="circle" style="background-color: ${productsArr[i]["color"]["green"]}"></div>
                  <div class="circle" style="background-color: ${productsArr[i]["color"]["blue"]}"></div>
               </div>
          </div>
          <div class="row">Rating:${productsArr[i]["rating"]["rate"]}</div>
        </div>
              <button class="removeBtn" id="${productsArr[i].id}"> Remove Item</button>
            </div>
      </div>
      `;
  }
}

function addMoney(arr) {
  totalAmt.innerHTML = "";
  let total = 0;
  for (let i = 1; i < arr.length; i++) {
    totalAmt.innerHTML += `<div><span class="price">Pirce =></span> <span class="amt">INR ${(
      arr[i].price * 80
    ).toFixed(2)} </span></div>`;
    total += arr[i].price;
  }
  let totalAmount = (total * 80).toFixed(2);
  totalAmt.innerHTML += `<div class="tamt">Total: INR ${totalAmount}</div>`;
  localStorage.setItem("TotalAmount", JSON.stringify(totalAmount));
  totalAmt.innerHTML += `<button id="paying">Buy Now</button>`;
}

function deleted(e) {
  let removedList = JSON.parse(localStorage.getItem("Cart"));
  let ind = e.target.id;
  // console.log(typeof ind);
  console.log(removedList);
  for (let i = 0; i < removedList.length; i++) {
    for (let j = 1; j < removedList[i].length; j++) {
      // console.log(typeof removedList[i][j].id);
      if (removedList[i][j].id === Number(ind)) {
        console.log(removedList[i][j]);
        removedList[i].splice(j, 1);
      }
    }
  }
  localStorage.setItem("Cart", JSON.stringify(removedList));
  location.reload();
  console.log(removedList);
  // console.log(removedList[0][2]);
}

document.getElementById("paying").addEventListener("click", () => {
  window.location.href = "../razorpay/index.html";
});
