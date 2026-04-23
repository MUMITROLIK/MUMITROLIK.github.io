/* ── Глобальные функции для inline-обработчиков ── */
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

function toggleTheme(e) {
  if (e) e.preventDefault();
  var html = document.documentElement;
  var btn = document.getElementById('btn-theme');
  
  if (html.classList.contains('dark-theme')) {
    html.classList.remove('dark-theme');
    btn.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  } else {
    html.classList.add('dark-theme');
    btn.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  }
  return false;
}

/* ── Lang ── */
var ROLE_TEXT = 'Junior Software Developer';

function setLang(l) {
  var html = document.documentElement;
  html.lang = l;
  html.classList.remove('lang-ru', 'lang-en');
  html.classList.add('lang-' + l);

  var btnRu = document.getElementById('btn-ru');
  var btnEn = document.getElementById('btn-en');
  if (l === 'ru') {
    btnRu.classList.add('on');
    btnEn.classList.remove('on');
  } else {
    btnEn.classList.add('on');
    btnRu.classList.remove('on');
  }
  runWriter(ROLE_TEXT);
}

/* ── Typewriter ── */
var writerTimer = null;
function runWriter(text) {
  var el = document.getElementById('cv-role');
  if (writerTimer) clearTimeout(writerTimer);
  el.innerHTML = '<span class="blink-caret"></span>';
  var i = 0;
  function next() {
    if (i <= text.length) {
      el.innerHTML = text.slice(0, i) + '<span class="blink-caret"></span>';
      i++;
      writerTimer = setTimeout(next, 55);
    }
  }
  next();
}

/* ── Scroll reveal ── */
function showSec(el) { el.classList.add('visible'); }

if ('IntersectionObserver' in window) {
  document.documentElement.classList.add('js-loaded');
  var watcher = new IntersectionObserver(function(entries) {
    for (var j = 0; j < entries.length; j++) {
      if (entries[j].isIntersecting) {
        showSec(entries[j].target);
        watcher.unobserve(entries[j].target);
      }
    }
  }, { threshold: 0, rootMargin: '0px 0px -10px 0px' });
  var secs = document.querySelectorAll('.sec');
  for (var k = 0; k < secs.length; k++) { watcher.observe(secs[k]); }
  setTimeout(function() {
    var hidden = document.querySelectorAll('.sec:not(.visible)');
    for (var m = 0; m < hidden.length; m++) { showSec(hidden[m]); }
  }, 600);
}

/* ── Touch effect on projects ── */
var projs = document.querySelectorAll('.proj');
for (var p = 0; p < projs.length; p++) {
  (function(proj) {
    // Функция активации
    function activateProj() {
      var allProjs = document.querySelectorAll('.proj');
      for (var i = 0; i < allProjs.length; i++) {
        if (allProjs[i] !== proj) allProjs[i].classList.remove('active');
      }
      proj.classList.add('active');
      setTimeout(function() { proj.classList.remove('active'); }, 400);
    }
    
    // Множественные обработчики
    proj.addEventListener('touchstart', activateProj, false);
    proj.addEventListener('click', activateProj, false);
    proj.onclick = activateProj;
  })(projs[p]);
}

/* ── Init ── */
// Инициализация темы из localStorage
var savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.documentElement.classList.add('dark-theme');
  var themeBtn = document.getElementById('btn-theme');
  if (themeBtn) themeBtn.textContent = '☀️';
}

// Дополнительные обработчики для совместимости
window.addEventListener('load', function() {
  var btnRu = document.getElementById('btn-ru');
  var btnEn = document.getElementById('btn-en');
  
  if (btnRu && btnEn) {
    btnRu.addEventListener('click', switchToRu, false);
    btnEn.addEventListener('click', switchToEn, false);
  }
  
  // Инициализация языка
  setLang('ru');
});

// Запасная инициализация если load не сработает
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(function() { setLang('ru'); }, 100);
}
