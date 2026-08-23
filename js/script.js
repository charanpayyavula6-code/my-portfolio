
/* ===============================================================
   PAYYAVULA SRI CHARAN - PORTFOLIO JAVASCRIPT
   Author: Generated for Payyavula Sri Charan
   Description: Premium AI/ML Student Portfolio JS
================================================================ */

/* ======================== CONFIGURATION ========================
   Edit your personal data here. This is the only place you need
   to change your personal information.
================================================================ */
const CONFIG = {
  name: "Payyavula Sri Charan",
  email: "charanpayyavula6@gmail.com",
  phone: "+91 XXXXXXXXXX",        // Add your phone number
  location: "Chennai, Tamil Nadu, India",
  github: "https://github.com/charanpayyavula6",
  linkedin: "https://linkedin.com/in/YOUR_LINKEDIN_HERE", // Replace with your LinkedIn URL
  resumeUrl: "assets/resume/Charan_Resume.pdf",
  profileImage: "assets/images/profile.jpg",

  // Typing animation titles
  typingTitles: [
    "AI/ML Student",
    "Python Developer",
    "Machine Learning Enthusiast",
    "Generative AI Explorer",
    "Flask Developer",
    "NLP Practitioner",
    "Problem Solver"
  ],

  // Project data - update URLs as you build actual repos
  projects: {
    1: {
      title: "AI Government Grievance Portal",
      category: "AI/ML, NLP, Flask",
      description: "An AI-powered portal for smart government grievance management. Uses NLP for intelligent categorization, sentiment analysis to detect urgency, and automated priority assignment. Built with Python, Flask backend, and MongoDB database.",
      features: [
        "AI-based grievance categorization using NLP",
        "Sentiment analysis to detect priority level",
        "Automated officer assignment system",
        "Interactive officer dashboard with analytics",
        "Real-time progress tracking for citizens",
        "MongoDB-backed persistent storage"
      ],
      tech: ["Python", "Machine Learning", "NLP", "Flask", "Flask-SQLAlchemy", "MongoDB"],
      github: "https://github.com/charanpayyavula6",   // Replace with actual repo URL
      demo: "#"                                          // Replace with actual demo URL
    },
    2: {
      title: "Fake News Detection System",
      category: "NLP, Generative AI",
      description: "An intelligent system to detect and classify fake news in real-time. Uses Sentence-BERT for semantic embeddings, Gemini API for content analysis, and Google News API for cross-referencing news sources.",
      features: [
        "Real-time fake news detection",
        "Sentence-BERT semantic embeddings",
        "Gemini API for intelligent content analysis",
        "Google News API for source cross-referencing",
        "Credibility score generation",
        "Source verification and fact-checking"
      ],
      tech: ["Python", "NLP", "Sentence-BERT", "Gemini API", "Google News API"],
      github: "https://github.com/charanpayyavula6",
      demo: "#"
    },
    3: {
      title: "AI Farmer Chatbot",
      category: "Generative AI, NLP, Chatbot",
      description: "A generative AI-powered chatbot designed specifically for farmers. Provides expert agricultural advice, crop care recommendations, pest and disease identification, and weather-based farming guidance in natural language.",
      features: [
        "Natural language agricultural advice",
        "Crop care and disease recommendations",
        "Pest identification and control guidance",
        "Weather-based farming suggestions",
        "Market price information",
        "Government scheme information"
      ],
      tech: ["Python", "NLP", "Generative AI"],
      github: "https://github.com/charanpayyavula6",
      demo: "#"
    },
    4: {
      title: "Crop Yield Prediction",
      category: "Data Science, Machine Learning",
      description: "A machine learning model that predicts crop yields based on environmental factors, soil quality data, and historical agricultural data. Helps farmers make informed decisions about crop selection and resource allocation.",
      features: [
        "Yield prediction based on soil data",
        "Environmental factor analysis",
        "Historical data processing with Pandas",
        "Multiple ML algorithms comparison",
        "Interactive data visualization",
        "Farmer-friendly prediction reports"
      ],
      tech: ["Python", "Pandas", "Scikit-learn", "Matplotlib", "Machine Learning"],
      github: "https://github.com/charanpayyavula6",
      demo: "#"
    },
    5: {
      title: "Hospital Management System",
      category: "Java, SQL",
      description: "A comprehensive hospital management system built with Java and SQL. Manages patients, doctors, appointments, medical records, billing, and staff efficiently with a clean user interface.",
      features: [
        "Patient registration and management",
        "Doctor appointment scheduling",
        "Medical records management",
        "Billing and payment tracking",
        "Staff management",
        "Report generation"
      ],
      tech: ["Java", "SQL", "MySQL"],
      github: "https://github.com/charanpayyavula6",
      demo: "#"
    },
    6: {
      title: "Student Leave Portal",
      category: "Web Development, Frontend",
      description: "A clean, responsive frontend web portal for students to submit, track, and manage leave applications. Features a modern UI with real-time status updates and approval workflow visualization.",
      features: [
        "Leave application submission form",
        "Real-time status tracking",
        "Application history view",
        "Responsive mobile-friendly design",
        "Clean, intuitive user interface",
        "Ready for backend integration"
      ],
      tech: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/charanpayyavula6",
      demo: "#"
    }
  }
};


/* ======================== DOCUMENT READY ======================== */
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


/* ======================== THEME ======================== */
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
    icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
  }

  const btn = document.getElementById("themeToggle");
  if (btn) {
    btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  }
}


/* ======================== NAVBAR ======================== */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  // Add/remove scrolled class
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    updateActiveNavLink();
  }, { passive: true });

  // Smooth scroll for nav links
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
        // Close mobile menu
        closeMobileMenu();
      }
    });
  });

  // CTA buttons smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
          link.setAttribute("aria-current", "page");
        }
      });
    }
  });
}


/* ======================== MOBILE MENU ======================== */
function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.contains("open");
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobileMenu();
  });
}

function openMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  if (!hamburger || !navLinks) return;
  navLinks.classList.add("open");
  hamburger.classList.add("active");
  hamburger.setAttribute("aria-expanded", "true");
  hamburger.setAttribute("aria-label", "Close mobile menu");
}

function closeMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  if (!hamburger || !navLinks) return;
  navLinks.classList.remove("open");
  hamburger.classList.remove("active");
  hamburger.setAttribute("aria-expanded", "false");
  hamburger.setAttribute("aria-label", "Open mobile menu");
}


/* ======================== TYPING ANIMATION ======================== */
function initTypingAnimation() {
  const el = document.getElementById("typingText");
  if (!el) return;

  const titles = CONFIG.typingTitles;
  let currentIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function type() {
    const current = titles[currentIndex];
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
      // Pause at end before deleting
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


/* ======================== SCROLL PROGRESS ======================== */
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


/* ======================== SCROLL REVEAL ======================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target); // Only animate once
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add("revealed"));
  }
}


/* ======================== COUNTER ANIMATION ======================== */
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


/* ======================== PROJECT FILTERS ======================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      // Update active button
      filterBtns.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      // Filter cards
      projectCards.forEach(card => {
        const category = card.getAttribute("data-category") || "";

        if (filter === "all" || category.includes(filter)) {
          card.classList.remove("hidden");
          // Re-trigger reveal animation
          card.style.animation = "none";
          card.offsetHeight; // force reflow
          card.style.animation = "";
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
}


/* ======================== PROJECT MODAL ======================== */
function openProjectModal(projectId) {
  const modal = document.getElementById("projectModal");
  const content = document.getElementById("modalContent");
  const project = CONFIG.projects[projectId];

  if (!modal || !content || !project) return;

  // Build modal HTML
  const featuresHTML = project.features
    .map(f => `<li><i class="fas fa-check-circle" aria-hidden="true"></i>${f}</li>`)
    .join("");

  const techHTML = project.tech
    .map(t => `<span class="tech-pill">${t}</span>`)
    .join("");

  content.innerHTML = `
    <div class="modal-project">
      <div class="modal-category">${project.category}</div>
      <h2 id="modalTitle" class="modal-title">${project.title}</h2>
      <p class="modal-desc">${project.description}</p>
      <div class="modal-features">
        <h4>Key Features</h4>
        <ul>${featuresHTML}</ul>
      </div>
      <div class="modal-tech-stack">
        <h4>Technologies Used</h4>
        <div class="project-tech">${techHTML}</div>
      </div>
      <div class="modal-actions">
        <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
          <i class="fab fa-github" aria-hidden="true"></i> View on GitHub
        </a>
        ${project.demo && project.demo !== "#" ? `
          <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
            <i class="fas fa-external-link-alt" aria-hidden="true"></i> Live Demo
          </a>
        ` : `
          <span class="btn btn-secondary" style="opacity:0.5;cursor:default;" aria-label="Demo coming soon">
            <i class="fas fa-clock" aria-hidden="true"></i> Demo Coming Soon
          </span>
        `}
      </div>
    </div>
  `;

  // Apply modal styles inline for the modal content
  const style = document.createElement("style");
  style.id = "modalStyles";
  style.textContent = `
    .modal-project { }
    .modal-category { font-size: 0.78rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;
      color: var(--accent-primary); margin-bottom: 8px; }
    .modal-title { font-size: 1.4rem; margin-bottom: 12px; }
    .modal-desc { color: var(--text-secondary); font-size: 0.9rem; line-height: 1.7; margin-bottom: 20px; }
    .modal-features h4, .modal-tech-stack h4 { font-size: 0.85rem; text-transform: uppercase;
      letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 12px; }
    .modal-features ul { display: flex; flex-direction: column; gap: 6px; margin-bottom: 20px; }
    .modal-features ul li { display: flex; align-items: center; gap: 8px; font-size: 0.87rem; color: var(--text-secondary); }
    .modal-features ul li i { color: var(--accent-green); flex-shrink: 0; }
    .modal-tech-stack { margin-bottom: 24px; }
    .modal-actions { display: flex; gap: 12px; flex-wrap: wrap; }
  `;

  // Remove old modal styles if present
  const oldStyle = document.getElementById("modalStyles");
  if (oldStyle) oldStyle.remove();
  document.head.appendChild(style);

  // Show modal
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  // Focus management
  const closeBtn = document.getElementById("modalClose");
  if (closeBtn) closeBtn.focus();
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

  if (closeBtn) {
    closeBtn.addEventListener("click", closeProjectModal);
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeProjectModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeProjectModal();
  });
}


/* ======================== CONTACT FORM VALIDATION ======================== */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  // Live validation
  const nameInput = document.getElementById("contactName");
  const emailInput = document.getElementById("contactEmail");
  const subjectInput = document.getElementById("contactSubject");
  const messageInput = document.getElementById("contactMessage");

  [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
    if (input) {
      input.addEventListener("input", () => validateField(input));
      input.addEventListener("blur", () => validateField(input));
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleFormSubmit();
  });
}

function validateField(input) {
  const id = input.id;
  const value = input.value.trim();
  let errorMsg = "";

  switch (id) {
    case "contactName":
      if (!value) errorMsg = "Please enter your name.";
      else if (value.length < 2) errorMsg = "Name must be at least 2 characters.";
      break;
    case "contactEmail":
      if (!value) errorMsg = "Please enter your email.";
      else if (!isValidEmail(value)) errorMsg = "Please enter a valid email address.";
      break;
    case "contactSubject":
      if (!value) errorMsg = "Please enter a subject.";
      else if (value.length < 3) errorMsg = "Subject must be at least 3 characters.";
      break;
    case "contactMessage":
      if (!value) errorMsg = "Please enter your message.";
      else if (value.length < 20) errorMsg = "Message must be at least 20 characters.";
      break;
  }

  const errorEl = document.getElementById(id.replace("contact", "").toLowerCase() + "Error");
  if (errorEl) errorEl.textContent = errorMsg;

  if (errorMsg) {
    input.classList.add("error");
    return false;
  } else {
    input.classList.remove("error");
    return true;
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function handleFormSubmit() {
  const nameInput = document.getElementById("contactName");
  const emailInput = document.getElementById("contactEmail");
  const subjectInput = document.getElementById("contactSubject");
  const messageInput = document.getElementById("contactMessage");
  const submitBtn = document.getElementById("submitBtn");
  const successEl = document.getElementById("formSuccess");

  // Validate all fields
  const validName = validateField(nameInput);
  const validEmail = validateField(emailInput);
  const validSubject = validateField(subjectInput);
  const validMessage = validateField(messageInput);

  if (!validName || !validEmail || !validSubject || !validMessage) return;

  // Simulate submit loading
  submitBtn.disabled = true;
  const btnSpan = submitBtn.querySelector("span");
  if (btnSpan) btnSpan.textContent = "Sending...";

  // Log form data to console (frontend-only behavior)
  console.log("=== CONTACT FORM SUBMISSION ===");
  console.log("Name:", nameInput.value.trim());
  console.log("Email:", emailInput.value.trim());
  console.log("Subject:", subjectInput.value.trim());
  console.log("Message:", messageInput.value.trim());
  console.log("=== Connect a backend API to receive this data ===");
  console.log("Options: EmailJS | Formspree | Flask backend | Netlify Forms");

  // Simulate async delay
  setTimeout(() => {
    submitBtn.disabled = false;
    if (btnSpan) btnSpan.textContent = "Send Message";

    // Show success message
    if (successEl) {
      successEl.classList.add("show");
      successEl.setAttribute("aria-hidden", "false");
    }

    // Reset form
    document.getElementById("contactForm").reset();

    // Hide success after 8 seconds
    setTimeout(() => {
      if (successEl) {
        successEl.classList.remove("show");
        successEl.setAttribute("aria-hidden", "true");
      }
    }, 8000);
  }, 1000);
}


/* ======================== BACK TO TOP ======================== */
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


/* ======================== FOOTER YEAR ======================== */
function initFooterYear() {
  const el = document.getElementById("footerYear");
  if (el) el.textContent = new Date().getFullYear();
}


/* ======================== UTILITY ======================== */

// Debounce helper
function debounce(fn, wait) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), wait);
  };
}
