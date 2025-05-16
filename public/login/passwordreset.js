// Import Firebase modules
import { initializeApp } from "../firebase.js";
import { getAuth, sendPasswordResetEmail } from "../firebase.js";

const auth = getAuth();
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