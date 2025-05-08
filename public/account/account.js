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

let currentUser = null;

// Logout event listener
document.getElementById("logout-button").addEventListener("click", async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
      window.location.href = "../index.html";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  });

// Checks if user is signed in and fetches user data for form fields
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
          document.getElementById("firstname").placeholder = userData.firstname;
          document.getElementById("lastname").placeholder = userData.lastname;
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