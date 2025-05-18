//Import modules
import { initializeApp } from "./firebase.js";
import { auth, onAuthStateChanged, setPersistence, browserLocalPersistence } from "./firebase.js";

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
    const accountBtn = document.getElementById("account");
    const navigation = document.getElementById("navigation");

    if (!user) {
        console.log("User not logged in");

        // Change button to login button
        accountBtn.addEventListener("click", () => {
            window.location.href = "../login/login.html";
        });

        return; 
    }

    console.log("User is logged in");

    try {
        // Get the ID token result to check for custom claims
        // This will include the admin claim if it exists
        const idTokenResult = await user.getIdTokenResult(true);
        const claims = idTokenResult.claims;

        if (claims.admin === true) {
            console.log("Admin user");

            // Change button to admin panel button
            accountBtn.addEventListener("click", () => {
                window.location.href = "../account/account.html";
            });

            // Add admin navigation links
            navigation.innerHTML = `
                <a href="../index.html" class="nav">Forside</a>
                <a href="#" class="nav">Bestille time</a>
                <a href="../nettbutikk/nettbutikk.html" class="nav">Nettbutikk</a>
                <a href="#" class="nav">Kontakt</a>
                <a href="../adminpanel/adminpanel.html" class="nav">Adminpanel</a>
            `;
        } else {
            console.log("Regular user");
            // Change button to account button
            accountBtn.addEventListener("click", () => {
                window.location.href = "../account/account.html";
            });
        }
    } catch (error) {
        console.error("⚠️ Error getting token claims:", error);
    }
});
