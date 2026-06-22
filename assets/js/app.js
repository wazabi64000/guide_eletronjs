/**
 * wazabiCode — Interactions UI
 */
(function initApp() {
  const toggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  function openSidebar() {
    sidebar?.classList.add('sidebar--open');
    overlay?.classList.add('sidebar-overlay--visible');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar?.classList.remove('sidebar--open');
    overlay?.classList.remove('sidebar-overlay--visible');
    document.body.style.overflow = '';
  }

  toggle?.addEventListener('click', () => {
    sidebar?.classList.contains('sidebar--open') ? closeSidebar() : openSidebar();
  });

  overlay?.addEventListener('click', closeSidebar);

  document.querySelectorAll('.sidebar__link').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 900) closeSidebar();
    });
  });

  // Quiz : révéler les réponses au clic
  document.querySelectorAll('[data-quiz-answer]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const answer = btn.dataset.quizAnswer;
      const block = btn.closest('.quiz-block');
      const feedback = block?.querySelector('.quiz-feedback');
      if (feedback) {
        feedback.hidden = false;
        feedback.textContent = answer;
      }
    });
  });

  // Fermer sidebar au resize desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeSidebar();
  });
})();
