
window.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelector('.slides');
  const images = document.querySelectorAll('.slides img');
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');

  let index = 0;
  const total = images.length;

  function showSlide(i) {
    if (!slides) return;
    slides.style.transform = `translateX(${-i * 800}px)`; 
  }

  if (next) {
    next.addEventListener('click', () => {
      index = (index + 1) % total;
      showSlide(index);
    });
  }

  if (prev) {
    prev.addEventListener('click', () => {
      index = (index - 1 + total) % total;
      showSlide(index);
    });
  }

  
  if (total > 0) {
    setInterval(() => {
      index = (index + 1) % total;
      showSlide(index);
    }, 3000);
  }
});