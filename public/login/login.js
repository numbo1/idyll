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
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      return signInWithEmailAndPassword(auth, email, password);
    })
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User signed in:", user);
      messageElement.style.color = "green";
      messageElement.textContent = "Du er nå logget inn";

      window.location.href = "../account/account.html";
    })
    .catch((error) => {
      console.error("Login error:", error);
      messageElement.style.color = "red";
      messageElement.textContent = `Feil: ${error.message}`;
    });
});