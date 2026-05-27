// ===== Order Page Logic =====
document.addEventListener('DOMContentLoaded', () => {
    renderProducts('all');
    setupFilters();
});

function renderProducts(category) {
    const grid = document.getElementById('shopGrid');
    if (!grid) return;

    const filtered = category === 'all'
        ? PRODUCTS
        : PRODUCTS.filter(p => p.category === category);

    grid.innerHTML = filtered.map(product => `
        <div class="shop-card" data-category="${product.category}">
            <div class="shop-card-image ${product.category}-bg">
                <span class="shop-emoji">${product.emoji}</span>
            </div>
            <div class="shop-card-body">
                <h4>${product.name}</h4>
                <p class="shop-description">${product.description}</p>
                <div class="shop-card-footer">
                    <div class="shop-price">
                        <span class="price">${formatPrice(product.price)}</span>
                        <span class="unit">${product.unit}</span>
                    </div>
                    <div class="shop-qty">
                        <button class="qty-btn" onclick="changeQty(${product.id}, -1)">-</button>
                        <input type="number" id="qty-${product.id}" value="1" min="1" max="100" class="qty-input">
                        <button class="qty-btn" onclick="changeQty(${product.id}, 1)">+</button>
                    </div>
                </div>
                <button class="btn btn-add-cart" onclick="addProductToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

function setupFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProducts(btn.dataset.category);
        });
    });
}

function changeQty(productId, delta) {
    const input = document.getElementById(`qty-${productId}`);
    if (input) {
        let val = parseInt(input.value) + delta;
        if (val < 1) val = 1;
        if (val > 100) val = 100;
        input.value = val;
    }
}

function addProductToCart(productId) {
    const input = document.getElementById(`qty-${productId}`);
    const qty = input ? parseInt(input.value) : 1;
    addToCart(productId, qty);
    // Reset qty input
    if (input) input.value = 1;
}
