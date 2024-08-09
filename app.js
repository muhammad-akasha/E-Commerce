import {
  onAuthStateChanged,
  auth,
  signOut,
  collection,
  getDocs,
  getDoc,
  db,
  doc,
} from "./firebase/firebase.js";

const getSingleProduct = async (ele) => {
  let eleParent = ele.parentElement.parentElement;
  let id = eleParent.getAttribute("data-id");
  let category = eleParent.getAttribute("data-category");
  const docRef = doc(db, category, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    localStorage.setItem("productData", JSON.stringify(docSnap.data()));
    localStorage.setItem("productId", JSON.stringify(id));
    localStorage.setItem("productCategory", JSON.stringify(category));
    window.location.href = "./specs/index.html";
  } else {
    console.log("No such document!");
  }
};

window.getSingleProduct = getSingleProduct;
let profileDetail = document.querySelector(".profile-details");
let profilePic = document.querySelector(".profile-pic");
let username = document.querySelector(".username");
let addProductLink = document.querySelector(".link-to-add-product");
let signInAndLogOut = document.querySelector(".sign-logout");
let loader = document.querySelector(".loader");
let currUserUid;

const getProducts = async () => {
  loader.classList.remove("none");
  document.body.style.overflowY = "hidden";
  const categories = [
    "accessories",
    "bikes",
    "cars",
    "home appliances",
    "laptop-computer",
    "mobilephone",
  ];
  const productContainer = document.querySelector(".products-container");
  productContainer.innerHTML = "";
  let allProducts = {}; // save all product data from database

  for (const category of categories) {
    try {
      const querySnapshot = await getDocs(collection(db, category));
      querySnapshot.forEach((doc) => {
        const { productImg, title, price, category, uid } = doc.data();
        if (!allProducts[category]) {
          allProducts[category] = [];
        }
        allProducts[category].push({
          productImg,
          title,
          price,
          id: doc.id,
          uid,
        });
      });
    } catch (error) {
      console.error(`Error fetching data for category ${category}:`, error);
    }
  }

  // showing all product by category
  for (const category in allProducts) {
    const productDiv = document.createElement("div");
    productDiv.classList.add("all-products");
    productContainer.innerHTML += `<div class="category"><h1>${category}</h1></div>`;
    allProducts[category].forEach((product) => {
      productDiv.innerHTML += `
          <div data-id="${
            product.id
          }" data-category="${category}" class="product max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

              <img class="rounded-t-lg" src="${
                product.productImg
              }" alt="productImage" />
            <div class="p-5">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Title: ${product.title}
                </h5>
              <p class="mb-3 font-bold text-gray-700 dark:text-gray-400">
                RS: ${product.price}
              </p>
              <button onclick="getSingleProduct(this)" type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Show more specs</button>
              <a class="${
                product.uid === currUserUid
                  ? "text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  : "none"
              }" 
              href="./updateproduct/update.html?id=${
                product.id
              }&category=${category}">
              edit add
          </a>
            </div>
          </div>
      `;
    });
    productContainer.appendChild(productDiv);
  }

  document.body.style.overflowY = "auto";
  loader.classList.add("none");
};

// check if user login or not

onAuthStateChanged(auth, (user) => {
  if (user) {
    currUserUid = user.uid;
    profileDetail.classList.remove("none");
    addProductLink.classList.remove("disabled-link");
    signInAndLogOut.classList.add("logout");
    signInAndLogOut.innerHTML = "LOGOUT";
    signInAndLogOut.href = "javascript:void(0);";
    profilePic.src = `${user.photoURL}`;
    username.innerHTML = `${user.displayName}`;
    getProducts();

    // Add the event listener here to user logout
    signInAndLogOut.addEventListener("click", () => {
      signOut(auth)
        .then(() => {
          console.log("Sign out successful");
        })
        .catch((error) => {
          console.log("Sign out error:", error);
        });
    });
  } else {
    getProducts();
    profileDetail.classList.add("none");
    addProductLink.classList.add("disabled-link");
    signInAndLogOut.classList.remove("logout");
    signInAndLogOut.innerHTML = "SIGN IN";
    signInAndLogOut.href = "./auth/signin/signin.html";
  }
});
