// Toggles and untoggles cart on click eventlistener
document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById("cart");
    const cartProducts = document.getElementById("cart-products");

    cartIcon.addEventListener('click', (event) => {
        event.preventDefault(); // stop link navigation
        cartProducts.classList.toggle('show');
    });
    // Close the cart if the user clicks outside of it
    document.addEventListener('click', (event) => {
        const isClickInside = document.getElementById("cart-container").contains(event.target);
        if (!isClickInside) {
            cartProducts.classList.remove('show');
        }
    });
});


