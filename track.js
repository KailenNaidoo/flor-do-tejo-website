// ===== Order Tracking Logic =====
document.addEventListener('DOMContentLoaded', () => {
    renderRecentOrders();

    // Check if order ID is in URL params
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get('order');
    if (orderId) {
        document.getElementById('trackInput').value = orderId;
        trackOrder();
    }
});

function trackOrder() {
    const input = document.getElementById('trackInput');
    const orderId = input.value.trim().toUpperCase();

    if (!orderId) {
        alert('Please enter an order number.');
        return;
    }

    const orders = JSON.parse(localStorage.getItem('fdtOrders') || '[]');
    const order = orders.find(o => o.id === orderId);

    const resultEl = document.getElementById('trackResult');
    const notFoundEl = document.getElementById('trackNotFound');

    if (!order) {
        resultEl.style.display = 'none';
        notFoundEl.style.display = 'block';
        return;
    }

    notFoundEl.style.display = 'none';
    resultEl.style.display = 'block';

    // Populate order info
    document.getElementById('trackOrderId').textContent = order.id;
    document.getElementById('trackOrderDate').textContent = formatDate(order.createdAt);

    // Determine current status based on time
    const now = new Date();
    let currentStatus = 'confirmed';
    let activeStepIndex = 0;

    const statusOrder = ['confirmed', 'preparing', 'checked', 'out-for-delivery', 'delivered'];

    order.statusHistory.forEach((entry, index) => {
        const entryTime = new Date(entry.time);
        if (entryTime <= now) {
            currentStatus = entry.status;
            activeStepIndex = index;
        }
    });

    // Update status badge
    const badge = document.getElementById('trackStatusBadge');
    const statusLabels = {
        'confirmed': 'Order Confirmed',
        'preparing': 'Being Prepared',
        'checked': 'Quality Check',
        'out-for-delivery': 'Out for Delivery',
        'delivered': 'Delivered'
    };
    badge.textContent = statusLabels[currentStatus] || currentStatus;
    badge.className = 'track-status-badge status-' + currentStatus;

    // Update timeline
    for (let i = 1; i <= 5; i++) {
        const step = document.getElementById(`timelineStep${i}`);
        const connector = document.getElementById(`connector${i}`);

        if (i - 1 <= activeStepIndex) {
            step.classList.add('completed');
            step.classList.remove('upcoming');
        } else if (i - 1 === activeStepIndex + 1) {
            step.classList.add('active');
            step.classList.remove('completed', 'upcoming');
        } else {
            step.classList.add('upcoming');
            step.classList.remove('completed', 'active');
        }

        if (connector) {
            if (i - 1 < activeStepIndex) {
                connector.classList.add('completed');
            } else {
                connector.classList.remove('completed');
            }
        }
    }

    // Update times
    const timeIds = ['timeConfirmed', 'timePreparing', 'timeChecked', 'timeDelivery', 'timeDelivered'];
    order.statusHistory.forEach((entry, index) => {
        const el = document.getElementById(timeIds[index]);
        if (el) {
            const entryTime = new Date(entry.time);
            if (entryTime <= now) {
                el.textContent = formatTime(entry.time);
            } else {
                el.textContent = 'Estimated: ' + formatTime(entry.time);
            }
        }
    });

    // Order details
    document.getElementById('trackAddress').innerHTML = `
        ${order.customer.address}<br>
        ${order.customer.city}, ${order.customer.postalCode}
    `;

    document.getElementById('trackItems').innerHTML = order.items.map(item =>
        `<div class="track-item">${item.name} x${item.qty} — ${formatPrice(item.price * item.qty)}</div>`
    ).join('');

    document.getElementById('trackTotal').textContent = formatPrice(order.total);
}

function renderRecentOrders() {
    const orders = JSON.parse(localStorage.getItem('fdtOrders') || '[]');
    const listEl = document.getElementById('ordersList');
    const recentEl = document.getElementById('recentOrders');

    if (!listEl || orders.length === 0) {
        if (recentEl) recentEl.style.display = 'none';
        return;
    }

    recentEl.style.display = 'block';

    // Show most recent first
    const sorted = [...orders].reverse().slice(0, 5);

    listEl.innerHTML = sorted.map(order => {
        const now = new Date();
        let currentStatus = 'confirmed';
        order.statusHistory.forEach(entry => {
            if (new Date(entry.time) <= now) {
                currentStatus = entry.status;
            }
        });

        const statusLabels = {
            'confirmed': 'Confirmed',
            'preparing': 'Preparing',
            'checked': 'Quality Check',
            'out-for-delivery': 'Out for Delivery',
            'delivered': 'Delivered'
        };

        return `
            <div class="order-row" onclick="selectOrder('${order.id}')">
                <div class="order-row-info">
                    <strong>${order.id}</strong>
                    <span>${formatDate(order.createdAt)}</span>
                </div>
                <div class="order-row-status">
                    <span class="status-pill status-${currentStatus}">${statusLabels[currentStatus]}</span>
                    <span class="order-row-total">${formatPrice(order.total)}</span>
                </div>
            </div>
        `;
    }).join('');
}

function selectOrder(orderId) {
    document.getElementById('trackInput').value = orderId;
    trackOrder();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatTime(isoString) {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' }) +
        ', ' + date.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' });
}
