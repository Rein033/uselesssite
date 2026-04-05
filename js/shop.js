// ===== PRODUCTS (geladen vanuit /data/products.json) =====
let PRODUCTS = [];

async function loadProducts() {
  const res = await fetch('/data/products.json');
  PRODUCTS = await res.json();
}

// ===== CART =====
function getCart() {
  return JSON.parse(localStorage.getItem('gp_cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('gp_cart', JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(productId, color, qty = 1) {
  const cart = getCart();
  const existing = cart.find(i => i.id === productId && i.color === color);
  if (existing) {
    existing.qty += qty;
  } else {
    const product = PRODUCTS.find(p => p.id === productId);
    cart.push({ id: productId, name: product.name, price: product.price, emoji: product.emoji, color, qty });
  }
  saveCart(cart);
}

function removeFromCart(productId, color) {
  const cart = getCart().filter(i => !(i.id === productId && i.color === color));
  saveCart(cart);
}

function updateQty(productId, color, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId && i.color === color);
  if (item) {
    if (qty <= 0) { removeFromCart(productId, color); return; }
    item.qty = qty;
    saveCart(cart);
  }
}

function clearCart() {
  localStorage.removeItem('gp_cart');
  updateCartBadge();
}

function cartTotal() {
  return getCart().reduce((sum, i) => sum + i.price * i.qty, 0);
}

function cartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}

function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (badge) {
    const count = cartCount();
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}

// ===== RENDER HELPERS =====
function productCard(p) {
  return `
    <div class="product-card ${p.popular ? 'popular' : ''} ${!p.inStock ? 'out-of-stock' : ''}" data-id="${p.id}" onclick="openProduct(${p.id})">
      ${p.popular ? '<div class="badge">HOT</div>' : ''}
      ${!p.inStock ? '<div class="badge" style="background:var(--green)">UITVERKOCHT</div>' : ''}
      <div class="product-emoji">${p.emoji}</div>
      <div class="product-name">${p.name}</div>
      <div class="product-cat">${p.category}</div>
      <div class="product-price">€${Number(p.price).toFixed(2)}</div>
      <button class="add-btn" ${!p.inStock ? 'disabled' : ''} onclick="event.stopPropagation(); quickAdd(${p.id})">
        ${p.inStock ? 'IN WINKELWAGEN' : 'UITVERKOCHT'}
      </button>
    </div>
  `;
}

function quickAdd(id) {
  const p = PRODUCTS.find(p => p.id === id);
  addToCart(id, p.colors[0]);
  showToast(`${p.emoji} ${p.name} toegevoegd!`);
}

function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

// ===== MODAL =====
function openProduct(id) {
  const p = PRODUCTS.find(p => p.id === id);
  document.getElementById('modal-body').innerHTML = `
    <div class="modal-emoji">${p.emoji}</div>
    <h2 class="modal-name">${p.name}</h2>
    <div class="modal-cat">${p.category}</div>
    <p class="modal-desc">${p.description}</p>
    <div class="modal-price">€${Number(p.price).toFixed(2)}</div>
    <div class="modal-options">
      <label>Kleur:</label>
      <select id="modal-color">
        ${p.colors.map(c => `<option value="${c}">${c}</option>`).join('')}
      </select>
      <label>Aantal:</label>
      <div class="qty-row">
        <button onclick="document.getElementById('modal-qty').stepDown()">−</button>
        <input type="number" id="modal-qty" value="1" min="1" max="99">
        <button onclick="document.getElementById('modal-qty').stepUp()">+</button>
      </div>
    </div>
    <button class="modal-add" onclick="modalAdd(${p.id})">🛒 IN WINKELWAGEN</button>
  `;
  document.getElementById('modal').style.display = 'flex';
}

function modalAdd(id) {
  const color = document.getElementById('modal-color').value;
  const qty = parseInt(document.getElementById('modal-qty').value) || 1;
  const p = PRODUCTS.find(p => p.id === id);
  addToCart(id, color, qty);
  closeModal();
  showToast(`${p.emoji} ${p.name} toegevoegd!`);
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

// ===== INIT SHOP =====
async function initShop() {
  await loadProducts();
  updateCartBadge();

  const grid = document.getElementById('product-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  let activeFilter = 'all';

  function render(filter) {
    const filtered = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);
    grid.innerHTML = filtered.length
      ? filtered.map(productCard).join('')
      : '<p style="text-align:center;opacity:.5;font-size:10px;padding:40px;">Geen producten gevonden.</p>';
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      render(activeFilter);
    });
  });

  render('all');

  document.getElementById('modal').addEventListener('click', e => {
    if (e.target === document.getElementById('modal')) closeModal();
  });
}

// ===== INIT CART =====
function initCart() {
  updateCartBadge();
  renderCart();
}

function renderCart() {
  const cart = getCart();
  const container = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');

  if (cart.length === 0) {
    container.innerHTML = '<div class="empty-cart">Je winkelwagen is leeg 😔<br><a href="/">Bekijk patches</a></div>';
    totalEl.textContent = '€0.00';
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-emoji">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-color">Kleur: ${item.color}</div>
        <div class="cart-item-price">€${item.price.toFixed(2)} per stuk</div>
      </div>
      <div class="cart-item-controls">
        <button onclick="changeQty(${item.id}, '${item.color}', -1)">−</button>
        <span>${item.qty}</span>
        <button onclick="changeQty(${item.id}, '${item.color}', 1)">+</button>
        <button class="remove-btn" onclick="removeItem(${item.id}, '${item.color}')">✕</button>
      </div>
      <div class="cart-item-subtotal">€${(item.price * item.qty).toFixed(2)}</div>
    </div>
  `).join('');

  totalEl.textContent = `€${cartTotal().toFixed(2)}`;
}

function changeQty(id, color, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === id && i.color === color);
  if (item) updateQty(id, color, item.qty + delta);
  renderCart();
}

function removeItem(id, color) {
  removeFromCart(id, color);
  renderCart();
}

function submitOrder() {
  const cart = getCart();
  if (cart.length === 0) return;

  const name    = document.getElementById('order-name').value.trim();
  const email   = document.getElementById('order-email').value.trim();
  const address = document.getElementById('order-address').value.trim();
  const notes   = document.getElementById('order-notes').value.trim();

  if (!name || !email || !address) {
    showToast('Vul alle verplichte velden in!');
    return;
  }

  const orderLines = cart.map(i => `${i.qty}x ${i.name} (${i.color}) - €${(i.price * i.qty).toFixed(2)}`).join('\n');
  const total = cartTotal().toFixed(2);
  const subject = encodeURIComponent(`Nieuwe Bestelling — €${total}`);
  const body = encodeURIComponent(`Naam: ${name}\nEmail: ${email}\nAdres: ${address}\n\nBestelling:\n${orderLines}\n\nTotaal: €${total}\n\nOpmerkingen: ${notes}`);

  window.location.href = `mailto:orders@gunpatch.nl?subject=${subject}&body=${body}`;

  setTimeout(() => {
    clearCart();
    document.getElementById('order-success').style.display = 'block';
    document.getElementById('checkout-form').style.display = 'none';
  }, 1000);
}
