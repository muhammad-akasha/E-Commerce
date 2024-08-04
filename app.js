import { onAuthStateChanged, auth, signOut } from "./firebase/firebase.js";

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log("log in");
  } else {
    window.location.href = "./auth/signin/signin.html";
    console.log("log out");
  }
});

let logOut = document.querySelector(".logout");
logOut.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      console.log("sign out successful");
    })
    .catch((error) => {
      console.log(error);
    });
});
