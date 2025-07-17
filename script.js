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
