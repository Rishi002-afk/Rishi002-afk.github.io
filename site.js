// Eldersire Studios — small site behaviours
(function () {
  var nav = document.querySelector('.nav');
  function onScroll() { if (nav) nav.classList.toggle('solid', window.scrollY > 30); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  var btn = document.querySelector('.menu-btn');
  var links = document.querySelector('.nav-links');
  if (btn && links) btn.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    btn.textContent = open ? 'Close' : 'Menu';
    btn.setAttribute('aria-expanded', open);
  });

  // reveal on scroll
  var items = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else items.forEach(function (el) { el.classList.add('in'); });

  // hover-to-play previews on film cards
  document.querySelectorAll('.card-film').forEach(function (c) {
    var v = c.querySelector('video');
    if (!v) return;
    c.addEventListener('mouseenter', function () { var p = v.play(); if (p && p.catch) p.catch(function () {}); });
    c.addEventListener('mouseleave', function () { v.pause(); });
  });

  // pause muted loops when off-screen
  if ('IntersectionObserver' in window) {
    var vo = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause();
      });
    });
    document.querySelectorAll('video[data-loop]').forEach(function (v) { vo.observe(v); });
  }

  var y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();
})();
