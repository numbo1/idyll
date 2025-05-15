// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDDbWAlPBNh4vnIRMzGq1hHDJSOB48H83A",
  authDomain: "idyll-f6405.firebaseapp.com",
  databaseURL: "https://idyll-f6405-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "idyll-f6405",
  storageBucket: "idyll-f6405.appspot.com",
  messagingSenderId: "820088340754",
  appId: "1:820088340754:web:525f3f5fa2af8c50cf33cb",
  measurementId: "G-EPNK7242P4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

window.addEventListener('DOMContentLoaded', () => {

    // DOM element where products will be displayed
    const productList = document.getElementById("productList");

    class Product {
    constructor(id, data) {
        this.id = id;
        this.brand = data.brand || "";
        this.line = data.line || "";
        this.name = data.name || "";
        this.price = data.price || "";
        this.description = data.description || "";
        this.image = data.image || "";
        this.stock = data.stock || "";
    }
    render() {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
        <img src="../bilder/testimage_online_store.webp" alt="${this.name}">
        <p><strong>${this.name}</strong></p>
        <p>Brand: ${this.brand}</p>
        <p>Price: ${this.price} kr</p>
        <p>In stock: ${this.stock}</p>
        <div class="btn-group">
        <button class="btn" onclick="window.location.href='edit_product.html?id=${this.id}'">Edit</button>
        <button class="btn" onclick="deleteProduct('${this.id}')">Delete</button>
        </div>
        `;

        return card;
        }
    }
    const productsRef = ref(db, "product");

    onValue(productsRef, (snapshot) => {
        console.log("Snapshot:", snapshot.val());

        productList.innerHTML = ""; // Clear the list before rendering
        const products = snapshot.val();

        if (products) {
            Object.entries(products).forEach(([id, data]) => {
                console.log("Rendering product id:", id, data);
                const product = new Product(id, data);
                productList.appendChild(product.render());
            });
        } else {
            productList.innerHTML = "<p>No products available.</p>";
        }
    });
});
