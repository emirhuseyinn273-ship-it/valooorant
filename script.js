document.getElementById('accountForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Securely send credentials to your server
    fetch('/api/check-skins', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        displaySkins(data.skins);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

function displaySkins(skins) {
    const skinsContainer = document.getElementById('skinsContainer');
    skinsContainer.innerHTML = ''; // Clear previous results

    if (skins.length === 0) {
        skinsContainer.innerHTML = '<p>No skins found for this account.</p>';
        return;
    }

    skins.forEach(skin => {
        const skinElement = document.createElement('div');
        skinElement.className = 'skin';
        skinElement.innerHTML = `
            <img src="${skin.imageUrl}" alt="${skin.name}">
            <p>${skin.name}</p>
        `;
        skinsContainer.appendChild(skinElement);
    });
}
