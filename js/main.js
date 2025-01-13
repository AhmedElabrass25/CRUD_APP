// ========================>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>My project
// ===========================>>>>>>>>>>>>
let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productCategory = document.getElementById("productCategory");
let productDescription = document.getElementById("productDescription");
let productImage = document.getElementById("productImage");
let addProductBtn = document.getElementById("addBtn");
let updateProductBtn = document.getElementById("updateBtn");

let searchPro = document.getElementById("searchPro");

let productsArr = [];
if (localStorage.getItem("products") !== null) {
  productsArr = JSON.parse(localStorage.getItem("products"));
  console.log(productsArr);
  displayProducts();
}
let addProduct = (e) => {
  e.preventDefault();
  if (
    validateInputs(productName, "messageName") &&
    validateInputs(productPrice, "messagePrice") &&
    validateInputs(productCategory, "messageCategory") &&
    validateInputs(productDescription, "messageDescription") &&
    validateInputs(productImage, "messageImage")
  ) {
    let product = {
      theName: productName.value,
      price: productPrice.value,
      category: productCategory.value,
      description: productDescription.value,
      image: productImage.files[0]
        ? `images/${productImage.files[0]?.name}`
        : `images/sc2.jpg`,
    };
    // images/${productImage.files[0] ? productImage.files[0].name : ""}
    productsArr.push(product);
    localStorage.setItem("products", JSON.stringify(productsArr));
    console.log(productsArr);
    clearForm();
    displayProducts();
  }
};
// >>>>>>>>>>>>>>>>>>>>>>>>>>>
// Clear Form Function
// >>>>>>>>>>>>>>>>>>>>>>>>>>>
function clearForm() {
  productName.value = null;
  productPrice.value = null;
  productCategory.value = null;
  productDescription.value = null;
  productImage.value = null;
  // clear validation
  productName.classList.remove("is-valid");
  productPrice.classList.remove("is-valid");
  productCategory.classList.remove("is-valid");
  productDescription.classList.remove("is-valid");
  productImage.classList.remove("is-valid");
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>
// Display Function
// >>>>>>>>>>>>>>>>>>>>>>>>>>>
function displayProducts() {
  let cartoona = ``;
  6;
  for (let i = 0; i < productsArr.length; i++) {
    cartoona += `
      <div class="col-lg-4 col-md-6 col-12 mb-4" id=${i}>
            <div class="theCard text-center">
              <img src="${productsArr[i].image}" class="w-75" alt="" />
              <h4 class="proName">${productsArr[i].theName}</h4>
              <h5 class="price"><span class="">price :</span>${productsArr[i].price}$</h5>
              <h5 class="category">
                <span class="">Category : </span>${productsArr[i].category}
              </h5>
                 <p class="w-100 text-secondary mb-2">
                ${productsArr[i].description}
              </p>
             <div class="d-flex flex-wrap align-items-center justify-content-between">
              <button class="btn btn-danger px-3  mb-2"
              onClick={deleteProduct(${i})}
              >Delete
               <i class="fas fa-trash-alt ms-4"></i>
               </button>
              <button class="btn btn-warning text-dark px-3 mb-2"
               onClick="setFormForUpdate(${i})">
              Update
               <i class="fas fa-pen ms-4"></i>
              </button>
             </div>
            </div>
          </div>
    `;
  }
  document.querySelector(".displayProduct .row").innerHTML = cartoona;
}
addProductBtn.addEventListener("click", addProduct);
// >>>>>>>>>>>>>>>>>>>>>>>>>>>
// delete Function
// >>>>>>>>>>>>>>>>>>>>>>>>>>>
function deleteProduct(proIndex) {
  console.log(proIndex);
  productsArr.splice(proIndex, 1);
  localStorage.setItem("products", JSON.stringify(productsArr));
  displayProducts();
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>
// Search Function
// >>>>>>>>>>>>>>>>>>>>>>>>>>>
function searchProducts() {
  let word = searchPro.value;
  console.log(word);
  let cartoona = "";
  for (let i = 0; i < productsArr.length; i++) {
    if (
      productsArr[i].theName.toLowerCase().includes(word.toLowerCase()) == true
    ) {
      cartoona += `
      <div class="col-lg-4 col-md-6 col-12 mb-4" id=${i}>
            <div class="theCard text-center">
              <img src="${productsArr[i].image}" class="w-75" alt="" />
              <h4 class="proName">${productsArr[i].theName}</h4>
              <h5 class="price"><span class="">price :</span>${productsArr[i].price}$</h5>
              <h5 class="category">
                <span class="">Category : </span>${productsArr[i].category}
              </h5>
                 <p class="w-100 text-secondary mb-2">
                ${productsArr[i].description}
              </p>
             <div class="d-flex flex-wrap align-items-center justify-content-between">
              <button class="btn btn-outline-danger px-3  mb-2"
              onClick={deleteProduct(${i})}
              >Delete
               <i class="fas fa-trash-alt ms-4"></i>
               </button>
              <button class="btn btn-outline-warning px-3 mb-2"
               onClick="setFormForUpdate(${i})">
              Update
               <i class="fas fa-pen ms-4"></i>
              </button>
             </div>
            </div>
          </div>
    `;
    }
  }
  document.querySelector(".displayProduct .row").innerHTML = cartoona;
}

searchPro.addEventListener("input", (e) => {
  e.preventDefault();
  searchProducts();
});
// >>>>>>>>>>>>>>>>>>>>>>>>>>>
// setFormForUpdate Function
// >>>>>>>>>>>>>>>>>>>>>>>>>>>
let updateIndex;
function setFormForUpdate(proIndex) {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Smooth scroll
  });
  updateIndex = proIndex;
  console.log(productsArr[proIndex].image);
  addProductBtn.classList.add("d-none");
  updateProductBtn.classList.remove("d-none");
  productName.value = productsArr[proIndex].theName;
  productPrice.value = productsArr[proIndex].price;
  productCategory.value = productsArr[proIndex].category;
  productDescription.value = productsArr[proIndex].description;
  productImage.value = productsArr[proIndex].image;
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>
// Update Product Function
// >>>>>>>>>>>>>>>>>>>>>>>>>>>
updateProductBtn.addEventListener("click", (e) => {
  console.log(updateIndex);
  console.log(productsArr[updateIndex].theName);

  e.preventDefault();
  addProductBtn.classList.remove("d-none");
  updateProductBtn.classList.add("d-none");
  productsArr[updateIndex].theName = productName.value;
  productsArr[updateIndex].price = productPrice.value;
  productsArr[updateIndex].category = productCategory.value;
  productsArr[updateIndex].description = productDescription.value;
  (productsArr[updateIndex].image = productImage.files[0]
    ? `images/${productImage.files[0]?.name}`
    : `images/sc2.jpg`),
    displayProducts(); //VIP
  localStorage.setItem("products", JSON.stringify(productsArr)); //VIP
  clearForm();
});
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>All Validation>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>
// >>>>>validate Product name
//>>>>>>>>>>>>>>>>>>>>
function validateInputs(element, msgId) {
  let messageName = document.getElementById(msgId);
  let inputVal = element.value;
  let regex = {
    productName: /^[a-zA-Z][a-zA-Z0-9_ ]{2,20}$/,
    productPrice: /^\d{1,10}(\.\d{1,2})?$/,
    productCategory: /^[a-zA-Z0-9\s-]{2,20}$/i,
    productDescription: /^[a-zA-Z0-9\s,.\?!]+$/im,
    productImage: /^.{1,}\.(jpg|jpeg|png|avif|scg|webp)$/i,
  };

  let result = regex[element.id].test(inputVal);
  if (result === true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    messageName.classList.add("d-none");
    return true;
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    messageName.classList.remove("d-none");
    return false;
  }
}
productName.addEventListener("input", (e) => {
  validateInputs(e.target, "messageName");
});

productPrice.addEventListener("input", (e) => {
  validateInputs(e.target, "messagePrice");
});

productCategory.addEventListener("input", (e) => {
  validateInputs(e.target, "messageCategory");
});

productDescription.addEventListener("input", (e) => {
  validateInputs(e.target, "messageDescription");
});

productImage.addEventListener("change", (e) => {
  validateInputs(e.target, "messageImage");
});
