// ===== PRODUCT DATA =====
const PRODUCTS = [
  {
    id: 1,
    name: "Flexi Dragon",
    category: "toys",
    price: 11.99,
    description: "Fully articulated dragon that moves in your hand. Printed in flexible segments. A desk classic.",
    emoji: "🐉",
    colors: ["Red", "Green", "Blue", "Black", "Purple"],
    inStock: true,
    popular: true
  },
  {
    id: 2,
    name: "Articulated Octopus",
    category: "toys",
    price: 13.99,
    description: "Eight wiggly legs, endless fun. Each tentacle moves independently. Great fidget toy.",
    emoji: "🐙",
    colors: ["Orange", "Purple", "Teal", "Pink"],
    inStock: true,
    popular: true
  },
  {
    id: 3,
    name: "Fidget Cube",
    category: "toys",
    price: 8.99,
    description: "Six sides of satisfying interaction. Click, spin, slide. Perfect for restless hands.",
    emoji: "🎲",
    colors: ["Black", "White", "Blue", "Red"],
    inStock: true,
    popular: false
  },
  {
    id: 4,
    name: "Gear Cube Puzzle",
    category: "toys",
    price: 16.99,
    description: "A twisty puzzle with interlocking gears. Satisfying to solve, impossible to put down.",
    emoji: "⚙️",
    colors: ["Black", "White"],
    inStock: true,
    popular: false
  },
  {
    id: 5,
    name: "Phone Stand",
    category: "gadgets",
    price: 12.99,
    description: "Adjustable phone stand for desk use. Works for all phone sizes. Clean minimal design.",
    emoji: "📱",
    colors: ["Black", "White", "Grey"],
    inStock: true,
    popular: true
  },
  {
    id: 6,
    name: "Cable Organizer Set",
    category: "gadgets",
    price: 9.99,
    description: "Set of 5 cable clips to tame your desk chaos. Stick to any surface.",
    emoji: "🔌",
    colors: ["Black", "White"],
    inStock: true,
    popular: false
  },
  {
    id: 7,
    name: "Desk Organizer",
    category: "gadgets",
    price: 19.99,
    description: "Multi-compartment desk organizer with pen holder, card slot, and phone dock.",
    emoji: "🗂️",
    colors: ["Black", "White", "Wood Brown"],
    inStock: true,
    popular: false
  },
  {
    id: 8,
    name: "Headphone Stand",
    category: "gadgets",
    price: 22.99,
    description: "Sleek headphone stand that keeps your cans off the desk. Weighted base, no wobble.",
    emoji: "🎧",
    colors: ["Black", "White"],
    inStock: true,
    popular: true
  },
  {
    id: 9,
    name: "Keychain Set (3-pack)",
    category: "gadgets",
    price: 6.99,
    description: "Three mini geometric keychain pendants. Lightweight and durable PLA plastic.",
    emoji: "🔑",
    colors: ["Mixed", "Black", "Glow-in-dark"],
    inStock: true,
    popular: false
  },
  {
    id: 10,
    name: "Geometric Planter",
    category: "decor",
    price: 15.99,
    description: "Faceted geometric plant pot. Drainage hole included. Perfect for succulents.",
    emoji: "🌵",
    colors: ["White", "Black", "Terracotta", "Teal"],
    inStock: true,
    popular: true
  },
  {
    id: 11,
    name: "LED Lamp Shade",
    category: "decor",
    price: 24.99,
    description: "Geometric lamp shade for standard E27 bulbs. Creates beautiful shadow patterns.",
    emoji: "💡",
    colors: ["White", "Black"],
    inStock: true,
    popular: false
  },
  {
    id: 12,
    name: "Wall Hook Set",
    category: "decor",
    price: 7.99,
    description: "Set of 4 minimalist wall hooks. Screw-mount for secure holding. Great for keys, bags, coats.",
    emoji: "🪝",
    colors: ["Black", "White", "Gold"],
    inStock: true,
    popular: false
  }
];

// ===== CART =====
function getCart() {
  return JSON.parse(localStorage.getItem('3dp_cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('3dp_cart', JSON.stringify(cart));
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
    if (qty <= 0) {
      removeFromCart(productId, color);
      return;
    }
    item.qty = qty;
    saveCart(cart);
  }
}

function clearCart() {
  localStorage.removeItem('3dp_cart');
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
    <div class="product-card ${p.popular ? 'popular' : ''}" data-id="${p.id}" onclick="openProduct(${p.id})">
      ${p.popular ? '<div class="badge">HOT</div>' : ''}
      <div class="product-emoji">${p.emoji}</div>
      <div class="product-name">${p.name}</div>
      <div class="product-cat">${p.category}</div>
      <div class="product-price">€${p.price.toFixed(2)}</div>
      <button class="add-btn" onclick="event.stopPropagation(); quickAdd(${p.id})">ADD TO CART</button>
    </div>
  `;
}

function quickAdd(id) {
  const p = PRODUCTS.find(p => p.id === id);
  addToCart(id, p.colors[0]);
  showToast(`${p.emoji} ${p.name} added!`);
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
  const modal = document.getElementById('modal');
  document.getElementById('modal-body').innerHTML = `
    <div class="modal-emoji">${p.emoji}</div>
    <h2 class="modal-name">${p.name}</h2>
    <div class="modal-cat">${p.category}</div>
    <p class="modal-desc">${p.description}</p>
    <div class="modal-price">€${p.price.toFixed(2)}</div>
    <div class="modal-options">
      <label>Color:</label>
      <select id="modal-color">
        ${p.colors.map(c => `<option value="${c}">${c}</option>`).join('')}
      </select>
      <label>Qty:</label>
      <div class="qty-row">
        <button onclick="document.getElementById('modal-qty').stepDown()">−</button>
        <input type="number" id="modal-qty" value="1" min="1" max="99">
        <button onclick="document.getElementById('modal-qty').stepUp()">+</button>
      </div>
    </div>
    <button class="modal-add" onclick="modalAdd(${p.id})">🛒 ADD TO CART</button>
  `;
  modal.style.display = 'flex';
}

function modalAdd(id) {
  const color = document.getElementById('modal-color').value;
  const qty = parseInt(document.getElementById('modal-qty').value) || 1;
  const p = PRODUCTS.find(p => p.id === id);
  addToCart(id, color, qty);
  closeModal();
  showToast(`${p.emoji} ${p.name} added!`);
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

// ===== INIT SHOP PAGE =====
function initShop() {
  updateCartBadge();

  const grid = document.getElementById('product-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  let activeFilter = 'all';

  function render(filter) {
    const filtered = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);
    grid.innerHTML = filtered.map(productCard).join('');
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

  // Close modal on backdrop click
  document.getElementById('modal').addEventListener('click', e => {
    if (e.target === document.getElementById('modal')) closeModal();
  });
}

// ===== INIT CART PAGE =====
function initCart() {
  updateCartBadge();
  renderCart();
}

function renderCart() {
  const cart = getCart();
  const container = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');

  if (cart.length === 0) {
    container.innerHTML = '<div class="empty-cart">Your cart is empty 😔<br><a href="/shop/">Browse products</a></div>';
    totalEl.textContent = '€0.00';
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-emoji">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-color">Color: ${item.color}</div>
        <div class="cart-item-price">€${item.price.toFixed(2)} each</div>
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

  const name = document.getElementById('order-name').value.trim();
  const email = document.getElementById('order-email').value.trim();
  const address = document.getElementById('order-address').value.trim();
  const notes = document.getElementById('order-notes').value.trim();

  if (!name || !email || !address) {
    showToast('Please fill in all required fields!');
    return;
  }

  const orderLines = cart.map(i => `${i.qty}x ${i.name} (${i.color}) - €${(i.price * i.qty).toFixed(2)}`).join('\n');
  const total = cartTotal().toFixed(2);

  const subject = encodeURIComponent(`New 3D Print Order — €${total}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nAddress: ${address}\n\nOrder:\n${orderLines}\n\nTotal: €${total}\n\nNotes: ${notes}`);

  window.location.href = `mailto:orders@uselesssite.nl?subject=${subject}&body=${body}`;

  setTimeout(() => {
    clearCart();
    document.getElementById('order-success').style.display = 'block';
    document.getElementById('checkout-form').style.display = 'none';
  }, 1000);
}
