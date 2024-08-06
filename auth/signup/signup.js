import {
  auth,
  createUserWithEmailAndPassword,
  addDoc,
  collection,
  db,
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  updateProfile,
} from "../../firebase/firebase.js";

let signUpForm = document.getElementById("sign-up-form");
let loader = document.querySelector(".spin");
signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(e);
  loader.classList.remove("none");
  const profilePic = e.target.elements.file;
  const email = e.target.elements.email.value;
  const password = e.target.elements.password.value;
  const firstName = e.target.elements.first_name.value;
  const lastName = e.target.elements.last_name.value;
  console.log(profilePic.files[0]);

  if (
    !email ||
    !password ||
    profilePic.files.length === 0 ||
    !firstName ||
    !lastName
  ) {
    return alert("All the fields are required");
  }
  const storage = getStorage();
  const storageRef = ref(storage, `images/${profilePic.files[0].name}`);
  try {
    const createUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const uploadImg = await uploadBytes(storageRef, profilePic.files[0]);
    console.log(uploadImg);
    const imgUrl = await getDownloadURL(ref(storageRef));
    console.log(imgUrl);
    let userData = {
      email,
      password,
      firstName,
      lastName,
      imgUrl,
    };

    await updateProfile(createUser.user, {
      displayName: `${firstName} ${lastName}`,
      photoURL: imgUrl,
    });
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "usersdata"), userData);
    console.log("Document written with ID: ", docRef.id);
    console.log(docRef);
    console.log("Account creation successful", createUser);
    loader.classList.add("none");
    window.location.replace("../../index.html");
  } catch (error) {
    console.error("Error creating account:", error.message);
    alert("An error occurred: " + error.message);
  }
});
