/* Public Portfolio JavaScript - Dynamic API Integration */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavbar();
  initMobileMenu();
  initTypingAnimation();
  initScrollProgress();
  initScrollReveal();
  initCounters();
  initProjectFilters();
  initContactForm();
  initBackToTop();
  initFooterYear();
  initModalClose();
});

// Dynamic Project Modal Handler
async function openDynamicProjectModal(projectId) {
  const modal = document.getElementById("projectModal");
  const content = document.getElementById("modalContent");
  if (!modal || !content) return;

  content.innerHTML = '<div style="text-align:center; padding:40px;"><i class="fas fa-spinner fa-spin" style="font-size:2rem; color:var(--accent-primary);"></i><p style="margin-top:12px; color:var(--text-secondary);">Loading project details...</p></div>';
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  try {
    const res = await fetch(`/api/projects/${projectId}`);
    if (!res.ok) throw new Error("Project not found");
    const data = await res.json();

    const featuresHTML = (data.features || [])
      .map(f => `<li><i class="fas fa-check-circle" aria-hidden="true"></i> ${f}</li>`)
      .join("");

    const techHTML = (data.technologies || [])
      .map(t => `<span class="tech-pill">${t}</span>`)
      .join("");

    content.innerHTML = `
      <div class="modal-project">
        <div class="modal-category">${data.category.toUpperCase()}</div>
        <h2 id="modalTitle" class="modal-title">${data.title}</h2>
        <p class="modal-desc">${data.full_description || data.short_description}</p>
        ${featuresHTML ? `
        <div class="modal-features">
          <h4>Key Features</h4>
          <ul>${featuresHTML}</ul>
        </div>` : ''}
        <div class="modal-tech-stack">
          <h4>Technologies Used</h4>
          <div class="project-tech">${techHTML}</div>
        </div>
        <div class="modal-actions" style="display:flex; gap:12px; margin-top:20px;">
          ${data.github_url && data.github_url !== '#' ? `
            <a href="${data.github_url}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
              <i class="fab fa-github"></i> View on GitHub
            </a>
          ` : ''}
          ${data.live_demo_url && data.live_demo_url !== '#' ? `
            <a href="${data.live_demo_url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
              <i class="fas fa-external-link-alt"></i> Live Demo
            </a>
          ` : ''}
        </div>
      </div>
    `;
  } catch (err) {
    content.innerHTML = '<div style="text-align:center; padding:30px; color:var(--accent-red);"><i class="fas fa-exclamation-triangle"></i> Failed to load project details.</div>';
  }
}

function closeProjectModal() {
  const modal = document.getElementById("projectModal");
  if (!modal) return;
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function initModalClose() {
  const closeBtn = document.getElementById("modalClose");
  const modal = document.getElementById("projectModal");

  if (closeBtn) closeBtn.addEventListener("click", closeProjectModal);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeProjectModal();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeProjectModal();
  });
}

function initTheme() {
  const savedTheme = localStorage.getItem("portfolioTheme") || "dark";
  setTheme(savedTheme);

  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      setTheme(next);
    });
  }
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("portfolioTheme", theme);

  const icon = document.getElementById("themeIcon");
  if (icon) {
    icon.className = theme === "dark" ? "fas fa-moon" : "fas fa-sun";
  }
}

function initNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }, { passive: true });
}

function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    hamburger.classList.toggle("active");
  });

  document.querySelectorAll(".nav-link").forEach(l => {
    l.addEventListener("click", () => {
      navLinks.classList.remove("open");
      hamburger.classList.remove("active");
    });
  });
}

function initTypingAnimation() {
  const el = document.getElementById("typingText");
  if (!el) return;

  const titlesData = el.getAttribute("data-titles") || "AI/ML Student,Python Developer,Machine Learning Enthusiast";
  const titles = titlesData.split(",").map(t => t.strip ? t.strip() : t.trim()).filter(Boolean);

  let currentIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function type() {
    const current = titles[currentIndex] || "AI/ML Developer";
    const displayed = isDeleting
      ? current.substring(0, charIndex - 1)
      : current.substring(0, charIndex + 1);

    el.textContent = displayed;

    if (isDeleting) {
      charIndex--;
      typingSpeed = 40;
    } else {
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === current.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      currentIndex = (currentIndex + 1) % titles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  setTimeout(type, 1000);
}

function initScrollProgress() {
  const bar = document.getElementById("scrollProgress");
  if (!bar) return;

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${Math.min(pct, 100)}%`;
  }, { passive: true });
}

function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add("revealed"));
  }
}

function initCounters() {
  const counters = document.querySelectorAll("[data-target]");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(counter => observer.observe(counter));
  } else {
    counters.forEach(counter => animateCounter(counter));
  }
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute("data-target") || "0", 10);
  const duration = 1500;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current);
  }, 16);
}

function initProjectFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      projectCards.forEach(card => {
        const category = card.getAttribute("data-category") || "";
        if (filter === "all" || category.includes(filter)) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
}

function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const subject = document.getElementById("contactSubject").value.trim();
    const message = document.getElementById("contactMessage").value.trim();
    const successEl = document.getElementById("formSuccess");

    if (!name || !email || !subject || !message) return; // let html5 validation handle it

    // Submit via AJAX
    e.preventDefault();
    const submitBtn = document.getElementById("submitBtn");
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    try {
      const formData = new FormData(form);
      const res = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { "X-Requested-With": "XMLHttpRequest" }
      });

      if (res.ok) {
        form.reset();
        if (successEl) {
          successEl.style.display = "block";
          setTimeout(() => { successEl.style.display = "none"; }, 8000);
        }
      }
    } catch (err) {
      console.error("Submission failed", err);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> <span>Send Message</span>';
    }
  });
}

function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  }, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initFooterYear() {
  const el = document.getElementById("footerYear");
  if (el) el.textContent = new Date().getFullYear();
}
