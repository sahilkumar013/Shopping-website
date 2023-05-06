// Link for the documentation:
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration

// Add button code documentation:
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration#code-to-add-pay-button

let amts = JSON.parse(localStorage.getItem("TotalAmount"));

document.getElementById("rzp-button1").onclick = function (e) {
  var options = {
    key: "rzp_test_PV1oQ0oMtgXOsq", // Enter the Key ID generated from the Dashboard
    amount: amts * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "MyShop Checkout",
    description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    theme: {
      color: "#000",
    },
    image:
      "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
  };

  var rzpy1 = new Razorpay(options);
  rzpy1.open();
  // clear mycart - localStorage
  e.preventDefault();
  localStorage.removeItem("TotalAmount");
  let user = JSON.parse(localStorage.getItem("user"));
  let cart = JSON.parse(localStorage.getItem("Cart"));
  for (let i = 0; i < cart.length; i++) {
    if (cart[i][0] === user.email) {
      cart[i].splice(1);
    }
  }
  localStorage.setItem("Cart", JSON.stringify(cart));
  // window.location.href = "../cart/index.html";
  document.querySelector(".amt").innerHTML = "INR " + 0.0;
  document.getElementById("rzp-button1").innerHTML = "Go to cart";
  document.getElementById("rzp-button1").onclick = () => {
    window.location.href = "../cart/index.html";
  };
  console.log("amt is done");
};

document.querySelector(".amt").innerHTML = "INR " + amts;

document.querySelector(".close").addEventListener("click", () => {
  window.location.href = "../cart/index.html";
});
