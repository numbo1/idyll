// Will be replaced by SQL
const users = [
    {username: "guri", password: "password"},
    {username: "bob", password: "password"}
];

const admins = [
    {username: "vanessa", password: "password"},
    {username: "ellen", password: "password"}
];

let userProfile = document.getElementById("username").value;
let loggedIn = false;
let isAdmin = false;

localStorage.setItem("loggedIn", "false");
localStorage.setItem("isAdmin", "false");


//Login validation function
function validateLogin(username, password) {
    const user = users.find((u) => u.username === username);
    if (user && user.password === password) {
        
        return "Du er nå logget inn"; // User is logged in
    }

    const admin = admins.find((a) => a.username === username);
    if (admin && admin.password === password) {
        return "Du er nå admin"; // Admin is logged in
    }

    return "Feil brukernavn eller passord"; // Incorrect username or password
};

//Event listener for login form at login.html
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const usernameInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;
    const messageElement = document.getElementById("message");

    //Validate login
    const result = validateLogin(usernameInput, passwordInput);
    if (result === "Du er nå admin") {
        messageElement.style.color = "green";
        messageElement.textContent = result;
        localStorage.setItem("isAdmin", "true");
        window.location.href = "/nettbutikk/nettbutikk.html";       
    } else if(result === "Du er nå logget inn") {
        messageElement.style.color = "green";
        messageElement.textContent = result;
        localStorage.setItem("loggedIn", "true");
        window.location.href = "/index.html";

    } else {
        messageElement.style.color = "red";
        messageElement.textContent = result;
    };


});