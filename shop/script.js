// myProducts.filter((item)=>item.title.includes(search.value))
console.log("script is running");
if (localStorage.getItem("user")) {
  let info = JSON.parse(localStorage.getItem("user"));
  if (info.FName === undefined) {
    window.location.href = "../profile/index.html";
  } else {
    document.querySelector(".userInfo").innerHTML =
      info.FName + " " + info.LName;
  }
} else {
  window.location.href = "../profile/index.html";
}
// myCartProductArray = myProducts.filter((item)=> myCartIDs.includes(item.id))

let titles = document.querySelector(".titles");
let items = document.querySelector(".items");

let productsArr = [];

if (!localStorage.getItem("product")) {
  fetch("https://fakestoreapi.com/products")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let arr = data;
      // console.log(arr);

      for (let i = 0; i < arr.length; i++) {
        let obj = {
          id: arr[i].id,
          title: arr[i].title,
          price: arr[i].price,
          description: arr[i].description,
          category: arr[i].category,
          image: arr[i].image,
          rating: arr[i].rating,
          color: { red: "red", green: "green", blue: "blue" },
        };
        if (i % 2 == 0) {
          obj["Size"] = "S";
          obj["color"] = { red: "red", green: "green", blue: "blue" };
        } else {
          obj["Size"] = "M";
          obj["color"] = { red: "black", green: "coral", blue: "yellow" };
        }

        if (i % 3 === 0) {
          obj["Size"] = "XL";
        }

        productsArr.push(obj);
      }
      console.log(productsArr);
      localStorage.setItem("product", JSON.stringify(productsArr));
      AddingProd(productsArr);
      addCart();
    })
    .then((err) => {
      console.log(err);
    });
} else {
  productsArr = JSON.parse(localStorage.getItem("product"));
  AddingProd(productsArr);
  addCart();
}

//fetching data and storing in new arr with the value of color and size .

function AddingProd(productsArr) {
  items.innerHTML = "";
  for (let i = 0; i < productsArr.length; i++) {
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
              <button class="addBtn" id="${productsArr[i].id}">Add to Cart</button>
            </div>
      </div>
      `;
  }
}

let All = document.querySelector(".All");
let filter = Array.from(document.querySelectorAll(".filter"));
let mens = document.querySelector(".mens");
let womens = document.querySelector(".womens");
let jewellery = document.querySelector(".jewellery");
let elec = document.querySelector(".elec");

All.addEventListener("click", () => {
  filter.forEach((ele) => {
    ele.classList.remove("active");
  });
  titles.innerHTML = "All Products";
  AddingProd(productsArr);
  All.classList.add("active");
  addCart();
});

////////////////////////
//mens

mens.addEventListener("click", () => {
  filter.forEach((ele) => {
    ele.classList.remove("active");
  });
  titles.innerHTML = "Men's";
  mens.classList.add("active");
  let menList = [];
  for (let i = 0; i < productsArr.length; i++) {
    if (productsArr[i].category === "men's clothing") {
      menList.push(productsArr[i]);
    }
  }
  // console.log(menList);
  AddingProd(menList);
  addCart();
});

/////////////////
//Womens

womens.addEventListener("click", () => {
  filter.forEach((ele) => {
    ele.classList.remove("active");
  });
  womens.classList.add("active");
  titles.innerHTML = "Women's";
  let womenList = [];
  for (let i = 0; i < productsArr.length; i++) {
    if (productsArr[i].category === "women's clothing") {
      womenList.push(productsArr[i]);
    }
  }
  AddingProd(womenList);
  addCart();
});

//////////////////
//jewellery

jewellery.addEventListener("click", () => {
  filter.forEach((ele) => {
    ele.classList.remove("active");
  });
  jewellery.classList.add("active");
  titles.innerHTML = "Jwellery";
  let jwelleryList = [];
  for (let i = 0; i < productsArr.length; i++) {
    if (productsArr[i].category === "jewelery") {
      jwelleryList.push(productsArr[i]);
    }
  }
  AddingProd(jwelleryList);
  addCart();
});

/////////////////////////////
//electronic

elec.addEventListener("click", () => {
  filter.forEach((ele) => {
    ele.classList.remove("active");
  });
  elec.classList.add("active");
  titles.innerHTML = "Electronics";
  let electricList = [];
  for (let i = 0; i < productsArr.length; i++) {
    if (productsArr[i].category === "electronics") {
      electricList.push(productsArr[i]);
    }
  }
  AddingProd(electricList);
  addCart();
});

/////////////////////////////////////////////

let Apply_Filter = document.querySelector(".Apply-filter");

let red = document.getElementById("red");
let blue = document.getElementById("blue");
let green = document.getElementById("green");
let black = document.getElementById("black");
let coral = document.getElementById("coral");
let yellow = document.getElementById("yellow");

let small = document.getElementById("s");
let medium = document.getElementById("m");
let long = document.getElementById("l");

let range = document.getElementById("range");

let price25 = document.getElementById("0-25");
let price50 = document.getElementById("25-50");
let price100 = document.getElementById("50-100");
let priceMore = document.getElementById("100on");

//Applying filter by color rating size and price
Apply_Filter.addEventListener("click", () => {
  let filterObj = {};
  if (red.checked === true) {
    filterObj["red"] = "red";
  }

  if (blue.checked === true) {
    filterObj["blue"] = "blue";
    coral;
  }

  if (black.checked === true) {
    filterObj["black"] = "black";
  }

  if (green.checked === true) {
    filterObj["green"] = "green";
  }

  if (coral.checked === true) {
    filterObj["coral"] = "coral";
  }

  if (yellow.checked === true) {
    filterObj["yellow"] = "yellow";
  }

  if (range.value > 0) {
    filterObj["range"] = range.value;
  }

  if (price25.checked == true) {
    filterObj["price25"] = 25;
  }
  if (price50.checked == true) {
    filterObj["price50"] = 50;
  }
  if (price100.checked == true) {
    filterObj["price100"] = 100;
  }
  if (priceMore.checked == true) {
    filterObj["price100on"] = 101;
  }

  if (small.checked === true) {
    filterObj["small"] = "S";
  }

  if (medium.checked === true) {
    filterObj["medium"] = "M";
  }

  if (long.checked === true) {
    filterObj["long"] = "XL";
  }
  console.log(filterObj);

  let newProductArr = [];

  //filter on the basis of rating
  for (let i = 0; i < productsArr.length; i++) {
    if (productsArr[i]["rating"]["rate"] >= filterObj.range) {
      newProductArr.push(productsArr[i]);
      console.log(productsArr[i]);
    }

    //filter on the basis of color
    let colors = Object.values(productsArr[i].color);
    console.log(colors);
    console.log(colors.includes("black"));
    if (
      colors.includes(filterObj.red) ||
      colors.includes(filterObj.blue) ||
      colors.includes(filterObj.green) ||
      colors.includes(filterObj.black) ||
      colors.includes(filterObj.coral) ||
      colors.includes(filterObj.yellow)
    ) {
      newProductArr.push(productsArr[i]);
    }

    //filter on the basis of Sizes
    if (
      productsArr[i].Size === filterObj.small ||
      productsArr[i].Size === filterObj.medium ||
      productsArr[i].Size === filterObj.long
    ) {
      newProductArr.push(productsArr[i]);
    }

    //filter on the basis of prices

    if (
      productsArr[i].price <= filterObj.price25 ||
      productsArr[i].price <= filterObj.price50 ||
      productsArr[i].price <= filterObj.price100 ||
      productsArr[i].price >= filterObj.price100on
    ) {
      newProductArr.push(productsArr[i]);
    }
  }
  // console.log(Object.keys(filterObj).length);
  if (Object.keys(filterObj).length > 0) {
    AddingProd(newProductArr);
    addCart();
  }
});

////filtering by just searching
let search = document.getElementById("search");
search.addEventListener("input", () => {
  let searchArr = [];
  let searchVal = search.value.trim().toLowerCase();
  for (let i = 0; i < productsArr.length; i++) {
    if (productsArr[i].category.includes(searchVal)) {
      searchArr.push(productsArr[i]);
    }
  }
  AddingProd(searchArr);
  addCart();
});

//////////////////////////////////////////////////////////////////////////////////////////////

function addCart() {
  let AddingBtn = Array.from(document.querySelectorAll(".addBtn"));
  console.log(AddingBtn.length);
  AddingBtn.forEach((ele) => {
    // console.log(ele);
    ele.addEventListener("click", (e) => {
      // console.log(e.target.parentElement);// through it we can see their parent
      console.log(e.target.id);
      let indexes = e.target.id;
      let cartObj = productsArr[indexes - 1];
      let AllCart = JSON.parse(localStorage.getItem("Cart"));
      for (let i = 0; i < AllCart.length; i++) {
        let listOfName = AllCart[i][0];
        let userNAME = JSON.parse(localStorage.getItem("user"));
        // let strName = userNAME.FName + userNAME.LName;
        if (listOfName === userNAME.email) {
          AllCart[i].push(cartObj);
          alert("your item is added to cart");
          localStorage.setItem("Cart", JSON.stringify(AllCart));
        }
      }
    });
  });
}
