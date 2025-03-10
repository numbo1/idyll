import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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

let currentUser = null;

onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log("Bruker er logget inn:", user.uid);
        currentUser = user;
    } else {
        console.log("Bruker er logget ut");
        currentUser = null;
    }
});

document.getElementById("account").addEventListener("click", async function () {
    if (currentUser) {
        try {
            const userDoc = await getDoc(doc(firestore, "users", currentUser.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                console.log("Bruker rolle:", userData.role);

                // Omdiriger til riktig side basert på brukerens rolle
                if (userData.role === "admin") {
                    window.location.href = "/public/nettbutikk/add_products.html";
                } else if (userData.role === "user") {
                    window.location.href = "/public/account/account.html";
                } else {
                    window.location.href = "/public/account/account.html";
                }
            } else {
                console.error("User document not found in Firestore.");
                window.location.href = "/public/account/account.html";
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            windows.location.href = "/public/account/account.html";
        }
    } else{
        // Bruker er ikke logget inn
        window.location.href = "/public/login/login.html";
    }
});