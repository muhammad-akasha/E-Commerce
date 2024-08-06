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

let profilePic = document.querySelector(".profile-pic");
let username = document.querySelector(".username");
let loader = document.querySelector(".loader");

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    profilePic.src = `${user.photoURL}`;
    username.innerHTML = `${user.displayName}`;

    const getData = async () => {
      const categories = [
        "accessories",
        "bikes",
        "cars",
        "home appliances",
        "laptop-computer",
        "mobilephone",
      ];
      const productContainer = document.querySelector(".products-container");
      for (const category of categories) {
        try {
          const querySnapshot = await getDocs(collection(db, category));
          querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            productContainer.innerHTML += `
            <div
            class="product max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img class="rounded-t-lg" src="${
                  doc.data().productImg
                }" alt="" />
            </a>
            <div class="p-5">
                <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Title : 
                        ${doc.data().title}</h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                 Description :  ${doc.data().description}</p>
                   <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Price :  ${doc.data().price}</p>
            </div>
        </div>
    </div>
            `;
          });
          loader.classList.add("none");
        } catch (error) {
          console.error(`Error fetching data for category ${category}:`, error);
          loader.classList.remove("none");
        }
      }
    };
    getData();
  } else {
    console.log("User logged out or not authenticated");
    window.location.href = "./auth/signin/signin.html";
  }
});

let logOut = document.querySelector(".logout");
logOut.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      console.log("Sign out successful");
    })
    .catch((error) => {
      console.log("Sign out error:", error);
    });
});
