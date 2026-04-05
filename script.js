// --- 0. CONFIGURATION ---
const IMG_PATH = './images/'; 

// --- 1. DATA TRIP (Ditambah Ciremai & Prau) ---
const tripDB = [
    { 
        id: 'lawu', name: 'LAWU', loc: 'JAWA TENGAH', alt: '3265 MDPL', price: 'IDR 1.450K', prog: 70, 
        images: ['lawu4.jpg', 'lawu10.jpg', 'lawu6.jpg'], 
        desc: 'Gerbang menuju keindahan abadi di perbatasan Jawa.' 
    },
    { 
        id: 'slamet', name: 'SLAMET', loc: 'JAWA TENGAH', alt: '3428 MDPL', price: 'IDR 1.200K', prog: 70, 
        images: ['slamet1.jpg', 'slamet3.jpg', 'slamet5.jpg'], 
        desc: 'Gunung tunggal terbesar di Jawa. Menantang adrenalin.' 
    },
    { 
        id: 'merbabu', name: 'MERBABU', loc: 'JAWA TENGAH', alt: '3.145 MDPL', price: 'IDR 1.800K', prog: 30, 
        images: ['merbabu1.jpg', 'merbabu5.jpg', 'merbabu6.jpg'], 
        desc: 'Padang sabana luas dan pemandangan lima gunung.' 
    },
    { 
        id: 'ciremai', name: 'CIREMAI', loc: 'JAWA BARAT', alt: '3078 MDPL', price: 'IDR 1.100K', prog: 50, 
        images: ['ciremai1.jpg', 'ciremai2.jpg', 'ciremai8.jpg'], 
        desc: 'Atap Jawa Barat dengan tanjakan yang menguji mental.' 
    },
    { 
        id: 'prau', name: 'PRAU', loc: 'JAWA TENGAH', alt: '2565 MDPL', price: 'IDR 950K', prog: 90, 
        images: ['prau1.jpg', 'prau2.jpg', 'prau3.jpg'], 
        desc: 'Golden Sunrise terbaik di Jawa, ramah untuk pemula.' 
    }
];

// --- 2. DATA VIDEO (Link Embed Diperbaiki) ---
const videoDB = [
    { title: 'RINJANI LINTAS JALUR', url: 'https://www.youtube.com/embed/VOL5e9zGQrA' },
    { title: 'GUNUNG GEDE VIA PUTRI', url: 'https://www.youtube.com/embed/zwFTTr6OL98' }
];

// --- 3. DATA TESTIMONI ---
const quoteDB = [
    { text: "Bukan tentang puncaknya, tapi tentang teman perjalanannya. Rintis Arah mantul!", author: "Dzikri Syahid" },
    { text: "Logistik gila sih, mewah banget buat ukuran di gunung. Guide-nya juga asik.", author: "Muhammad Abid" },
    { text: "Pertama kali muncak dan nggak kapok karena krunya sabar banget.", author: "Tegar Budi" }
];

// --- 4. DATA TEAM ---
const teamDB = [
    { name: 'Tegar Budi Santoso.', role: 'EXPEDITION LEAD', img: 'tegar.jpg' },
    { name: 'Muhammad Abid Asa.', role: 'LOGISTIC & MEDIC', img: 'abid.jpg' },
    { name: 'M. Dzikri Syahid.', role: 'CHIEF GUIDE', img: 'jeka.jpg' }
];

// --- CORE SYSTEM ---
const lenis = new Lenis();
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

function startApp() { gsap.to("#intro-layer", { y: "-100%", duration: 1.2, ease: "expo.inOut" }); }

// --- RENDERERS ---
function renderMissions(filter = "") {
    const container = document.getElementById('grid-container');
    if(!container) return;
    container.innerHTML = tripDB.filter(t => t.name.includes(filter.toUpperCase())).map(t => `
        <div class="card" onclick="openTrip('${t.id}')">
            <div class="c-media"><img src="${IMG_PATH + t.images[0]}"></div>
            <div class="c-body">
                <small style="color:var(--accent); font-weight:700;">${t.loc}</small>
                <h3 style="font-family:'Unbounded'; font-size:1.1rem;">${t.name}</h3>
            </div>
        </div>
    `).join('');
}

function renderVideos() {
    document.getElementById('video-container').innerHTML = videoDB.map(v => `
        <div class="video-card">
            <iframe src="${v.url}" frameborder="0" allowfullscreen></iframe>
            <div class="v-info"><h4>${v.title}</h4></div>
        </div>
    `).join('');
}

function renderQuotes() {
    document.getElementById('quote-container').innerHTML = quoteDB.map(q => `
        <div class="quote-card">
            <p>"${q.text}"</p>
            <small>- ${q.author}</small>
        </div>
    `).join('');
}

// --- MODAL SLIDER ---
window.openTrip = (id) => {
    let trip = tripDB.find(x => x.id === id);
    document.getElementById('d-name').innerText = trip.name;
    document.getElementById('d-alt').innerText = trip.alt;
    document.getElementById('d-price').innerText = trip.price;
    document.getElementById('d-desc').innerText = trip.desc;
    document.getElementById('d-img').src = IMG_PATH + trip.images[0];
    document.getElementById('detail-scene').style.display = 'block';
    gsap.fromTo("#detail-scene", { opacity: 0 }, { opacity: 1 });
};

window.closeTrip = () => { document.getElementById('detail-scene').style.display = 'none'; };

// --- INIT ---
renderMissions();
renderVideos();
renderQuotes();
document.getElementById('team-container').innerHTML = teamDB.map(t => `
    <div class="char-card">
        <img src="${IMG_PATH + t.img}">
        <div class="char-info">
            <h3 style="font-family:'Unbounded'; font-size:1rem;">${t.name}</h3>
            <p style="color:var(--accent); font-size:0.8rem;">${t.role}</p>
        </div>
    </div>
`).join('');
