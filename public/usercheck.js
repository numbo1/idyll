//Importer moduler
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

//Konfigurering av firebase
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

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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

        //Changes the account button to login button
        document.getElementById("account").addEventListener("click", () => {
            window.location.href = "login/login.html";
        });
        
    }

    try {
            // Get the ID token result to check for custom claims
            const idTokenResult = await user.getIdTokenResult(true);
            const claims = idTokenResult.claims;

        if (claims.admin === true) {
            console.log("Admin user");

            // Changes the account href to account page
            document.getElementById("account").addEventListener("click", () => {
                window.location.href = "../account/account.html";
            });

            // Adds admin panel to the navigation plane
            document.getElementById("navigation").innerHTML = `
            <a href="../index.html" class="nav">Forside</a>
            <a href="#" class="nav">Bestille time</a>
            <a href="../nettbutikk/nettbutikk.html" class="nav">Nettbutikk</a>
            <a href="#" class="nav">Prisliste</a>
            <a href="#" class="nav">Galleri</a>
            <a href="#" class="nav">Kontakt</a>
            <a href="../adminpanel/adminpanel.html" class="nav">Adminpanel</a>
            `;
        } else {
            console.log("Regular user");

            // Changes the account href to account page
            document.getElementById("account").addEventListener("click", () => {
                window.location.href = "../account/account.html";
            });
        }
    } catch (error) {
        // Handle any errors that occur while getting the token claims
        console.error("Error getting token claims:", error);
    }
});
