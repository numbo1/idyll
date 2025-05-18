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
        const existingProduct = this.cart.find(p => p.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1; // If product exists, increase quantity
        } else {
            product.quantity = 1;
            this.cart.push(product); // If product doesn't exist, add it to the cart
        }
        this.saveCart();
        this.renderCart();
    }

    // Adds on quantity to the product in the cart
    increaseQuantity(productId) {
        const product = this.cart.find(p => p.id === productId);
        if (product) {
            product.quantity += 1; // If product exists, increase quantity
            this.saveCart();
            this.renderCart();
        }
    }

    // Reduces one quantity to the product in the cart, if the quantity is 0, it removes the product from the cart
    reduceQuantity(productId) {
        const productIndex = this.cart.findIndex(p => p.id === productId);
        if (productIndex !== -1) {
            this.cart[productIndex].quantity -= 1; // If product exists, decrease quantity
            if (this.cart[productIndex].quantity <= 0) {
                this.cart.splice(productIndex, 1); // If quantity is 0 or below, remove product from cart
            }
            this.saveCart();
            this.renderCart();
        }
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
    if (!this.cartElement) return;

    
    if (this.cart.length === 0) {
        // Shows a message if the cart is empty
        this.cartElement.innerHTML = ""; // Clear the cart element
        if (!this.cartElement.querySelector(".empty-cart-msg")) {
            this.cartElement.innerHTML = '<p class="empty-cart-msg">Ingen produkter i handlekurven.</p>';
        }
        return;
    } else {
        // Remove the empty message if it exists and if the cart is not empty
        const emptyMsg = this.cartElement.querySelector(".empty-cart-msg");
        if (emptyMsg) emptyMsg.remove();
    }

    // Loops through the cart array and creates a div for each product
    this.cart.forEach(product => {
        let existingDiv = this.cartElement.querySelector(`.productView[data-id="${product.id}"]`);

        if (!existingDiv) {
            const div = document.createElement("div"); // Create a new div for the product
            div.className = "productView"; // Set class name for styling
            div.setAttribute("data-id", product.id); // Set data-id attribute for identification

            div.innerHTML = `
                <div class="flexbox_info">
                    <div class="cartItem_image">
                        <img src="../bilder/testimage_online_store.webp" alt="${product.name}" class="cart_image">
                    </div>
                    <div class="cartItem_name">${product.name}</div> 
                    <div class="cartItem_price">${product.price} kr</div>
                </div>
                <div class="flexbox_btn">
                    <button class="reduce" data-id="${product.id}">-</button>
                    <div class="displayCount">${product.quantity}</div>
                    <button class="increase" data-id="${product.id}">+</button>
                </div>
            `; // Set inner HTML for the product div

            this.cartElement.appendChild(div); // Append the product div to the cart element

            // Event listeners
            div.querySelector(".increase").addEventListener("click", () => {
                this.increaseQuantity(product.id);
            }); // Event listener for increase quantity button

            div.querySelector(".reduce").addEventListener("click", () => {
                this.reduceQuantity(product.id);
            }); // Event listener for reduce quantity button

        } else {
            // If the product div already exists, update the quantity display only
            const quantityDisplay = existingDiv.querySelector(".displayCount");
            if (quantityDisplay) {
                quantityDisplay.textContent = product.quantity; // If product exists, update quantity
            }
        }
    });

    // Remove products from the cart that are no longer in the cart array
    this.cartElement.querySelectorAll(".productView").forEach(div => {
        const productId = div.getAttribute("data-id");
        const stillInCart = this.cart.find(p => p.id === productId);
        if (!stillInCart) {
            div.remove(); // Remove the product div if the product is not in the cart array
        }
    });
}
}

// Happens when the DOM is fully loaded
window.addEventListener('DOMContentLoaded', () => {

    // DOM element where products will be displayed
    const productList = document.getElementById("productList");
    const cart = new Cart("cart-products");
    const productsRef = ref(db, "product");

    // Product class
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
        } // Constructor for the Product class

        // Renders the product card
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
            `; // Set inner HTML for the product card
            return card;
            
        };
    }

    // Fetch products from Firebase and render them
    onValue(productsRef, (snapshot) => {
        console.log("Snapshot:", snapshot.val());

        productList.innerHTML = ""; // Clear the list before rendering
        const products = snapshot.val();

        if (products) {
            Object.entries(products).forEach(([id, data]) => {
                console.log("Rendering product id:", id, data);
                const product = new Product(id, data);
                productList.appendChild(product.render());
            }); // If products exist, loop through them and render each product

            // Add event listeners to the cart buttons
            document.querySelectorAll(".cart_btn").forEach(button => {
                button.addEventListener("click", () => {
                    const product = {
                        id: button.dataset.id,
                        name: button.dataset.name,
                        price: button.dataset.price
                    }; // Create a product object from the button data
                    cart.addProduct(product); // Add product to the cart
                });
            });
        } else {
            productList.innerHTML = "<p>No products available.</p>";
        } // If no products exist, show a message
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
