const argon2 = require('argon2');

argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16, // 64 MG
    timeCost: 4, // 4 iterations
    parallelism: 2 // 2 threads
});