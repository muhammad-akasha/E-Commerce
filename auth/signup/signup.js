import {
  app,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "../../firebase/firebase.js";

let signUpForm = document.getElementById("sign-up-form");

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(e);
  let email = e.target[0].value;
  let password = e.target[1].value;
  let firstName = e.target[3].value;
  let lastName = e.target[4].value;
  // console.log(email, password, firstName, lastName);

  try {
    let createUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("create account successfull", createUser);
  } catch (error) {
    alert(error);
    // console.log(error);
  }
});
