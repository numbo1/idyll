const argon2 = require('argon2');

const password = document.getElementById("password").value;

async function hashPassword() {
    try {
        // Hash the password
        const hashedPassword = await argon2.hash(password, {
            type: argon2.argon2id,
        });

        console.log("Hashed Password:", hashedPassword.value);
    } catch (err) {
        console.error("Error hashing password:", err);
    }
}

hashPassword();