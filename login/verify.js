const argon2 = require('argon2');

const passwordInput = document.getElementById("password").value;
const storedHashedPassword = "I am a hashed password";

async function verifyPassword() {
    try {
        if (await argon2.verify(storedHashedPassword, passwordInput)) {
            console.log("Password is correct!");
        } else {
            console.log("Invalid password");
        }
    } catch (error) {
        console.error("Error verifying password:", err);
    }
}

verifyPassword();