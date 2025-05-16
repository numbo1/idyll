
document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById("cart");
    const cartProducts = document.getElementById("cart-products");

    cartIcon.addEventListener('click', (event) => {
        event.preventDefault(); // stop link navigation
        cartProducts.classList.toggle('show');
    });
    document.addEventListener('click', (event) => {
        const isClickInside = document.getElementById("cart-container").contains(event.target);
        if (!isClickInside) {
            cartProducts.classList.remove('show');
        }
    });
});


