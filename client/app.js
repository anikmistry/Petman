document.addEventListener("DOMContentLoaded", function () {
  // Check login status and show/hide Dashboard link
  function updateDashboardVisibility() {
    const token = sessionStorage.getItem("authToken");
    const dashboardLink = document.getElementById("dashboard-link");
    const dashboardLinkMobile = document.getElementById("dashboard-link-mobile");
    
    if (token) {
      // User is logged in - show Dashboard
      if (dashboardLink) dashboardLink.classList.remove("hidden");
      if (dashboardLinkMobile) dashboardLinkMobile.classList.remove("hidden");
    } else {
      // User is not logged in - hide Dashboard
      if (dashboardLink) dashboardLink.classList.add("hidden");
      if (dashboardLinkMobile) dashboardLinkMobile.classList.add("hidden");
    }
  }
  
  // Initial check on page load
  updateDashboardVisibility();
  
  // Mobile nav toggle
  const navToggle = document.getElementById("nav-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const navOpen = document.getElementById("nav-open");
  const navClose = document.getElementById("nav-close");

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      if (mobileMenu) mobileMenu.classList.toggle("hidden");
      if (navOpen) navOpen.classList.toggle("hidden");
      if (navClose) navClose.classList.toggle("hidden");
    });
  }

  // Close mobile menu when a link is clicked
  if (mobileMenu) {
    mobileMenu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        if (navOpen) navOpen.classList.remove("hidden");
        if (navClose) navClose.classList.add("hidden");
      });
    });
  }

  // Smooth scroll with offset for sticky header
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80; // header height
        const top =
          target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  // Contact form - Schedule Pickup (requires user login)
  const form = document.getElementById("contact-form");
  const formMsg = document.getElementById("form-msg");
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const phone = (document.getElementById("phone") || {}).value || "";
      const details = (document.getElementById("details") || {}).value || "";
      const token = sessionStorage.getItem("authToken");

      if (!phone.trim() || !details.trim()) {
        if (formMsg) {
          formMsg.textContent = "Please provide phone and details.";
          formMsg.style.color = "rgba(255,255,255,0.95)";
        }
        return;
      }

      if (!token) {
        if (formMsg) {
          formMsg.textContent = "Please sign in first to schedule a pickup.";
          formMsg.style.color = "rgba(255,255,255,0.95)";
        }
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/pickups", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ phone, details }),
        });
        if (res.ok) {
          if (formMsg) {
            formMsg.textContent =
              "Thanks! Your pickup request has been received.";
            formMsg.style.color = "white";
          }
          form.reset();
        } else {
          const err = await res.json();
          if (formMsg) {
            formMsg.textContent = err.message || "Error scheduling pickup.";
            formMsg.style.color = "rgba(255,255,255,0.95)";
          }
        }
      } catch (err) {
        console.error(err);
        if (formMsg) {
          formMsg.textContent = "Connection error. Server may be down.";
          formMsg.style.color = "rgba(255,255,255,0.95)";
        }
      }
    });
  }

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  // --- Account card entrance and smooth toggle animation ---
  const accountCard = document.querySelector(".account-card");
  const btnSignIn = document.getElementById("btn-signin");
  const btnSignUp = document.getElementById("btn-signup");
  const signinForm = document.getElementById("signin-form");
  const signupForm = document.getElementById("signup-form");

  // Entrance animation for the card
  if (accountCard) {
    // trigger enter on next frame so transition runs
    requestAnimationFrame(() => accountCard.classList.add("enter"));
  }

  function switchToSignIn(e) {
    if (e) e.preventDefault();
    if (!signinForm || !signupForm) return;
    signinForm.classList.remove("hide");
    signinForm.classList.add("show");
    signupForm.classList.remove("show");
    signupForm.classList.add("hide");
    if (btnSignIn) btnSignIn.classList.add("bg-white");
    if (btnSignUp) btnSignUp.classList.remove("bg-white");
    if (btnSignIn) btnSignIn.classList.remove("text-gray-600");
    if (btnSignUp) btnSignUp.classList.add("text-gray-600");
  }

  function switchToSignUp(e) {
    if (e) e.preventDefault();
    if (!signinForm || !signupForm) return;
    signupForm.classList.remove("hide");
    signupForm.classList.add("show");
    signinForm.classList.remove("show");
    signinForm.classList.add("hide");
    if (btnSignUp) btnSignUp.classList.add("bg-white");
    if (btnSignIn) btnSignIn.classList.remove("bg-white");
    if (btnSignUp) btnSignUp.classList.remove("text-gray-600");
    if (btnSignIn) btnSignIn.classList.add("text-gray-600");
  }

  if (btnSignIn) btnSignIn.addEventListener("click", switchToSignIn);
  if (btnSignUp) btnSignUp.addEventListener("click", switchToSignUp);
});
document.addEventListener("DOMContentLoaded", function () {
  const btnSignIn = document.getElementById("btn-signin");
  const btnSignUp = document.getElementById("btn-signup");
  const signinForm = document.getElementById("signin-form");
  const signupForm = document.getElementById("signup-form");
  const signinMsg = document.getElementById("signin-msg");
  const signupMsg = document.getElementById("signup-msg");

  function showSignIn() {
    signinForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
    btnSignIn.classList.add("bg-white");
    btnSignUp.classList.remove("bg-white");
    btnSignIn.classList.remove("text-gray-600");
    btnSignUp.classList.add("text-gray-600");
  }

  function showSignUp() {
    signupForm.classList.remove("hidden");
    signinForm.classList.add("hidden");
    btnSignUp.classList.add("bg-white");
    btnSignIn.classList.remove("bg-white");
    btnSignUp.classList.remove("text-gray-600");
    btnSignIn.classList.add("text-gray-600");
  }

  btnSignIn.addEventListener("click", function (e) {
    e.preventDefault();
    showSignIn();
  });
  btnSignUp.addEventListener("click", function (e) {
    e.preventDefault();
    showSignUp();
  });

  // Sign In - API call
  signinForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    signinMsg.textContent = "";
    const identifier = document
      .getElementById("signin-identifier")
      .value.trim();
    const password = document.getElementById("signin-password").value;

    if (!identifier || !password) {
      signinMsg.style.color = "red";
      signinMsg.textContent = "Please provide phone/email and password.";
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });
      if (res.ok) {
        const data = await res.json();
        sessionStorage.setItem("authToken", data.token);
        signinMsg.style.color = "green";
        signinMsg.textContent = "Sign in successful!";
        signinForm.reset();
        updateDashboardVisibility();
      } else {
        signinMsg.style.color = "red";
        signinMsg.textContent = "Invalid credentials.";
      }
    } catch (err) {
      console.error(err);
      signinMsg.style.color = "red";
      signinMsg.textContent = "Server error. Check console.";
    }
  });

  // Sign Up - API call
  signupForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    signupMsg.textContent = "";
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const phone = document.getElementById("signup-phone").value.trim();
    const location = document.getElementById("signup-location").value.trim();
    const password = document.getElementById("signup-password").value;

    if (!name || !email || !phone || !password) {
      signupMsg.style.color = "red";
      signupMsg.textContent = "Please fill required fields.";
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, location, password }),
      });
      if (res.ok) {
        const data = await res.json();
        sessionStorage.setItem("authToken", data.token);
        signupMsg.style.color = "green";
        signupMsg.textContent = "Sign up successful! Switching to Sign In...";
        signupForm.reset();
        //updateDashboardVisibility();
        setTimeout(() => showSignIn(), 1500);
      } else {
        const err = await res.json();
        signupMsg.style.color = "red";
        signupMsg.textContent = err.message || "Sign up failed.";
      }
    } catch (err) {
      console.error(err);
      signupMsg.style.color = "red";
      signupMsg.textContent = "Server error. Check console.";
    }
  });

  // default view
  showSignIn();
});

document.addEventListener("DOMContentLoaded", function () {
  const trigger = document.getElementById("selectTrigger");
  const list = document.getElementById("optionsList");
  const selectedText = document.getElementById("selectedText");
  const dropdownIcon = document.getElementById("dropdownIcon");
  const selectedValue = document.getElementById("selectedValue");
  const options = list.querySelectorAll("li");

  // Toggle dropdown on trigger click
  trigger.addEventListener("click", function () {
    const isHidden = list.classList.contains("hidden");
    list.classList.toggle("hidden");
    dropdownIcon.style.transform = isHidden ? "rotate(180deg)" : "rotate(0deg)";
  });

  // Handle keyboard navigation (Enter/Space to toggle, Escape to close)
  trigger.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      trigger.click();
    } else if (e.key === "Escape" && !list.classList.contains("hidden")) {
      list.classList.add("hidden");
      dropdownIcon.style.transform = "rotate(0deg)";
    }
  });

  // Select option
  options.forEach((option) => {
    option.addEventListener("click", function () {
      const value = this.dataset.value;
      selectedText.textContent = this.textContent;
      selectedText.classList.remove("text-gray-500");
      selectedValue.value = value;
      list.classList.add("hidden");
      dropdownIcon.style.transform = "rotate(0deg)";
    });

    // Keyboard navigation for options (Arrow keys)
    option.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        this.click();
      }
    });
  });

  // Close dropdown on outside click
  document.addEventListener("click", function (e) {
    if (!trigger.contains(e.target)) {
      list.classList.add("hidden");
      dropdownIcon.style.transform = "rotate(0deg)";
    }
  });

  // Close on Escape key anywhere
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !list.classList.contains("hidden")) {
      list.classList.add("hidden");
      dropdownIcon.style.transform = "rotate(0deg)";
    }
  });
});
