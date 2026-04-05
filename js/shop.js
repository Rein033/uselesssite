// ===== PRODUCT DATA =====
const PRODUCTS = [
  {
    id: 1,
    name: "KILL CONFIRMED",
    category: "morale",
    price: 5.50,
    description: "Zelf geprinte morale patch op mijn Anycubic Kobra S1. PLA plastic, licht flexibel. Velcro (haak) achterkant inbegrepen. Ca. 8×5 cm.",
    emoji: "💀",
    colors: ["Zwart/Wit", "OD Green/Tan", "Full Black"],
    inStock: true,
    popular: true
  },
  {
    id: 2,
    name: "FRIENDLY FIRE ISN'T",
    category: "morale",
    price: 5.50,
    description: "Herinner je teamgenoten aan de basics. Handgemaakt en geprint in PLA. Velcro achterkant. Altijd goed voor een lach op het veld.",
    emoji: "🔫",
    colors: ["Zwart/Wit", "OD Green/Tan", "Full Black"],
    inStock: true,
    popular: true
  },
  {
    id: 3,
    name: "BORN TO AIRSOFT",
    category: "morale",
    price: 5.50,
    description: "Voor de airsofter die het in het bloed heeft. Zelf geprint in PLA, velcro achterkant. Ca. 8×5 cm.",
    emoji: "🎯",
    colors: ["Zwart/Wit", "OD Green/Tan", "Coyote Brown"],
    inStock: true,
    popular: false
  },
  {
    id: 4,
    name: "NO BB NO GLORY",
    category: "morale",
    price: 5.50,
    description: "Laat iedereen weten waar je voor staat. Geprint op mijn eigen 3D printer, haak velcro achterkant. Ca. 8×5 cm.",
    emoji: "⚡",
    colors: ["Zwart/Wit", "Full Black", "MultiCam Tan"],
    inStock: true,
    popular: false
  },
  {
    id: 5,
    name: "Naamlabel — eigen tekst",
    category: "naam",
    price: 7.50,
    description: "Persoonlijk naamlabel met jouw naam of callsign, zelf geprint op aanvraag. Max. 12 tekens. PLA, velcro achterkant. Ca. 9×2.5 cm. Levertijd iets langer.",
    emoji: "🪖",
    colors: ["Zwart/Wit", "Tan/Zwart", "OD Green/Zwart", "Full Black"],
    inStock: true,
    popular: true
  },
  {
    id: 6,
    name: "Bloedgroep patch",
    category: "naam",
    price: 4.50,
    description: "Bloedgroep patch voor op je vest of helm. Geef je bloedgroep op bij bestelling (A+/A-/B+/B-/O+/O-/AB+/AB-). Rood/zwart PLA, velcro achterkant.",
    emoji: "🩸",
    colors: ["Rood/Zwart", "Rood/Tan"],
    inStock: true,
    popular: false
  },
  {
    id: 7,
    name: "Callsign patch",
    category: "naam",
    price: 7.50,
    description: "Jouw callsign op een patch, zelf geprint op bestelling. Tot 10 tekens. PLA plastic, velcro achterkant. Ca. 8×3 cm.",
    emoji: "📟",
    colors: ["Zwart/Wit", "OD Green/Tan", "Coyote/Zwart"],
    inStock: true,
    popular: true
  },
  {
    id: 8,
    name: "Nederlandse Vlag",
    category: "tactisch",
    price: 4.50,
    description: "Nederlandse vlag patch, zelf geprint in PLA. Links- of rechtsgeoriënteerd, geef aan bij bestelling. Ca. 8×5 cm, velcro achterkant.",
    emoji: "🇳🇱",
    colors: ["Standaard kleur", "Subdued (grijs/zwart)"],
    inStock: true,
    popular: true
  },
  {
    id: 9,
    name: "Medic patch",
    category: "tactisch",
    price: 4.50,
    description: "Rode kruis medic patch, zelf geprint. Duidelijk zichtbaar op het veld. PLA, ca. 5×5 cm, velcro achterkant.",
    emoji: "➕",
    colors: ["Rood/Wit", "Rood/Zwart", "Subdued"],
    inStock: true,
    popular: false
  },
  {
    id: 10,
    name: "Team patch — eigen ontwerp",
    category: "tactisch",
    price: 9.99,
    description: "Eigen teamlogo of ontwerp als 3D geprinte patch. Stuur je afbeelding op, ik print het zelf op mijn Kobra S1. Vanaf 1 stuk mogelijk.",
    emoji: "🛡️",
    colors: ["Op aanvraag"],
    inStock: true,
    popular: true
  },
  {
    id: 11,
    name: "Rank patch set (3x)",
    category: "tactisch",
    price: 9.50,
    description: "Set van 3 rank patches naar keuze. Sergeant, Lieutenant, Captain — of eigen rang. Zelf geprint in PLA, velcro achterkant.",
    emoji: "⭐",
    colors: ["Zwart/Tan", "OD Green/Zwart", "Full Black"],
    inStock: true,
    popular: false
  },
  {
    id: 12,
    name: "Admin patch",
    category: "tactisch",
    price: 5.50,
    description: "Lege admin patch voor op je vest. Schrijfbaar oppervlak voor tijdelijke info op het veld. PLA frame, velcro achterkant. Ca. 10×5 cm.",
    emoji: "📋",
    colors: ["Zwart", "Tan", "OD Green"],
    inStock: true,
    popular: false
  },
  {
    id: 13,
    name: "Magazijn koppelaar",
    category: "accessoires",
    price: 6.50,
    description: "Koppel twee magazijnen samen voor sneller herladen. Past op de meeste standaard AEG mags. Geprint in stevige PLA. Past op M4/M16 mags.",
    emoji: "🔋",
    colors: ["Zwart", "Tan", "OD Green"],
    inStock: true,
    popular: true
  },
  {
    id: 14,
    name: "Barrel plug",
    category: "accessoires",
    price: 3.50,
    description: "Veiligheidsplug voor de loop van je replica. PLA, past op loops van 14–16mm diameter. Verplicht op de meeste velden. Set van 2.",
    emoji: "🔒",
    colors: ["Rood", "Oranje", "Zwart"],
    inStock: true,
    popular: true
  },
  {
    id: 15,
    name: "Picatinny rail covers",
    category: "accessoires",
    price: 5.00,
    description: "Beschermkapjes voor je Picatinny/Weaver rails. Set van 4 stuks. Stevig PLA, klikken eenvoudig vast. Geen losse rails meer.",
    emoji: "🔫",
    colors: ["Zwart", "Tan", "OD Green", "FDE"],
    inStock: true,
    popular: false
  },
  {
    id: 16,
    name: "Velcro patch paneel",
    category: "accessoires",
    price: 7.50,
    description: "Rechthoekig paneel met lus-velcro oppervlak. Schroef of tape vast op helm, rugzak of vest. Geschikt voor al je patches. Ca. 10×6 cm.",
    emoji: "🪖",
    colors: ["Zwart", "Tan", "OD Green"],
    inStock: true,
    popular: true
  },
  {
    id: 17,
    name: "Sling mount adapter",
    category: "accessoires",
    price: 5.50,
    description: "QD sling mount adapter voor replica's zonder ingebouwd bevestigingspunt. PLA, past op standaard 20mm rails. Print-in-place scharnier.",
    emoji: "🔗",
    colors: ["Zwart", "Tan"],
    inStock: true,
    popular: false
  },
  {
    id: 18,
    name: "Speed loader houder",
    category: "accessoires",
    price: 4.50,
    description: "MOLLE-compatibele houder voor je speedloader. Past op elk MOLLE vest of tas. Stevige PLA, houdt de speedloader veilig vast op het veld.",
    emoji: "⚡",
    colors: ["Zwart", "Tan", "OD Green"],
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
    container.innerHTML = '<div class="empty-cart">Je winkelwagen is leeg 😔<br><a href="/">Bekijk patches</a></div>';
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

  const subject = encodeURIComponent(`Nieuwe Patch Bestelling — €${total}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nAddress: ${address}\n\nOrder:\n${orderLines}\n\nTotal: €${total}\n\nNotes: ${notes}`);

  window.location.href = `mailto:orders@gunpatch.nl?subject=${subject}&body=${body}`;

  setTimeout(() => {
    clearCart();
    document.getElementById('order-success').style.display = 'block';
    document.getElementById('checkout-form').style.display = 'none';
  }, 1000);
}
