// Data for demo bikes
const bikes = [
    {
        id: 1,
        name: 'Desert Storm',
        model: 'DS-300',
        brand: 'XMoto',
        features: 'LED Lights, ABS, Digital Console',
        mileage: '40 km/l',
        pricePerDay: 25,
        securityDeposit: 100,
        image: 'images/bike1.jpg'
    },
    {
        id: 2,
        name: 'City Cruiser',
        model: 'CC-150',
        brand: 'UrbanRide',
        features: 'Under-seat Storage, Bluetooth',
        mileage: '55 km/l',
        pricePerDay: 18,
        securityDeposit: 80,
        image: 'images/bike2.jpg'
    }
];

const bikeCardsEl = document.getElementById('bikeCards');
const rentModal = document.getElementById('rentModal');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');

function renderBikes() {
    bikes.forEach(bike => {
        const card = document.createElement('div');
        card.className = 'bike-card';
        card.id = `bike-${bike.id}`;
        card.innerHTML = `
            <img src="${bike.image}" alt="${bike.name}" />
            <h2>${bike.name}</h2>
            <p><strong>Model:</strong> ${bike.model}</p>
            <p><strong>Brand:</strong> ${bike.brand}</p>
            <p><strong>Features:</strong> ${bike.features}</p>
            <p><strong>Mileage:</strong> ${bike.mileage}</p>
            <p><strong>Price/day:</strong> $${bike.pricePerDay}</p>
            <p><strong>Deposit:</strong> $${bike.securityDeposit}</p>
            <label>
                <input type="checkbox" class="terms-checkbox" /> I agree to the Terms & Conditions
            </label>
            <button class="rent-btn" data-id="${bike.id}">Rent Me</button>
        `;
        bikeCardsEl.appendChild(card);
    });
}

function openModal(bike) {
    modalContent.innerHTML = `
        <h3>Requirements for Renting ${bike.name}</h3>
        <label>Driver's License Number:<br /><input type="text" id="licenseInput" placeholder="Enter license number" /></label>
        <button id="proceedPayment">Proceed to Payment</button>
    `;
    rentModal.classList.remove('hidden');

    document.getElementById('proceedPayment').addEventListener('click', () => showPayment(bike));
}

function showPayment(bike) {
    modalContent.innerHTML = `
        <h3>Payment for ${bike.name}</h3>
        <p>Total for <span id="daysCount">1</span> day(s): $${bike.pricePerDay}</p>
        <input type="number" id="daysInput" min="1" value="1" /> days<br />
        <p>Security Deposit: $${bike.securityDeposit}</p>
        <button id="confirmRent">Confirm & Pay</button>
    `;

    const daysInput = document.getElementById('daysInput');
    const daysCount = document.getElementById('daysCount');
    daysInput.addEventListener('input', () => {
        const days = daysInput.value;
        daysCount.textContent = days;
        modalContent.querySelector('p').innerHTML = `Total for ${days} day(s): $${bike.pricePerDay * days}`;
    });

    document.getElementById('confirmRent').addEventListener('click', () => finalizeRent(bike));
}

function finalizeRent(bike) {
    // Simulate payment success
    const card = document.getElementById(`bike-${bike.id}`);
    card.classList.add('unavailable');
    card.innerHTML += '<div class="overlay">Not Available</div>';
    rentModal.classList.add('hidden');
}

bikeCardsEl.addEventListener('click', e => {
    if (e.target.classList.contains('rent-btn')) {
        const card = e.target.closest('.bike-card');
        const checkbox = card.querySelector('.terms-checkbox');
        if (!checkbox.checked) {
            alert('Please agree to the Terms & Conditions first.');
            return;
        }
        const bikeId = +e.target.dataset.id;
        const bike = bikes.find(b => b.id === bikeId);
        openModal(bike);
    }
});

modalClose.addEventListener('click', () => rentModal.classList.add('hidden'));

// Initialize
renderBikes();