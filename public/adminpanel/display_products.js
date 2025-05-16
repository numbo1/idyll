// Firebase imports
import { auth, onAuthStateChanged, setPersistence, browserLocalPersistence } from "../firebase.js";
import { initializeApp } from "../firebase.js";
import { db, ref, onValue, remove} from "../firebase.js";


window.addEventListener('DOMContentLoaded', () => {

    // DOM element where products will be displayed
    const productList = document.getElementById("productAdminList");

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
            <p>Merke: ${this.brand}</p>
            <p>Pris: ${this.price} kr</p>
            <p>Lager: ${this.stock}</p>
            <div class="btn-group">
            <button class="btn edit-btn">Rediger</button>
            <button class="btn delete-btn">Slett</button>
            </div>
            `;

            //Edit button event listener
            const editBtn = card.querySelector(".edit-btn");
            editBtn.addEventListener("click", () => {
              window.location.href = `edit_product.html?id=${this.id}`;
            });

            //Delete button event listener
            const deleteBtn = card.querySelector(".delete-btn");
            deleteBtn.addEventListener("click", async () => {
                const confirmed = confirm("Er du sikker på at du vil slette dette produktet?");
                if (!confirmed) return;
        
                try {
                  await this.remove();
                  card.remove(); // Remove from DOM
                } catch (error) {
                  console.error("Error deleting product:", error);
                }
              });

            return card;
        }

        async remove() {
            const productReference = ref(db, `product/${this.id}`);
            await remove(productReference);
            alert("Produkt slettet!");
        }

    }

    // Fetch products from Firebase
    const productsRef = ref(db, "product");

    onValue(productsRef, (snapshot) => {
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


