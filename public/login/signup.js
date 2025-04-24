// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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

// Event listener for the signup form submission
document.getElementById("signupForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get the email and password from the form inputs
    const emailInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;
    const passwordInput2 = document.getElementById("password2").value;
    const messageElement = document.getElementById("message");
    
    // Check if passwords are identical
    if (passwordInput !== passwordInput2) {
        messageElement.style.color = "red";
        messageElement.textContent = "Passordene er ikke like";
        return;
    }

    // If passwords are identical
    messageElement.style.color = "green";
    messageElement.textContent = "Passordene er like";

    // Create user with email and password
    createUserWithEmailAndPassword(auth, emailInput, passwordInput)
    .then((userCredential) => {
        // Signed up, sends user to login page
        const user = userCredential.user;
        console.log("Bruker opprettet:", user);
        messageElement.textContent = "Registrering vellykket!";
        window.location.href = "/public/login/login.html";
        
    })
    .catch((error) => {
        // Handles registration errors
        document.getElementById("pwdresetForm").reset();
        console.error("Feil ved registrering:", error.message);
        messageElement.style.color = "red";
        messageElement.textContent = `Feil: ${error.message}`;
    });

    


});