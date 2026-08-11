// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Nav shadow / condensed state on scroll (subtle, no layout shift)
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 12) {
    nav.style.boxShadow = '0 1px 0 rgba(20,23,31,0.04)';
  } else {
    nav.style.boxShadow = 'none';
  }
}, { passive: true });
