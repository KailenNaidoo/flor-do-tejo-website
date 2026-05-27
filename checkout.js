// ===== Checkout Logic =====
let currentStep = 1;

document.addEventListener('DOMContentLoaded', () => {
    renderCheckoutSummary();
    setupPaymentToggle();
    setupCardFormatting();
});

function renderCheckoutSummary() {
    const cart = getCart();
    const itemsEl = document.getElementById('checkoutItems');
    if (!itemsEl) return;

    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }

    itemsEl.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <span>${item.name} x${item.qty}</span>
            <span>${formatPrice(item.price * item.qty)}</span>
        </div>
    `).join('');

    const subtotal = getCartSubtotal();
    const vat = subtotal * VAT_RATE;
    const total = subtotal + DELIVERY_FEE + vat;

    document.getElementById('checkoutSubtotal').textContent = formatPrice(subtotal);
    document.getElementById('checkoutVat').textContent = formatPrice(vat);
    document.getElementById('checkoutTotal').textContent = formatPrice(total);
}

function setupPaymentToggle() {
    const radios = document.querySelectorAll('input[name="paymentMethod"]');
    radios.forEach(radio => {
        radio.addEventListener('change', () => {
            document.getElementById('cardDetails').style.display = radio.value === 'card' ? 'block' : 'none';
            document.getElementById('eftDetails').style.display = radio.value === 'eft' ? 'block' : 'none';
        });
    });
}

function setupCardFormatting() {
    const cardNumber = document.getElementById('cardNumber');
    if (cardNumber) {
        cardNumber.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(.{4})/g, '$1 ').trim();
            e.target.value = value;
        });
    }

    const cardExpiry = document.getElementById('cardExpiry');
    if (cardExpiry) {
        cardExpiry.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2);
            }
            e.target.value = value;
        });
    }
}

function nextStep(step) {
    // Validate current step
    if (step === 2 && !validateDelivery()) return;
    if (step === 3 && !validatePayment()) return;

    // If going to step 3, populate review
    if (step === 3) {
        populateReview();
    }

    currentStep = step;
    updateStepUI();
}

function prevStep(step) {
    currentStep = step;
    updateStepUI();
}

function updateStepUI() {
    // Update step indicators
    document.querySelectorAll('.checkout-steps .step').forEach(el => {
        const s = parseInt(el.dataset.step);
        el.classList.toggle('active', s === currentStep);
        el.classList.toggle('completed', s < currentStep);
    });

    // Show/hide form steps
    document.querySelectorAll('.form-step').forEach((el, i) => {
        el.classList.toggle('active', i + 1 === currentStep);
    });
}

function validateDelivery() {
    const fields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'postalCode'];
    let valid = true;

    fields.forEach(field => {
        const input = document.getElementById(field);
        if (!input.value.trim()) {
            input.classList.add('error');
            valid = false;
        } else {
            input.classList.remove('error');
        }
    });

    if (!valid) {
        alert('Please fill in all required delivery fields.');
    }
    return valid;
}

function validatePayment() {
    const method = document.querySelector('input[name="paymentMethod"]:checked').value;

    if (method === 'card') {
        const cardName = document.getElementById('cardName').value.trim();
        const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
        const cardExpiry = document.getElementById('cardExpiry').value.trim();
        const cardCvv = document.getElementById('cardCvv').value.trim();

        if (!cardName || cardNumber.length < 16 || cardExpiry.length < 5 || cardCvv.length < 3) {
            alert('Please fill in all card details correctly.');
            return false;
        }
    }
    return true;
}

function populateReview() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const postalCode = document.getElementById('postalCode').value;
    const phone = document.getElementById('phone').value;
    const company = document.getElementById('company').value;

    document.getElementById('reviewDelivery').innerHTML = `
        <p><strong>${firstName} ${lastName}</strong></p>
        ${company ? `<p>${company}</p>` : ''}
        <p>${address}</p>
        <p>${city}, ${postalCode}</p>
        <p>${phone}</p>
    `;

    const method = document.querySelector('input[name="paymentMethod"]:checked').value;
    const methodLabels = { card: 'Credit / Debit Card', eft: 'EFT / Bank Transfer', cod: 'Cash on Delivery' };
    document.getElementById('reviewPayment').innerHTML = `<p>${methodLabels[method]}</p>`;

    const cart = getCart();
    const subtotal = getCartSubtotal();
    const vat = subtotal * VAT_RATE;
    const total = subtotal + DELIVERY_FEE + vat;

    document.getElementById('reviewItems').innerHTML = `
        ${cart.map(item => `
            <div class="review-item">
                <span>${item.name} x${item.qty}</span>
                <span>${formatPrice(item.price * item.qty)}</span>
            </div>
        `).join('')}
        <div class="review-item total">
            <span><strong>Total</strong></span>
            <span><strong>${formatPrice(total)}</strong></span>
        </div>
    `;
}

function placeOrder() {
    const btn = document.getElementById('placeOrderBtn');
    btn.textContent = 'Processing...';
    btn.disabled = true;

    // Simulate payment processing
    setTimeout(() => {
        const order = createOrder();
        clearCart();

        // Show success modal
        document.getElementById('orderNumber').textContent = order.id;
        document.getElementById('successModal').style.display = 'flex';
    }, 2000);
}

function createOrder() {
    const orders = JSON.parse(localStorage.getItem('fdtOrders') || '[]');
    const cart = getCart();
    const subtotal = getCartSubtotal();
    const vat = subtotal * VAT_RATE;
    const total = subtotal + DELIVERY_FEE + vat;

    const orderNumber = 'FDT-2026-' + String(orders.length + 1).padStart(3, '0');
    const now = new Date();

    const order = {
        id: orderNumber,
        items: cart,
        subtotal: subtotal,
        delivery: DELIVERY_FEE,
        vat: vat,
        total: total,
        status: 'confirmed',
        statusHistory: [
            { status: 'confirmed', time: now.toISOString(), label: 'Order Confirmed' }
        ],
        customer: {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            company: document.getElementById('company').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            postalCode: document.getElementById('postalCode').value,
            notes: document.getElementById('deliveryNotes').value
        },
        paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value,
        createdAt: now.toISOString()
    };

    // Simulate order progression (for demo purposes)
    simulateOrderProgress(order);

    orders.push(order);
    localStorage.setItem('fdtOrders', JSON.stringify(orders));

    return order;
}

function simulateOrderProgress(order) {
    const now = new Date();

    // Add future status updates for demo
    const preparing = new Date(now.getTime() + 15 * 60000); // 15 min
    const checked = new Date(now.getTime() + 45 * 60000); // 45 min
    const outForDelivery = new Date(now.getTime() + 90 * 60000); // 1.5 hours
    const delivered = new Date(now.getTime() + 150 * 60000); // 2.5 hours

    order.statusHistory.push(
        { status: 'preparing', time: preparing.toISOString(), label: 'Being Prepared' },
        { status: 'checked', time: checked.toISOString(), label: 'Quality Check' },
        { status: 'out-for-delivery', time: outForDelivery.toISOString(), label: 'Out for Delivery' },
        { status: 'delivered', time: delivered.toISOString(), label: 'Delivered' }
    );
}
