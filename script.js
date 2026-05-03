/* =========================================================
   ANUPAM KRISHNA P G — Portfolio JavaScript (Professional)
   ========================================================= */

(function () {
  "use strict";

  /* =======================================================
     1. NAVBAR — scroll state & hamburger
     ======================================================= */
  const navbar    = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks  = document.getElementById("nav-links");
  const allLinks  = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 30);
    highlightNav();
  }, { passive: true });

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  allLinks.forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
    });
  });

  /* =======================================================
     2. ACTIVE NAV LINK on scroll
     ======================================================= */
  const sections = Array.from(document.querySelectorAll("section[id]"));

  function highlightNav() {
    const scrollY = window.scrollY + 100;
    let current = sections[0].id;
    sections.forEach(sec => {
      if (sec.offsetTop <= scrollY) current = sec.id;
    });
    allLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  }
  highlightNav();

  /* =======================================================
     3. SMOOTH SCROLL (accounts for fixed nav)
     ======================================================= */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      const navH = navbar.offsetHeight;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  /* =======================================================
     4. SCROLL REVEAL (Intersection Observer)
     ======================================================= */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("visible"), i * 70);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  /* =======================================================
     5. SKILL BAR ANIMATION
     ======================================================= */
  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          fill.style.width = fill.dataset.width + "%";
          barObserver.unobserve(fill);
        }
      });
    },
    { threshold: 0.3 }
  );
  document.querySelectorAll(".skill-bar-fill").forEach(el => barObserver.observe(el));

  /* =======================================================
     6. HERO ROLE ROTATING TEXT
     ======================================================= */
  const roles = [
    "Penetration Tester",
    "Offensive Security Specialist",
    "Red Team Aspirant",
    "CTF Competitor",
    "Ethical Hacker"
  ];

  // Inject a rotating element into the hero role line
  const heroRole = document.querySelector(".hero-role");
  if (heroRole) {
    const rotEl = document.createElement("span");
    rotEl.id = "rotating-role";
    rotEl.style.cssText = `
      display:inline-block;
      color:var(--indigo-light);
      font-weight:600;
      transition:opacity .4s ease, transform .4s ease;
    `;
    rotEl.textContent = roles[0];
    heroRole.innerHTML = "";
    heroRole.appendChild(rotEl);

    let roleIdx = 0;
    setInterval(() => {
      rotEl.style.opacity = "0";
      rotEl.style.transform = "translateY(-8px)";
      setTimeout(() => {
        roleIdx = (roleIdx + 1) % roles.length;
        rotEl.textContent = roles[roleIdx];
        rotEl.style.opacity = "1";
        rotEl.style.transform = "translateY(0)";
      }, 350);
    }, 3000);
  }

  /* =======================================================
     7. CONTACT FORM
     ======================================================= */
  const form     = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");
  const submitBtn= document.getElementById("submit-btn");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name    = document.getElementById("fname").value.trim();
    const email   = document.getElementById("femail").value.trim();
    const message = document.getElementById("fmessage").value.trim();

    if (!name || !email || !message) {
      feedback.textContent = "Please fill in all fields.";
      feedback.className = "form-note error";
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      feedback.textContent = "Please enter a valid email address.";
      feedback.className = "form-note error";
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";

    setTimeout(() => {
      feedback.textContent = `Thanks, ${name}! I'll be in touch shortly.`;
      feedback.className = "form-note success";
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    }, 1200);
  });

  /* =======================================================
     8. SUBTLE CARD TILT on hover (desktops only)
     ======================================================= */
  if (window.matchMedia("(pointer:fine)").matches) {
    document.querySelectorAll(".card").forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        card.style.transform = `translateY(-2px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

})();
