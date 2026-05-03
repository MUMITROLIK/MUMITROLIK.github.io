// Language switching
function switchToUk(e) {
  if (e) e.preventDefault();
  setLang('uk');
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
  console.log('openProjectModal called with:', url);
  currentProjectUrl = url;
  const modal = document.getElementById('github-modal');
  console.log('Modal element:', modal);
  console.log('Current URL set to:', currentProjectUrl);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    console.log('Modal opened');
  } else {
    console.error('Modal not found!');
  }
}

function closeProjectModal(event) {
  if (event && event.target !== event.currentTarget) return;
  const modal = document.getElementById('github-modal');
  if (modal) {
    modal.classList.remove('active');
  }
  document.body.style.overflow = '';
  currentProjectUrl = '';
}

function confirmProject() {
  console.log('confirmProject called, opening:', currentProjectUrl);
  if (currentProjectUrl) {
    window.open(currentProjectUrl, '_blank');
  }
  closeProjectModal();
}

function openGitHubModal() {
  openProjectModal('https://github.com/MUMITROLIK');
}

console.log('Script loaded successfully');

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
  html.classList.remove('lang-uk', 'lang-en');
  html.classList.add('lang-' + lang);

  const btnUk = document.getElementById('btn-uk');
  const btnEn = document.getElementById('btn-en');
  
  if (lang === 'uk') {
    btnUk.classList.add('on');
    btnEn.classList.remove('on');
  } else {
    btnEn.classList.add('on');
    btnUk.classList.remove('on');
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

// Project hover effects - only for visual feedback, not for click handling
document.querySelectorAll('.proj').forEach(project => {
  project.addEventListener('mouseenter', function() {
    project.classList.add('active');
  });
  
  project.addEventListener('mouseleave', function() {
    project.classList.remove('active');
  });
});

// Initialize theme from storage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.documentElement.classList.add('dark-theme');
}

// Initialize on load
window.addEventListener('load', () => {
  const btnUk = document.getElementById('btn-uk');
  const btnEn = document.getElementById('btn-en');
  
  if (btnUk && btnEn) {
    btnUk.addEventListener('click', switchToUk, false);
    btnEn.addEventListener('click', switchToEn, false);
  }
  
  setLang('uk');
});

// Backup initialization
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(() => setLang('uk'), 100);
}
