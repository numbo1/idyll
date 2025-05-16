// Import modules
import { auth, onAuthStateChanged, setPersistence, browserLocalPersistence } from "../firebase.js";
import { db, ref, get, set } from '../firebase.js';

// fetches the product ID from the URL
// This is used to identify which product to edit
const urlParams = new URLSearchParams(window.location.search);

// Get the productId from the URL
// Example URL: edit_product.html?productId=12345
const productId = urlParams.get('productId');

// Check if productId is present in the URL
get(productRef).then(snapshot => {
    if (snapshot.exists()) {
        const product = snapshot.val();
        // Populate the form fields with product data
        document.getElementById('productName').value = product.name || '';
        document.getElementById('productBrand').value = product.brand || '';
        document.getElementById('productLine').value = product.line || '';
        document.getElementById('productDescription').value = product.description || '';
        document.getElementById('productPrice').value = product.price || '';
        document.getElementById('productStock').value = product.stock || '';
    } else {
        // If the product does not exist, show a message
        document.getElementById('message').innerText = 'Produktet finnes ikke.';
    }
}).catch(error => {
    console.error('Feil ved henting av produkt:', error);
});

// Reference to the product in the database
document.getElementById('addProductForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const updatedProduct = {
        name: document.getElementById('productName').value,
        brand: document.getElementById('productBrand').value,
        line: document.getElementById('productLine').value,
        description: document.getElementById('productDescription').value,
        price: parseFloat(document.getElementById('productPrice').value),
        stock: parseInt(document.getElementById('productStock').value),
        // image: valgfritt – håndteres separat
    };

    try {
        await set(ref(db, `products/${productId}`), updatedProduct);
        document.getElementById('message').innerText = 'Produkt oppdatert!';
    } catch (error) {
        console.error('Feil ved oppdatering:', error);
        document.getElementById('message').innerText = 'Noe gikk galt.';
    }
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

