// buy.js: Search + brand dropdown + price range + category chips
document.addEventListener('DOMContentLoaded', () => {
  const searchInput   = document.getElementById('bike-search');
  const toggleFilters = document.getElementById('toggle-filters');
  const filterPanel   = document.getElementById('filter-panel');
  const brandFilter   = document.getElementById('brand-filter');
  const priceMin      = document.getElementById('price-min');
  const priceMax      = document.getElementById('price-max');
  const chips         = Array.from(document.querySelectorAll('.filter-chip'));
  const resultCount   = document.getElementById('result-count');
  const cards         = Array.from(document.querySelectorAll('.bike-card'));

  // State
  const state = {
    term: '',
    brand: 'all',
    min: 0,
    max: Infinity,
    category: 'all'
  };

  // Toggle filter panel
  toggleFilters.addEventListener('click', () =>
    filterPanel.classList.toggle('collapsed')
  );

  // Debounce helper
  const debounce = (fn, ms = 200) => {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), ms);
    };
  };

  // Apply filters
  function applyFilters() {
    let visible = 0;
    cards.forEach(card => {
      const name     = card.querySelector('h5').textContent.toLowerCase();
      const brand    = card.dataset.brand;
      const price    = parseInt(card.dataset.price, 10);
      const category = card.dataset.category;
      const termOK   = !state.term || name.includes(state.term);
      const brandOK  = state.brand === 'all' || state.brand === brand;
      const minOK    = price >= state.min;
      const maxOK    = price <= state.max;
      const catOK    = state.category === 'all' || state.category === category;

      const show = termOK && brandOK && minOK && maxOK && catOK;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    resultCount.textContent = `${visible} bikes found`;
  }

  // Handlers
  searchInput.addEventListener('input',
    debounce(e => {
      state.term = e.target.value.trim().toLowerCase();
      applyFilters();
    })
  );

  brandFilter.addEventListener('change', e => {
    state.brand = e.target.value;
    applyFilters();
  });

  priceMin.addEventListener('input', debounce(e => {
    state.min = e.target.value ? parseInt(e.target.value,10) : 0;
    applyFilters();
  }));

  priceMax.addEventListener('input', debounce(e => {
    state.max = e.target.value ? parseInt(e.target.value,10) : Infinity;
    applyFilters();
  }));

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.category = chip.dataset.value;
      applyFilters();
    });
  });

  // Initialize
  applyFilters();
});
