// Importing Firebase modules
import { initializeApp } from "../firebase.js";
import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence } from "../firebase.js";
import { db, ref, get, child, set, push } from "../firebase.js";
const auth = getAuth();

//Kicks non authenticated users out of the page
  onAuthStateChanged(auth, async (user) => {
    // If user is not logged in, redirect to login page
    if (!user) {
        window.location.href = "../index.html";
        return;
    }
    // If user is logged in, check if they are an admin
    try {
        const idTokenResult = await user.getIdTokenResult(true);
        const claims = idTokenResult.claims;

        // Check if the user has the admin claim
        if (claims.admin !== true) {
            // If not an admin, redirect to index page
            console.log("Not an admin");
            window.location.href = "../index.html";
        } else {
            console.log("Admin user");
        }
    } catch (error) {
        // Handle any errors that occur while getting the token claims
        // Redriects to index page anyways for security measures
        console.error("Error getting token claims:", error);
        window.location.href = "../index.html";
    }
});

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
      document.getElementById('message').innerText = "Produkt lagt til.";
      window.location.href = "products.html";
  })
  .catch((error) => {
      console.error("Error adding product: ", error);
      document.getElementById('message').innerText = "Feil ved oppdatering av produkt." + error.message;
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
          console.log("Auth persistence set to local");
      })
      .catch((error) => {
          console.error("Error setting auth persistence:", error);
  });
  