let dataHira = [];

fetch('lyrics.json')
    .then(res => res.json())
    .then(json => {
        dataHira = json.songs;

        dataHira.sort((a, b) => {
            return a.title.localeCompare(b.title);
        });

        asehoyLisitra(dataHira);
    })
    .catch(err => console.error("Error:", err));

function asehoyLisitra(hiraHaseho) {
    const divLisitra = document.getElementById('lisitraHira');
    divLisitra.innerHTML = '';
    
    hiraHaseho.forEach(hira => {
        const item = document.createElement('div');
        item.className = 'hira-card';

        item.innerHTML = `
            <strong>${hira.title}</strong>
            <span>${hira.artist || ''}</span>
        `;

        item.onclick = () => hamakyHira(hira.id);
        divLisitra.appendChild(item);
    });
}

function hikaroka() {
    const teny = document.getElementById('searchInput').value.toLowerCase();
    const sivana = dataHira.filter(h => 
        h.title.toLowerCase().includes(teny) ||
        (h.artist && h.artist.toLowerCase().includes(teny))
    );
    asehoyLisitra(sivana);
}

function hamakyHira(id) {
    const hira = dataHira.find(h => h.id === id);
    
    if (!hira) return;

    document.getElementById('home-page').style.display = 'none';
    document.getElementById('detail-page').style.display = 'block';
    
    document.getElementById('view-lohateny').innerText = hira.title;
    document.getElementById('view-mpihira').innerText = hira.artist || '';
    
    document.getElementById('view-tononkira').innerText = hira.lyrics.join('\n');
}

function hody() {
    document.getElementById('home-page').style.display = 'block';
    document.getElementById('detail-page').style.display = 'none';
}
