// Firebase imports
import { initializeApp } from "../firebase.js";
import { db, ref, onValue } from "../firebase.js";
import { auth, onAuthStateChanged, setPersistence, browserLocalPersistence } from "../firebase.js";

// Class cart
// This class handles the cart functionality, including adding products, saving to local storage, and rendering the cart.
class Cart {
    // Constructor for the Cart class
    constructor(cartElementId) {
        this.cart = [];
        this.cartElement = document.getElementById(cartElementId);
        this.loadCart();
        this.renderCart();
    }

    // Adds a product to the cart
    // Checks if the product is already in the cart before adding it
    addProduct(product) {
        if (this.cart.some(p => p.id === product.id)) return;
        this.cart.push(product);
        this.saveCart();
        this.renderCart();
    }

    // Saves the cart to local storage
    // Converts the cart array to a JSON string and saves it in local storage
    saveCart() {
        localStorage.setItem("cart", JSON.stringify(this.cart));
    }

    // Loads the cart from local storage
    loadCart() {
        const data = localStorage.getItem("cart");
        this.cart = data ? JSON.parse(data) : [];
    }

    // Renders the cart in the specified DOM element
    // Clears the cart element and displays each product in the cart
    renderCart() {
        if (!this.cartElement) return;{
            this.cartElement.innerHTML = "";
        }

        if (this.cart.length === 0) {
            this.cartElement.innerHTML = "<p>Ingen produkter i handlekurven.</p>";
            return;
        }

        this.cart.forEach(product => {
            const div = document.createElement("div");
            div.className = "productView"
            div.innerHTML = `
                <div class="flexbox_info">
                    <div class="cartItem_image">
                        <img src="../bilder/testimage_online_store.webp" alt="${this.name}" class="cart_image">
                    </div>
                    <div class="cartItem_name">${product.name}</div> 
                    <div class="cartItem_price">${product.price} kr</div>
                </div>
                <div class="flexbox_btn">
                    <button>-</button>
                    <div class="displayCount">1</div>
                    <button>+</button>
                </div>
            `;
            this.cartElement.appendChild(div);
        });
    }
}

//
window.addEventListener('DOMContentLoaded', () => {

    // DOM element where products will be displayed
    const productList = document.getElementById("productList");
    const cart = new Cart("cart-products");
    const productsRef = ref(db, "product");

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
                <img src="../bilder/testimage_online_store.webp" alt="${this.name}" class="product_image">
                <div class="brand">${this.brand}</div>
                <div class="product_name">${this.name}</div>
                <div class="flex_price_cart">
                    <div class="price">${this.price} kr</div>
                    <button class="cart_btn" 
                    data-id="${this.id}"
                    data-name="${this.name}"
                    data-price="${this.price}">
                    <img src="../bilder/cart.png" alt="add to cart" class="cart_img">
                    </button>
                </div>
            `;
            return card;
            
        };
    }

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

            document.querySelectorAll(".cart_btn").forEach(button => {
                button.addEventListener("click", () => {
                    const product = {
                        id: button.dataset.id,
                        name: button.dataset.name,
                        price: button.dataset.price
                    };
                    cart.addProduct(product);
                });
            });
        } else {
            productList.innerHTML = "<p>No products available.</p>";
        }
    });
});

// Check if user is logged in and if user is admin or not
//Saves data in browsers memory
setPersistence(auth, browserLocalPersistence)
.then(() => {
    console.log("Auth persistence set to local");
})
.catch((error) => {
    console.error("Error setting auth persistence:", error);
});

//Check if user is logged in and if user is admin or not
onAuthStateChanged(auth, async (user) => {
if (!user) {
    console.log("User not logged in");

}
try {
        // Get the ID token result to check for custom claims
        const idTokenResult = await user.getIdTokenResult(true);
        console.log(idTokenResult.claims);
        const claims = idTokenResult.claims;

    // Check if the user has the admin claim
    if (claims.admin === true) {
        console.log("Admin user");

    } else {
        console.log("Regular user");
    }
} catch (error) {
    // Handle any errors that occur while getting the token claims
    console.error("Error getting token claims:", error);
}
});
