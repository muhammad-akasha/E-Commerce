import {
  addDoc,
  setDoc,
  collection,
  doc,
  db,
  auth,
  onAuthStateChanged,
  uploadBytes,
  getDownloadURL,
  getStorage,
  ref
} from "../firebase/firebase.js";

let createForm = document.getElementById("create-form");
const storage = getStorage();

let uid;
createForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(e);
  let category = e.srcElement[0].value;
  let image = e.srcElement[1];
  let title = e.srcElement[2].value;
  let description = e.srcElement[3].value;
  let price = e.srcElement[4].value;
  if (
    !category ||
    image.files.length === 0 ||
    !title ||
    !description ||
    !price
  ) {
    alert("all the field are required");
  }
  const storageRef = ref(storage, `products/${image.files[0].name}`);
  const uploadImg = await uploadBytes(storageRef, image.files[0]);
  console.log(uploadImg);
  const imgUrl = await getDownloadURL(ref(storageRef));
  console.log(imgUrl);

  await addDoc(collection(db, `${category}`), {
    category,
    title,
    description,
    price,
    productImg: imgUrl,
  });
  alert("add create successfully");
  window.location.href = "../index.html"
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    uid = user.uid;
    console.log("log in");
    console.log(user.displayName);
    console.log(user.photoURL);
    console.log(uid);
  } else {
    console.log("logout");
  }
});
