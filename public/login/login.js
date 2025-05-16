// Import Firebase modules
import { auth, setPersistence, browserLocalPersistence} from "../firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Event listener for the login form submission
document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Get the email and password from the form inputs
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const messageElement = document.getElementById("message");

  // Validate email and password
  // Save data in browser's memory
  // This is done to keep the user logged in even after refreshing the page
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      // Get the email and password from the form inputs
      return signInWithEmailAndPassword(auth, email, password);
    })
    // Sign in the user
    // If the sign-in is successful, redirect to the account page
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User signed in:", user);
      messageElement.style.color = "green";
      messageElement.textContent = "Du er nå logget inn";

      window.location.href = "../account/account.html";
    })
    // If the sign-in fails, show an error message
    // and reset the form
    .catch((error) => {
      console.error("Login error:", error);
      messageElement.style.color = "red";
      messageElement.textContent = `Feil: ${error.message}`;
    });
});