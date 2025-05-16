// Importing Firebase modules
import { initializeApp } from "../firebase.js";
import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence } from "../firebase.js";
import { db, ref, get, child, set, push } from "../firebase.js";
const auth = getAuth();

// cancel event listener
document.getElementById("cancel").addEventListener("click", async () => {
    try {
      console.log("User canceled the action");
      window.location.href = "products.html";
    } catch (error) {
      console.error("Error canceling action:", error);
    }
});

function addProduct(brand, line, name, price, description, image, stock) {
  const productsRef = ref(db, 'product');

  // Creating a new random product ID/ reference
  const newProductRef = push(productsRef);

  set(newProductRef, {
      brand: brand,
      line: line,
      name: name,
      price: price,
      description: description,
      image: image,
      stock: stock
  })
  .then(()=> {
      console.log("Product added with ID: ", newProductRef.key);
      alert("Product added successfully!");
      window.location.href = "products.html";
  })
  .catch((error) => {
      console.error("Error adding product: ", error);
      alert("Error adding product: " + error.message);
  });
}

document.getElementById("addProductForm").addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the default form submission

  const brand = document.getElementById("productBrand").value;
  const line = document.getElementById("productLine").value;
  const name = document.getElementById("productName").value;
  const price = document.getElementById("productPrice").value;
  const description = document.getElementById("productDescription").value;
  const image = document.getElementById("productImage").value;
  const stock = document.getElementById("productStock").value;

  addProduct(brand, line, name, price, description, image, stock);


});

  //Saves data in browsers memory
  setPersistence(auth, browserLocalPersistence)
      .then(() => {
          console.log("✅ Auth persistence set to local");
      })
      .catch((error) => {
          console.error("Error setting auth persistence:", error);
  });
  
  //Check if user is logged in and if user is admin or not
  onAuthStateChanged(auth, async (user) => {
      if (!user) {
          window.location.href = "../index.html";
          return;
      }
      try {
              // Get the ID token result to check for custom claims
              const idTokenResult = await user.getIdTokenResult(true);
              console.log(idTokenResult.claims);
              const claims = idTokenResult.claims;
  
          if (claims.admin === true) {
              console.log("Admin user");
  
              
          } else {
              console.log("Regular user");
              window.location.href = "../index.html";
          }
      } catch (error) {
          // Handle any errors that occur while getting the token claims
          console.error("Error getting token claims:", error);
      }
  });