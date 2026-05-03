/* =========================================================
   ANUPAM KRISHNA P G — Portfolio JavaScript
   ========================================================= */

(function () {
  "use strict";

  /* =======================================================
     1. MATRIX RAIN CANVAS
     ======================================================= */
  const canvas = document.getElementById("matrix-canvas");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF></?!@#";
  const fontSize = 13;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = Array.from({ length: columns }, () => Math.random() * -100);

  function drawMatrix() {
    ctx.fillStyle = "rgba(2,13,6,0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff88";
    ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;

    columns = Math.floor(canvas.width / fontSize);
    if (drops.length < columns) {
      for (let i = drops.length; i < columns; i++) drops.push(0);
    }

    for (let i = 0; i < columns; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }
  setInterval(drawMatrix, 50);


  /* =======================================================
     2. NAVBAR — scroll & hamburger
     ======================================================= */
  const navbar   = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks  = document.getElementById("nav-links");
  const allNavLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  });

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  // Close mobile menu on link click
  allNavLinks.forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
    });
  });

  // Active nav highlight on scroll
  const sections = document.querySelectorAll("section[id]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          allNavLinks.forEach(l => l.classList.remove("active"));
          const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
          if (active) active.classList.add("active");
        }
      });
    },
    { threshold: 0.4 }
  );
  sections.forEach(s => observer.observe(s));


  /* =======================================================
     3. TERMINAL TYPEWRITER
     ======================================================= */
  const terminalBody = document.getElementById("terminal-body");

  const lines = [
    {
      cmd: "whoami",
      output: "anupam_krishna — Offensive Security Student | Penetration Tester"
    },
    {
      cmd: "cat skills.txt",
      output: "Metasploit · Burp Suite · Nmap · Wireshark · Kali Linux · Python · Bash"
    },
    {
      cmd: "ls certifications/",
      output: "CEH [PASSED] · eJPT [IN_PROGRESS] · OSCP [TARGETED]_  "
    }
  ];

  let lineIdx = 0;
  let charIdx = 0;
  let phase = "cmd"; // "cmd" | "output"
  let currentLineEl = null;
  let currentOutputEl = null;
  let cursorEl = null;

  function nextLine() {
    if (lineIdx >= lines.length) return;

    // Create prompt line
    const lineDiv = document.createElement("div");
    lineDiv.className = "terminal-line";
    lineDiv.innerHTML = `<span class="prompt">$ </span>`;
    const cmdSpan = document.createElement("span");
    cmdSpan.className = "cmd";
    lineDiv.appendChild(cmdSpan);
    cursorEl = document.createElement("span");
    cursorEl.className = "cursor-blink";
    cursorEl.textContent = "█";
    lineDiv.appendChild(cursorEl);

    terminalBody.appendChild(lineDiv);
    currentLineEl = cmdSpan;

    // Create output slot
    const outDiv = document.createElement("div");
    outDiv.className = "terminal-output";
    terminalBody.appendChild(outDiv);
    currentOutputEl = outDiv;

    phase = "cmd";
    charIdx = 0;
    typeNext();
  }

  function typeNext() {
    const data = lines[lineIdx];
    if (phase === "cmd") {
      if (charIdx < data.cmd.length) {
        currentLineEl.textContent += data.cmd[charIdx];
        charIdx++;
        setTimeout(typeNext, 60 + Math.random() * 40);
      } else {
        // Pause then show output
        setTimeout(() => {
          cursorEl.remove();
          currentOutputEl.textContent = data.output;
          lineIdx++;
          charIdx = 0;
          setTimeout(nextLine, 500);
        }, 400);
      }
    }
  }

  // Start after short delay (page load)
  setTimeout(nextLine, 800);


  /* =======================================================
     4. ROTATING TITLE IN HERO
     ======================================================= */
  const titles = [
    "Offensive Security",
    "Penetration Tester",
    "Red Team Aspirant",
    "CTF Competitor",
    "Ethical Hacker"
  ];
  let titleIdx = 0;
  const rotatingEl = document.getElementById("rotating-title");

  function rotateTitle() {
    rotatingEl.style.opacity = "0";
    rotatingEl.style.transform = "translateY(-12px)";
    setTimeout(() => {
      titleIdx = (titleIdx + 1) % titles.length;
      rotatingEl.textContent = titles[titleIdx];
      rotatingEl.style.transition = "opacity 0.5s, transform 0.5s";
      rotatingEl.style.opacity = "1";
      rotatingEl.style.transform = "translateY(0)";
    }, 300);
  }
  rotatingEl.style.transition = "opacity 0.5s, transform 0.5s";
  setInterval(rotateTitle, 2800);


  /* =======================================================
     5. SKILL BAR ANIMATION (Intersection Observer)
     ======================================================= */
  const barFills = document.querySelectorAll(".skill-bar-fill");
  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const w = fill.getAttribute("data-width") || "0";
          fill.style.width = w + "%";
          barObserver.unobserve(fill);
        }
      });
    },
    { threshold: 0.3 }
  );
  barFills.forEach(f => barObserver.observe(f));


  /* =======================================================
     6. SCROLL REVEAL ANIMATION
     ======================================================= */
  const revealEls = document.querySelectorAll(
    ".glass-card, .stat-card, .technique-item, .cert-item, .skill-bar-item"
  );
  revealEls.forEach(el => el.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, i * 60);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  revealEls.forEach(el => revealObserver.observe(el));


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
      feedback.textContent = "> Error: all fields required.";
      feedback.className = "form-note error";
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      feedback.textContent = "> Error: invalid email address.";
      feedback.className = "form-note error";
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "⏳ Transmitting...";

    // Simulate send (no backend)
    setTimeout(() => {
      feedback.textContent = `> Message received, ${name}. I'll respond shortly.`;
      feedback.className = "form-note success";
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = "&#x26A1; Send Message";
    }, 1400);
  });


  /* =======================================================
     8. SMOOTH SCROLL — fixes offset for fixed navbar
     ======================================================= */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });


  /* =======================================================
     9. CURSOR GLOW EFFECT
     ======================================================= */
  const glow = document.createElement("div");
  glow.id = "cursor-glow";
  Object.assign(glow.style, {
    position: "fixed",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(0,255,136,0.05) 0%, transparent 70%)",
    pointerEvents: "none",
    transform: "translate(-50%, -50%)",
    zIndex: "9998",
    transition: "left 0.12s ease, top 0.12s ease"
  });
  document.body.appendChild(glow);

  window.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top  = e.clientY + "px";
  });

})();
