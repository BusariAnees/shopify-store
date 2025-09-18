// document.addEventListener("DOMContentLoaded", function() {
//     const progressBar = document.querySelector('.free-shipping-progress .progress');
//     const remainingAmountText = document.querySelector('.free-shipping-progress .remaining-amount');
  
//     if (!progressBar || !remainingAmountText) return;
  
//     const FREE_SHIPPING_THRESHOLD = 100; // $100 threshold
  
//     function updateProgress(cart) {
//       const subtotal = cart.items_subtotal_price / 100; // cents → dollars
//       const percentage = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
//       progressBar.style.width = percentage + '%';
  
//       if (subtotal < FREE_SHIPPING_THRESHOLD) {
//         const remaining = (FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2);
//         remainingAmountText.textContent = `Spend $${remaining} more for free shipping!`;
//       } else {
//         remainingAmountText.textContent = "You qualify for free shipping!";
//       }
//     }
  
//     function fetchCartAndUpdate() {
//       fetch('/cart.js')
//         .then(res => res.json())
//         .then(cart => updateProgress(cart));
//     }
  
//     fetchCartAndUpdate();
  
//     // Optional: update dynamically if cart changes
//     document.addEventListener('cart:updated', fetchCartAndUpdate);
//   });
  