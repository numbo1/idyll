//Importer moduler
import { initializeApp } from "./firebase.js";
import { auth, onAuthStateChanged, setPersistence, browserLocalPersistence } from "./firebase.js";

//Saves data in browsers memory
setPersistence(auth, browserLocalPersistence)
    .then(() => {
        console.log("Auth persistence set to local");
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
        return;
    }

    try {
            // Get the ID token result to check for custom claims
            const idTokenResult = await user.getIdTokenResult(true);
            const claims = idTokenResult.claims;

        if (claims.admin === true) {
            console.log("Admin user");

            // Changes the account href to account page
            document.getElementById("account").addEventListener("click", () => {
                window.location.href = "account/account.html";
            });
        
            // Adds admin panel to the navigation plane
            document.getElementById("navigation").innerHTML = `
            <a href="index.html" class="nav">Forside</a>
            <a href="#" class="nav">Bestille time</a>
            <a href="nettbutikk/nettbutikk.html" class="nav">Nettbutikk</a>
            <a href="#" class="nav">Kontakt</a>
            <a href="adminpanel/adminpanel.html" class="nav">Adminpanel</a>
            `;
        } else {
            console.log("Regular user");

            // Changes the account href to account page
            document.getElementById("account").addEventListener("click", () => {
                window.location.href = "account/account.html";
            });
        }
    } catch (error) {
        // Handle any errors that occur while getting the token claims
        console.error("Error getting token claims:", error);
    }
});
