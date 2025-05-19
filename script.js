// script.js
// Bottom-nav interaction logic

document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.bottom-nav .nav-item, .bottom-nav .home-button');
  
    items.forEach(item => {
      item.addEventListener('click', () => {
        // Remove active state from all
        items.forEach(i => i.classList.remove('active'));
        // Add active to clicked
        item.classList.add('active');
        // TODO: navigate to corresponding section based on data-index
      });
    });
  });

// DOMContentLoaded

document.addEventListener('DOMContentLoaded', () => {
    // Bottom-nav logic (unchanged)
    const navItems = document.querySelectorAll('.bottom-nav .nav-item, .bottom-nav .home-button');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      });
    });
  
    // Hero slider logic
    const slides = document.querySelector('.slides');
    const slideItems = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
  
    function goToSlide(index) {
      currentIndex = (index + slideItems.length) % slideItems.length;
      slides.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach(dot => dot.classList.remove('active'));
      dots[currentIndex].classList.add('active');
    }
  
    dots.forEach(dot => {
      dot.addEventListener('click', () => goToSlide(parseInt(dot.dataset.index)));
    });
  
    // Optional: swipe support
    let startX = 0;
    slides.addEventListener('touchstart', e => startX = e.touches[0].clientX);
    slides.addEventListener('touchend', e => {
      const endX = e.changedTouches[0].clientX;
      if (endX - startX > 50) goToSlide(currentIndex - 1);
      if (startX - endX > 50) goToSlide(currentIndex + 1);
    });
  
    // Sections card clicks
    document.querySelectorAll('.section-card').forEach(card => {
      card.addEventListener('click', () => {
        const section = card.dataset.section;
        // TODO: navigate to `section`
        console.log('Navigate to', section);
      });
    });
  });