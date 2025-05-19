document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('product-search');
  const tabs = document.querySelectorAll('.category-tabs .tab');
  const cards = document.querySelectorAll('.product-card');
  const activeLabel = document.getElementById('activeCategoryLabel');

  // Filter function
  function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const activeCategory = document.querySelector('.category-tabs .tab.active').dataset.category;

    cards.forEach(card => {
      const title = card.querySelector('h6').innerText.toLowerCase();
      const matchesSearch   = title.includes(searchTerm);
      const matchesCategory = activeCategory === 'Helmets' || card.dataset.category === activeCategory;
      card.style.display = (matchesSearch && matchesCategory) ? 'block' : 'none';
    });
  }

  // Initial render
  filterProducts();

  // Update label and re-filter when a tab is clicked
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Toggle active class
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update the label text
      const cat = tab.dataset.category;
      activeLabel.textContent = cat === 'Helmets' ? 'Helmets' : cat;

      // Reapply filter
      filterProducts();
    });
  });

  // Live search
  searchInput.addEventListener('input', filterProducts);
});
