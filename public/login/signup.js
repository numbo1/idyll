import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
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



    document.getElementById("signupForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const emailInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;
    const passwordInput2 = document.getElementById("password2").value;
    const messageElement = document.getElementById("message");
    
    if (passwordInput !== passwordInput2) {
        messageElement.style.color = "red";
        messageElement.textContent = "Passordene er ikke like";
        return;
    }

    messageElement.style.color = "green";
    messageElement.textContent = "Passordene er like";

    createUserWithEmailAndPassword(auth, emailInput, passwordInput)
    .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log("Bruker opprettet:", user);
        messageElement.textContent = "Registrering vellykket!";
        
    })
    .catch((error) => {
        console.error("Feil ved registrering:", error.message);
        messageElement.style.color = "red";
        messageElement.textContent = `Feil: ${error.message}`;
    });

    


});