//Importer moduler
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
        console.log("❌ User not logged in");

        // Endre knapp til login
        accountBtn.addEventListener("click", () => {
            window.location.href = "login/login.html";
        });

        return; // Viktig! Stopper resten av koden!
    }

    console.log("✅ User is logged in");

    try {
        const idTokenResult = await user.getIdTokenResult(true);
        const claims = idTokenResult.claims;

        if (claims.admin === true) {
            console.log("👑 Admin user");

            accountBtn.addEventListener("click", () => {
                window.location.href = "../account/account.html";
            });

            navigation.innerHTML = `
                <a href="../index.html" class="nav">Forside</a>
                <a href="#" class="nav">Bestille time</a>
                <a href="../nettbutikk/nettbutikk.html" class="nav">Nettbutikk</a>
                <a href="#" class="nav">Kontakt</a>
                <a href="../adminpanel/adminpanel.html" class="nav">Adminpanel</a>
            `;
        } else {
            console.log("🧍‍♂️ Regular user");

            accountBtn.addEventListener("click", () => {
                window.location.href = "../account/account.html";
            });
        }
    } catch (error) {
        console.error("⚠️ Error getting token claims:", error);
    }
});
