// Language switching
function switchToRu(e) {
  if (e) e.preventDefault();
  setLang('ru');
  return false;
}

function switchToEn(e) {
  if (e) e.preventDefault();
  setLang('en');
  return false;
}

// GitHub modal
let currentProjectUrl = '';

function openProjectModal(url) {
  currentProjectUrl = url;
  const modal = document.getElementById('github-modal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal(event) {
  if (event && event.target !== event.currentTarget) return;
  const modal = document.getElementById('github-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
  currentProjectUrl = '';
}

function confirmProject() {
  if (currentProjectUrl) {
    window.open(currentProjectUrl, '_blank');
  }
  closeProjectModal();
}

function openGitHubModal() {
  openProjectModal('https://github.com/MUMITROLIK');
}

// Theme toggle
function toggleTheme(e) {
  if (e) e.preventDefault();
  const html = document.documentElement;
  const isDark = html.classList.contains('dark-theme');
  
  if (isDark) {
    html.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
  } else {
    html.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
  }
  return false;
}

const ROLE_TEXT = 'Junior Software Developer';

function setLang(lang) {
  const html = document.documentElement;
  html.lang = lang;
  html.classList.remove('lang-ru', 'lang-en');
  html.classList.add('lang-' + lang);

  const btnRu = document.getElementById('btn-ru');
  const btnEn = document.getElementById('btn-en');
  
  if (lang === 'ru') {
    btnRu.classList.add('on');
    btnEn.classList.remove('on');
  } else {
    btnEn.classList.add('on');
    btnRu.classList.remove('on');
  }
  
  typeWriter(ROLE_TEXT);
}

// Typewriter effect
let typingTimeout = null;

function typeWriter(text) {
  const element = document.getElementById('cv-role');
  if (typingTimeout) clearTimeout(typingTimeout);
  
  element.innerHTML = '<span class="blink-caret"></span>';
  let index = 0;
  
  function type() {
    if (index <= text.length) {
      element.innerHTML = text.slice(0, index) + '<span class="blink-caret"></span>';
      index++;
      typingTimeout = setTimeout(type, 55);
    }
  }
  
  type();
}

// Scroll animations
function revealSection(el) { 
  el.classList.add('visible'); 
}

if ('IntersectionObserver' in window) {
  document.documentElement.classList.add('js-loaded');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        revealSection(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0, 
    rootMargin: '0px 0px -10px 0px' 
  });
  
  document.querySelectorAll('.sec').forEach(sec => observer.observe(sec));
  
  // Fallback for sections that might not trigger
  setTimeout(() => {
    document.querySelectorAll('.sec:not(.visible)').forEach(revealSection);
  }, 600);
}

// Project hover effects
document.querySelectorAll('.proj').forEach(project => {
  function activate() {
    document.querySelectorAll('.proj').forEach(p => {
      if (p !== project) p.classList.remove('active');
    });
    project.classList.add('active');
    setTimeout(() => project.classList.remove('active'), 400);
  }
  
  project.addEventListener('touchstart', activate, false);
  project.addEventListener('click', activate, false);
  project.onclick = activate;
});

// Initialize theme from storage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.documentElement.classList.add('dark-theme');
}

// Initialize on load
window.addEventListener('load', () => {
  const btnRu = document.getElementById('btn-ru');
  const btnEn = document.getElementById('btn-en');
  
  if (btnRu && btnEn) {
    btnRu.addEventListener('click', switchToRu, false);
    btnEn.addEventListener('click', switchToEn, false);
  }
  
  setLang('ru');
});

// Backup initialization
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(() => setLang('ru'), 100);
}
