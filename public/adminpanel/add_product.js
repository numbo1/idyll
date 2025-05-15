// Importing Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, get, child, set, push } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDDbWAlPBNh4vnIRMzGq1hHDJSOB48H83A",
    authDomain: "idyll-f6405.firebaseapp.com",
    databaseURL: "https://idyll-f6405-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "idyll-f6405",
    storageBucket: "idyll-f6405.firebasestorage.app",
    messagingSenderId: "820088340754",
    appId: "1:820088340754:web:525f3f5fa2af8c50cf33cb",
    measurementId: "G-EPNK7242P4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getDatabase(app);


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