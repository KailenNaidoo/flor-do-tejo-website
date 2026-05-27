// ===== Cart Management =====
const DELIVERY_FEE = 150;
const VAT_RATE = 0.15;

function getCart() {
    return JSON.parse(localStorage.getItem('fdtCart') || '[]');
}

function saveCart(cart) {
    localStorage.setItem('fdtCart', JSON.stringify(cart));
    updateCartCount();
}

function addToCart(productId, qty = 1) {
    const cart = getCart();
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.qty += qty;
    } else {
        const product = PRODUCTS.find(p => p.id === productId);
        if (product) {
            cart.push({ id: product.id, name: product.name, price: product.price, unit: product.unit, qty: qty });
        }
    }

    saveCart(cart);
    showAddedNotification(productId);
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
}

function updateCartQty(productId, qty) {
    const cart = getCart();
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.qty = Math.max(1, qty);
    }
    saveCart(cart);
}

function getCartSubtotal() {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
}

function getCartTotal() {
    const subtotal = getCartSubtotal();
    const vat = subtotal * VAT_RATE;
    return subtotal + DELIVERY_FEE + vat;
}

function getCartItemCount() {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + item.qty, 0);
}

function clearCart() {
    localStorage.removeItem('fdtCart');
    updateCartCount();
}

function updateCartCount() {
    const countElements = document.querySelectorAll('#cartCount');
    const count = getCartItemCount();
    countElements.forEach(el => {
        el.textContent = count;
    });
}

function showAddedNotification(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    // Remove existing notification
    const existing = document.querySelector('.cart-notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <span>&#x2713; ${product.name} added to cart</span>
        <a href="cart.html">View Cart</a>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

function formatPrice(amount) {
    return 'R' + amount.toFixed(2);
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});
