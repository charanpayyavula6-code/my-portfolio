document.addEventListener('DOMContentLoaded', () => {
  // Sidebar Toggle
  const toggleBtn = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('adminSidebar');
  
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  // Theme Toggle
  const themeToggle = document.getElementById('adminThemeToggle');
  const themeIcon = document.getElementById('adminThemeIcon');
  
  const savedTheme = localStorage.getItem('adminTheme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  if (themeIcon) {
    themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('adminTheme', next);
      if (themeIcon) {
        themeIcon.className = next === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      }
    });
  }

  // Auto dismiss flash alerts after 6 seconds
  const alerts = document.querySelectorAll('.admin-alert');
  alerts.forEach(alert => {
    setTimeout(() => {
      alert.style.transition = 'opacity 0.5s ease';
      alert.style.opacity = '0';
      setTimeout(() => alert.remove(), 500);
    }, 6000);
  });
});
