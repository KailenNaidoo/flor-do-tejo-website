// ===== Cart Page Logic =====
document.addEventListener('DOMContentLoaded', () => {
    renderCartPage();
});

function renderCartPage() {
    const cart = getCart();
    const cartItemsEl = document.getElementById('cartItems');
    const cartSummaryEl = document.getElementById('cartSummary');
    const emptyCartEl = document.getElementById('emptyCart');

    if (!cartItemsEl) return;

    if (cart.length === 0) {
        cartItemsEl.style.display = 'none';
        cartSummaryEl.style.display = 'none';
        emptyCartEl.style.display = 'block';
        return;
    }

    emptyCartEl.style.display = 'none';
    cartItemsEl.style.display = 'block';
    cartSummaryEl.style.display = 'block';

    cartItemsEl.innerHTML = `
        <div class="cart-header-row">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
            <span></span>
        </div>
        ${cart.map(item => `
            <div class="cart-item-row">
                <div class="cart-item-name">
                    <strong>${item.name}</strong>
                    <small>${item.unit}</small>
                </div>
                <div class="cart-item-price">${formatPrice(item.price)}</div>
                <div class="cart-item-qty">
                    <button class="qty-btn" onclick="updateQty(${item.id}, ${item.qty - 1})">-</button>
                    <span>${item.qty}</span>
                    <button class="qty-btn" onclick="updateQty(${item.id}, ${item.qty + 1})">+</button>
                </div>
                <div class="cart-item-total">${formatPrice(item.price * item.qty)}</div>
                <button class="cart-remove-btn" onclick="removeItem(${item.id})" aria-label="Remove item">&times;</button>
            </div>
        `).join('')}
    `;

    // Update summary
    const subtotal = getCartSubtotal();
    const vat = subtotal * VAT_RATE;
    const total = subtotal + DELIVERY_FEE + vat;

    document.getElementById('subtotal').textContent = formatPrice(subtotal);
    document.getElementById('vatAmount').textContent = formatPrice(vat);
    document.getElementById('totalAmount').textContent = formatPrice(total);
}

function updateQty(productId, newQty) {
    if (newQty < 1) {
        removeItem(productId);
        return;
    }
    updateCartQty(productId, newQty);
    renderCartPage();
}

function removeItem(productId) {
    removeFromCart(productId);
    renderCartPage();
}

function goToCheckout() {
    const cart = getCart();
    if (cart.length === 0) return;
    window.location.href = 'checkout.html';
}
