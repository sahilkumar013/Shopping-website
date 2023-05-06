// font-family: 'Philosopher', sans-serif;
// font-family: 'Varela', sans-serif;
// font-family: 'Varela Round', sans-serif;

// let productsArr = [];
// fetch("https://fakestoreapi.com/products")
//   .then((res) => {
//     return res.json();
//   })
//   .then((data) => {
//     let arr = data;
//     // console.log(arr);
//     for (let i = 0; i < arr.length; i++) {
//       let obj = {
//         id: arr[i].id,
//         title: arr[i].title,
//         price: arr[i].price,
//         description: arr[i].description,
//         category: arr[i].category,
//         image: arr[i].image,
//         rating: arr[i].rating,
//         color: { red: "red", green: "green", blue: "blue" },
//       };
//       productsArr.push(obj);
//       if (productsArr[i].category.includes("women's")) {
//         // console.log(productsArr[i]);
//       }
//     }
//     // console.log(productsArr);
//   })
//   .then((err) => {
//     console.log(err);
//   });

// let user = {};
// let name = "ram";
// let email = "ram@gmail.com";
// user["name"] = name;
// user["email"] = email;

// let i = 3;
// if (i % 2 == 0) {
//   user["color"] = { red: "red", green: "green", blue: "blue" };
// } else {
//   user["color"] = { black: "black", white: "white" };
// }
// console.log(user);

// let list = {
//   size: "m",
//   color: { red: "red", black: "black" },
// };
// let list1 = {
//   size: { small: "s", medium: "m" },
//   color: "black",
// };

// let a = Object.values(list1["size"]);
// console.log(a);

// let arr = [["ram", { name: "ram", age: 12 }, { name: "shyam", age: 12 }]];
// console.log(arr[0][1]);

// let str = "damngray";

// if (str.includes("r")) {
//   if (str.includes("e")) {
//     if (str.includes("d")) {
//       console.log("yes");
//       return;
//     }
//   }
// }
// console.log("no");
// 123
//456
//789
//47896325
// let arr = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
// ];
// console.log(arr);

// for (let i = 0; i < arr.length; i++) {
//   for (let j = 0; j < arr[i].length; j++) {}
// }

// current datetime string in America/Chicago timezone
let chicago_datetime_str = new Date().toLocaleString("en-US", {
  timeZone: "Asia/Kolkata",
});

// create new Date object
let date_chicago = new Date(chicago_datetime_str);
console.log(date_chicago.getHours());

// year as (YYYY) format
let year = date_chicago.getFullYear();

// month as (MM) format
let month = ("0" + (date_chicago.getMonth() + 1)).slice(-2);

// date as (DD) format
let date = ("0" + date_chicago.getDate()).slice(-2);
console.log(date);

// date time in YYYY-MM-DD format
let date_time = year + "-" + month + "-" + date;

// "2021-03-22"
console.log(date_time);
// console.log(date_time.getHours());
