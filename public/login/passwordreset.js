import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

document.getElementById("pwdresetForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("username").value;
    const messageElement = document.getElementById("message");

    sendPasswordResetEmail(auth, email)
  .then(() => {
    document.getElementById("pwdresetForm").reset();
    messageElement.style.color = "green";
    messageElement.textContent = "Tilbakestilling av passord sendt!";
  })
  .catch((error) => {
    document.getElementById("pwdresetForm").reset();
    messageElement.style.color = "red";
    messageElement.textContent = `Feil: ${error.message}`;
  });
});