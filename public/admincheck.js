import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
  

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

setPersistence(auth, browserLocalPersistence)
    .then(() => {
        console.log("✅ Auth persistence set to local");
    })
    .catch((error) => {
        console.error("Error setting auth persistence:", error);
    });

document.getElementById("account").addEventListener("click", async function () {
    const user = auth.currentUser;
    if (!user) {
        console.log("⛔ User not logged in");
        window.location.href = "login/login.html";
        return;
    }

    try {
        const idTokenResult = await user.getIdTokenResult(true);
        const claims = idTokenResult.claims;

        if (claims.admin === true) {
            console.log("✅ User is admin");
            window.location.href = "adminpanel/adminpanel.html";
        } else {
            console.log("👤 User is NOT admin");
            window.location.href = "account/account.html";
        }
    } catch (error) {
        console.error("Error getting token claims:", error);
    }
});
