import {
  getDoc,
  db,
  doc,
  updateDoc,
  uploadBytes,
  getDownloadURL,
  ref,
  storage,
} from "../firebase/firebase.js";

let loader = document.querySelector(".loader");
let docRef;

document.body.style.overflowY = "hidden";
document.addEventListener("DOMContentLoaded", async () => {
  let windowUrl = new URLSearchParams(window.location.search);
  let id = windowUrl.get("id");
  let category = windowUrl.get("category");
  console.log(id, category);

  docRef = doc(db, category, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    let condition = document.querySelector(
      `input[name='condition'][value=${docSnap.data().condition}]`
    );
    let title = document.getElementById("title");
    let description = document.getElementById("description");
    let price = document.getElementById("price");
    price.value = docSnap.data().price;
    title.value = docSnap.data().title;
    description.value = docSnap.data().description;
    condition.checked = true;
    document.body.style.overflowY = "auto";
    loader.classList.add("none");
  } else {
    console.log("No such document!");
  }
});

let spinner = document.querySelector(".spin");
let updateForm = document.getElementById("update-form");

updateForm.addEventListener("submit", async (e) => {
  spinner.classList.remove("none");
  e.preventDefault();
  let button = e.srcElement.querySelector("button[type='submit']");
  button.disabled = true;

  let conditionInput = document.querySelector(
    `input[name='condition']:checked`
  );
  let condition = conditionInput ? conditionInput.value : null;
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  let price = document.getElementById("price").value;
  let image = document.getElementById("product-img");

  if (!condition || !title || !description || !price) {
    console.log("all input field must be filled");
    spinner.classList.add("none");
    button.disabled = false;
    return; // Prevent form submission
  }

  let updatedData = { title, description, price, condition };

  if (image.files.length > 0) {
    try {
      const storageRef = ref(storage, `products/${image.files[0].name}`);
      const uploadImg = await uploadBytes(storageRef, image.files[0]);
      console.log(uploadImg);
      const imgUrl = await getDownloadURL(ref(storageRef));
      console.log(imgUrl);
      updatedData.productImg = imgUrl;
    } catch (error) {
      alert(error);
      spinner.classList.add("none");
      button.disabled = false;
      return; // Prevent form submission in case of error
    }
  }

  try {
    await updateDoc(docRef, updatedData);
  } catch (error) {
    console.error("Error updating document:", error);
  } finally {
    spinner.classList.add("none");
    button.disabled = false;
    window.location.href = "../index.html";
  }
});
