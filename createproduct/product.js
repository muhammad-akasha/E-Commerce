import {
  addDoc,
  collection,
  db,
  auth,
  onAuthStateChanged,
  uploadBytes,
  getDownloadURL,
  storage,
  ref,
} from "../firebase/firebase.js";

let createForm = document.getElementById("create-form");
let loader = document.querySelector(".spin");

let uid;
let userName;
let userPic;

onAuthStateChanged(auth, (user) => {
  if (user) {
    uid = user.uid;
    userName = user.displayName;
    userPic = user.photoURL;
    console.log("log in");
  } else {
    console.log("logout");
  }
});
createForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(e);
  let category = e.srcElement[0].value;
  let condition = document.querySelector("input[name='condition']:checked")
    .value;
  let image = e.srcElement[3];
  let title = e.srcElement[4].value;
  let description = e.srcElement[5].value;
  let price = e.srcElement[6].value;
  let btn = e.srcElement[7];

  let numRegex = /^\d+$/;

  console.log(userName, userPic, uid);
  if (
    !category ||
    image.files.length === 0 ||
    !title ||
    !description ||
    !price ||
    !condition
  ) {
    return alert("all the field are required");
  }
  if (!numRegex.test(price)) {
    return alert("price must be number only");
  }
  loader.classList.remove("none");
  btn.classList.add("flex-class");
  btn.setAttribute("disabled", true);
  const storageRef = ref(storage, `products/${image.files[0].name}`);
  const uploadImg = await uploadBytes(storageRef, image.files[0]);
  console.log(uploadImg);
  const imgUrl = await getDownloadURL(ref(storageRef));
  console.log(imgUrl);

  await addDoc(collection(db, `${category}`), {
    condition,
    category,
    title,
    description,
    price,
    productImg: imgUrl,
    createdBy: userName,
    userPic,
    uid,
  });
  alert("add create successfully");
  loader.classList.add("none");
  btn.removeAttribute("disabled");
  btn.classList.remove("flex-class");
  window.location.href = "../index.html";
});
