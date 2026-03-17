
const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

togglePassword.addEventListener("click", () => {
  passwordInput.type =
    passwordInput.type === "password" ? "text" : "password";
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = passwordInput.value.trim();
  const remember = document.getElementById("rememberMe").checked;

  if (username === "" || password === "") {
    errorMsg.textContent = "Please fill all fields";
    return;
  }

  localStorage.setItem("loggedIn", "true");
  localStorage.setItem("user", username);

  if (remember) {
    localStorage.setItem("rememberUser", "true");
  }

  window.location.href = "dashboard.html";
});