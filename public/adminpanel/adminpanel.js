 import { auth, onAuthStateChanged } from "../firebase.js";

        // Kick non authorized users out
        onAuthStateChanged(auth, async (user) => {
            // If user is notlogged in, redirect to login page
            if (!user) {
                window.location.href = "../index.html";
                return;
            }
            // If user is logged in, check if they are an admin
            try {
                const idTokenResult = await user.getIdTokenResult(true);
                const claims = idTokenResult.claims;

                // Check if the user has the admin claim
                if (claims.admin !== true) {
                    // If not an admin, redirect to index page
                    console.log("Not an admin");
                    window.location.href = "../index.html";
                } else {
                    console.log("Admin user");
                }
            } catch (error) {
                // Handle any errors that occur while getting the token claims
                // Redriects to index page anyways for security measures
                console.error("Error getting token claims:", error);
                window.location.href = "../index.html";
            }
        });