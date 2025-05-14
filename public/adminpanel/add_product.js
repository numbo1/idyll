// Importing Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, get, child, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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




// Logout event listener
document.getElementById("cancel").addEventListener("click", async () => {
    try {
      console.log("User canceled the action");
      window.location.href = "products.html";
    } catch (error) {
      console.error("Error canceling action:", error);
    }
  });

  function addProduct(brand, line, name, price, description, image, count) {
    const productsRef = ref(db, 'products');

    const brand = document.getElementById("brand").value;
    const line = document.getElementById("line").value;
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;
    const image = document.getElementById("image").value;

    // Creating a new random product ID/ reference
    const newProductRef = push(productsRef);

  }