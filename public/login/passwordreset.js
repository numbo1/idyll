// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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
const auth = getAuth(app);

// Event listener for the password reset form submission
document.getElementById("pwdresetForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get the email from the form input
    const email = document.getElementById("username").value;
    const messageElement = document.getElementById("message");

    // Validate email and send password reset email
    sendPasswordResetEmail(auth, email)
  .then(() => {
    // Reset form and show success message
    document.getElementById("pwdresetForm").reset();
    messageElement.style.color = "green";
    messageElement.textContent = "Tilbakestilling av passord sendt!";
  })
  .catch((error) => {
    // Handles errors
    document.getElementById("pwdresetForm").reset();
    messageElement.style.color = "red";
    messageElement.textContent = `Feil: ${error.message}`;
  });
});