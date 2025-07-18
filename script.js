// nav-bar

const toggleBtn = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

toggleBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// popup-sign/log

function openPopup() {
  document.getElementById("popupForm").classList.add("active");
  toggleForm("signup"); // default open as signup
}

function closePopup() {
  document.getElementById("popupForm").classList.remove("active");
}

function toggleForm(type) {
  const signup = document.getElementById("signupForm");
  const login = document.getElementById("loginForm");
  const title = document.getElementById("formTitle");

  if (type === "signup") {
    signup.style.display = "block";
    login.style.display = "none";
    title.innerText = "Welcome In";
  } else {
    signup.style.display = "none";
    login.style.display = "block";
    title.innerText = "Get In";
  }
}

// cart-Selection
// Load cart from localStorage when page loads
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartBadge() {
  let totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cartCount").innerText = totalQty;
}

function addToCart() {
  // ✅ check if product exists
  if (!p) {
    alert("⚠️ No product selected!");
    return;
  }

  // ✅ get numeric price (remove $ sign)
  let priceValue = parseFloat((p.price || "0").replace("$", ""));
  let quantity = parseInt(document.getElementById("srch").value) || 1;

  let product = {
    name: p.name,
    desc: p.desc || "No description",
    price: priceValue,
    quantity: quantity,
  };

  // ✅ check if already in cart
  let existing = cart.find((item) => item.name === product.name);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push(product);
  }

  saveCart(); // ✅ Save cart to localStorage
  updateCartBadge(); // ✅ Update badge
  alert(`✅ ${p.name} (${quantity}) added to cart!`);
}
function openCart() {
  const cartList = document.getElementById("cartItemsList");
  const cartTotalSidebar = document.getElementById("cartTotalSidebar");
  const sidebar = document.getElementById("cartSidebar");

  cartList.innerHTML = "";
  let grandTotal = 0;

  if (cart.length === 0) {
    cartList.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach((item) => {
      let totalPrice = item.price * item.quantity;
      grandTotal += totalPrice;

      cartList.innerHTML += `
          <div class="cart-item">
            <div class="cart-item-info">
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-desc">${item.desc}</div>
              <div class="cart-item-qty">Qty: ${item.quantity}</div>
            </div>
            <div class="cart-item-price">$${totalPrice.toFixed(2)}</div>
          </div>
        `;
    });
  }

  cartTotalSidebar.innerText = `Total: $${grandTotal.toFixed(2)}`;
  sidebar.classList.add("active");
}

function closeCart() {
  document.getElementById("cartSidebar").classList.remove("active");
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // ✅ Show success message
  alert("✅ Order Done! Thank you for shopping.");

  // ✅ Clear cart in memory & localStorage
  cart = [];
  localStorage.removeItem("cart");

  // ✅ Reset badge
  updateCartBadge();

  // ✅ Close sidebar & clear list
  document.getElementById("cartItemsList").innerHTML =
    "<p>Your cart is empty.</p>";
  document.getElementById("cartTotalSidebar").innerText = "Total: $0.00";
  closeCart();
}

// ✅ When page loads, restore saved cart & badge
window.addEventListener("load", () => {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  updateCartBadge();
});