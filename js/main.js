// Carrito de compras en localStorage
const cart = {
  items: [],
  
  addItem(item) {
    this.items.push(item);
    this.save();
    this.updateCartCount();
  },
  
  removeItem(index) {
    this.items.splice(index, 1);
    this.save();
    this.updateCartCount();
  },
  
  save() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  },
  
  load() {
    const saved = localStorage.getItem('cart');
    this.items = saved ? JSON.parse(saved) : [];
    this.updateCartCount();
  },
  
  getTotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },
  
  updateCartCount() {
    const count = this.items.reduce((sum, item) => sum + item.quantity, 0);
    const countEl = document.querySelector('.cart-count');
    if (countEl) countEl.textContent = count;
  },
  
  clear() {
    this.items = [];
    this.save();
    this.updateCartCount();
  }
};

// Cargar carrito al iniciar
document.addEventListener('DOMContentLoaded', () => {
  cart.load();
});

// Galeria de ilustraciones (placeholder)
const illustrations = [
  {
    id: 1,
    title: 'Ilustracion 1',
    price: 10,
    image: 'https://via.placeholder.com/300x300?text=Illustration+1',
    description: 'Ilustracion digital unica'
  },
  {
    id: 2,
    title: 'Ilustracion 2',
    price: 12,
    image: 'https://via.placeholder.com/300x300?text=Illustration+2',
    description: 'Ilustracion digital unica'
  }
];

// Mostrar ilustraciones
function displayIllustrations() {
  const gallery = document.querySelector('.gallery');
  if (!gallery) return;
  
  gallery.innerHTML = illustrations.map(ill => `
    <div class="illustration-card">
      <img src="${ill.image}" alt="${ill.title}">
      <h3>${ill.title}</h3>
      <p>$${ill.price} USD</p>
      <button onclick="addToCart({id: ${ill.id}, title: '${ill.title}', price: ${ill.price}, quantity: 1})" class="btn">Agregar al Carrito</button>
    </div>
  `).join('');
}

function addToCart(item) {
  const existing = cart.items.find(i => i.id === item.id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.addItem(item);
  }
  alert('Agregado al carrito!');
}

// Mostrar galeria al cargar
if (window.location.pathname.includes('shop')) {
  document.addEventListener('DOMContentLoaded', displayIllustrations);
}
