// Import modules
import { auth, onAuthStateChanged, setPersistence, browserLocalPersistence } from "../firebase.js";
import { db, ref, get, set } from '../firebase.js';

// Set local auth persistence
setPersistence(auth, browserLocalPersistence)
    .then(() => {
        console.log("✅ Auth persistence set to local");
    })
    .catch((error) => {
        console.error("❌ Error setting auth persistence:", error);
    });

// Auth check and admin verification
onAuthStateChanged(auth, async (user) => {
    // If user is notlogged in, redirect to login page
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
            loadProductForEditing(); // Load product only if admin
        }
    } catch (error) {
        // Handle any errors that occur while getting the token claims
        // Redriects to index page anyways for security measures
        console.error("Error getting token claims:", error);
        window.location.href = "../index.html";
    }
});

// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

// Reference to the edit form
const form = document.getElementById("editProductForm");

// Load existing product data and insert data as input values
function loadProductForEditing() {
    const productRef = ref(db, `product/${productId}`);
    get(productRef)
        .then (snapshot => {
            if (snapshot.exists()) {
                const product = snapshot.val();

                // Fill form fields
                document.getElementById('productName').value = product.name || '';
                document.getElementById('productBrand').value = product.brand || '';
                document.getElementById('productLine').value = product.line || '';
                document.getElementById('productDescription').value = product.description || '';
                document.getElementById('productPrice').value = product.price || '';
                document.getElementById('productStock').value = product.stock || '';
            } else {
                ocument.getElementById('message').innerText = "Produktet finnes ikke.";
            }    
                
        })
        .catch(error => {
            console.error("Error loading product data:", error);
            document.getElementById('message').innerText = "Feil ved lasting av produktdata.";
        });
}

// Handle form submission
form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    const updatedProduct = {
        name : document.getElementById('productName').value,
        brand : document.getElementById('productBrand').value,
        line : document.getElementById('productLine').value,
        description : document.getElementById('productDescription').value,
        price : parseFloat(document.getElementById('productPrice').value),
        stock : parseInt(document.getElementById('productStock').value)
    };

    // Update product in Firebase
    try {
        const productRef = ref(db, `product/${productId}`);
        await set(productRef, updatedProduct);

        document.getElementById('message').innerText = `Produkt: ${productId} er oppdatert`;
        window.location.href = "products.html"; // Redirect to products page
    } catch (error) {
        console.error("Feil ved oppdatering:", error);
        document.getElementById('message').innerText = "Feil ved oppdatering av produkt.";
    }
});

// Cancel button event listener
document.getElementById("cancel").addEventListener("click", () => {
    window.location.href = "products.html";
});