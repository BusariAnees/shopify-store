// persistent-cart.js
document.addEventListener('DOMContentLoaded', () => {
    // Load cart from localStorage on page load
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const cart = JSON.parse(savedCart);
      populateCartDrawer(cart);
    }
  
    // Listen to add-to-cart buttons
    document.querySelectorAll('form[action^="/cart/add"]').forEach(form => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const response = await fetch('/cart/add.js', {
          method: 'POST',
          body: formData,
        });
        const cartItem = await response.json();
  
        // Fetch updated cart
        const cartRes = await fetch('/cart.js');
        const cart = await cartRes.json();
  
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
  
        // Update drawer
        populateCartDrawer(cart);
      });
    });
  
    // Optional: listen for Shopify cart events
    document.addEventListener('cart:updated', e => {
      localStorage.setItem('cart', JSON.stringify(e.detail.cart));
      populateCartDrawer(e.detail.cart);
    });
  });
  
  // Helper function: populate mini-cart/drawer
  function populateCartDrawer(cart) {
    const drawer = document.querySelector('.cart-drawer__items');
    if (!drawer) return;
  
    drawer.innerHTML = ''; // clear previous
  
    cart.items.forEach(item => {
      const itemEl = document.createElement('div');
      itemEl.className = 'cart-drawer__item';
      itemEl.innerHTML = `
        <a href="/products/${item.handle}">
          <img src="${item.image}" alt="${item.title}" width="50" height="50">
          <span>${item.title}</span>
        </a>
        <span>${item.quantity} × ${formatMoney(item.price)}</span>
      `;
      drawer.appendChild(itemEl);
    });
  }
  
  // Helper to format Shopify money (cents to $)
  function formatMoney(cents) {
    return '$' + (cents / 100).toFixed(2);
  }
  