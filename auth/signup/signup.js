import {
  auth,
  createUserWithEmailAndPassword,
} from "../../firebase/firebase.js";

let signUpForm = document.getElementById("sign-up-form");

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(e);

  // Use e.target.elements to access form fields safely
  const email = e.target.elements.email.value;
  const password = e.target.elements.password.value;
  const firstName = e.target.elements.first_name.value;
  const lastName = e.target.elements.last_name.value;

  if (!email || !password) {
    return alert("Please add email and password");
  }

  try {
    const createUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("Account creation successful", createUser);
    window.location.replace("../../index.html");
  } catch (error) {
    console.error("Error creating account:", error.message);
    alert("An error occurred: " + error.message);
  }
});
