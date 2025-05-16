// Import Firebase modules
import { initializeApp } from "../firebase.js";
import { auth, createUserWithEmailAndPassword } from "../firebase.js";

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
        window.location.href = "../login/login.html";
        
    })
    .catch((error) => {
        // Handles registration errors
        document.getElementById("pwdresetForm").reset();
        console.error("Feil ved registrering:", error.message);
        messageElement.style.color = "red";
        messageElement.textContent = `Feil: ${error.message}`;
    });

    


});