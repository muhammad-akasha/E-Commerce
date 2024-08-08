let loader = document.querySelector(".loader");
document.addEventListener("DOMContentLoaded", () => {
  let productData = localStorage.getItem("productData");
  productData = JSON.parse(productData);
  let id = localStorage.getItem("productId");
  id = JSON.parse(id);
  let category = localStorage.getItem("productCategory");
  category = JSON.parse(category);
  const {
    condition,
    productImg,
    title,
    description,
    price,
    uid,
    createdBy,
    userPic,
  } = productData;
  console.log(productImg, title, description, price);
  showProduct(
    productImg,
    title,
    category,
    description,
    price,
    condition,
    createdBy,
    userPic,
    uid
  );
  loader.classList.add("none");
  // localStorage.removeItem("productData");
});

function showProduct(
  img,
  title,
  category,
  description,
  price,
  condition,
  user,
  pic,
  uid
) {
  let currProductImg = document.getElementById("curr-product-img");
  let productTitle = document.querySelector(".title");
  let productCategory = document.querySelector(".category");
  let ProductCondition = document.querySelector(".condition");
  let productDescription = document.querySelector(".description");
  let productPrice = document.querySelector(".price");
  let userName = document.querySelector(".username");
  let userPic = document.querySelector(".user-pic");

  if (!userPic) {
    userPic.src = "./profile.png";
  } else {
    userPic.src = pic;
  }
  currProductImg.src = img;
  userName.innerHTML = user;
  productTitle.innerHTML = title;
  ProductCondition.innerHTML = condition;
  productCategory.innerHTML = category;
  productDescription.innerHTML += description;
  productPrice.innerHTML += price;
}
