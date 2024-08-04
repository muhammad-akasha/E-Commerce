import {
  auth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "../../firebase/firebase.js";

let form = document.getElementById("signin-form");
let googleAuth = document.getElementById("google_auth");
let fbAuth = document.getElementById("fb_auth");
let githubAuth = document.getElementById("github_auth");
const googleProvider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let email = e.target[0].value;
  let password = e.target[1].value;
  console.log(email, password);
  try {
    const signIn = await signInWithEmailAndPassword(auth, email, password);
    window.location.replace("./../../index.html");
  } catch (err) {
    alert("Incorrect email and password");
    console.log(err);
  }
});

googleAuth.addEventListener("click", () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      window.location.replace("./../../index.html");
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode);
      console.log(errorMessage);
      console.log(email);
      console.log(credential);
    });
});

fbAuth.addEventListener("click", () => {
  signInWithPopup(auth, fbProvider)
    .then((result) => {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      window.location.replace("./../../index.html");
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);
      console.log(errorCode);
      console.log(errorMessage);
      console.log(email);
      console.log(credential);
    });
});

githubAuth.addEventListener("click", () => {
  signInWithPopup(auth, githubProvider)
    .then((result) => {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      window.location.replace("./../../index.html");
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);
      console.log(errorCode);
      console.log(errorMessage);
      console.log(email);
      console.log(credential);
    });
});
