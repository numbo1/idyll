// Importing Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
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




// Logout event listener
document.getElementById("cancel").addEventListener("click", async () => {
    try {
      console.log("User canceled the action");
      window.location.href = "products.html";
    } catch (error) {
      console.error("Error canceling action:", error);
    }
});

function addProduct(brand, line, name, price, description, image, stock) {
  const productsRef = ref(db, 'products');

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

document.getElementById("addProductForm").addEventListener("click", (e) => {
  e.preventDefault(); // Prevent the default form submission

  const brand = document.getElementById("productBrand").value;
  const line = document.getElementById("productLine").value;
  const name = document.getElementById("productName").value;
  const price = document.getElementById("productPrice").value;
  const description = document.getElementById("productDescription").value;
  const image = document.getElementById("productImage").value;
  const stock = document.getElementById("productStock").value;

  addProduct(brand, line, name, price, description, image, stock);


});

onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser = user;
      const uid = user.uid;
      console.log("User is signed in:", uid);
  
      // Fetch user data from the database
      const dbRef = ref(db);
      get(child(dbRef, `users/${uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
        } else {
          console.log("No data available for this user.");
        }
      }).catch((error) => {
        console.error("Error fetching user data:", error);
      });
    } else {
      console.log("No user is signed in.");
    }
});
  
// Event listener for the form submission for updating user data
document.getElementById("updateForm").addEventListener("submit", async (event) => {
  event.preventDefault();
    
  if (currentUser) {  // Check if the user is logged in
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
  
    // Store the updated data in the database
    try {
        const userRef = ref(db, "users/" + currentUser.uid);
        await set(userRef, {
            firstname: firstname,
            lastname: lastname
        });
  
        console.log("User data updated successfully");
        location.reload(); // Reload the page to reflect changes
          
    } catch (error) {
        console.error("Error updating user data:", error);
    }
} else {
    console.error("No user is logged in to update data.");
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
          console.log("User not logged in");
          windows.location.href = "../index.html";
      }
  
      try {
              // Get the ID token result to check for custom claims
              const idTokenResult = await user.getIdTokenResult(true);
              const claims = idTokenResult.claims;
  
          if (claims.admin === true) {
              console.log("Admin user");
  
              
          } else {
              console.log("Regular user");
              windows.location.href = "../index.html";
          }
      } catch (error) {
          // Handle any errors that occur while getting the token claims
          console.error("Error getting token claims:", error);
      }
  });