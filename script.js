// --- 0. CONFIGURATION ---
const IMG_PATH = './images/'; 

// --- 1. DATA TRIP ---
const tripDB = [
    { 
        id: 'lawu', name: 'LAWU', loc: 'JAWA TENGAH', alt: '3265 MDPL', price: 'IDR 1.450K', prog: 70, 
        images: ['lawu4.jpg', 'lawu10.jpg', 'lawu6.jpg'], 
        desc: 'Gerbang menuju keindahan abadi di perbatasan Jawa.' 
    },
    { 
        id: 'slamet', name: 'SLAMET', loc: 'JAWA TENGAH', alt: '3428 MDPL', price: 'IDR 1.200K', prog: 70, 
        images: ['slamet1.jpg', 'slamet3.jpg', 'slamet5.jpg'], 
        desc: 'Gunung tunggal terbesar di Jawa.' 
    },
    { 
        id: 'merbabu', name: 'MERBABU', loc: 'JAWA TENGAH', alt: '3.145 MDPL', price: 'IDR 1.800K', prog: 30, 
        images: ['merbabu1.jpg', 'merbabu2.jpg', 'merbabu5.jpg'], 
        desc: 'Padang sabana luas dan pemandangan lima gunung.' 
    }
];

// --- 2. DATA VIDEO ---
const videoDB = [
    { title: 'PENDAKIAN LINTAS JALUR RINJANI via SEMBALUN-TOREAN 5 Hari 4 Malam', url: 'https://www.youtube.com/embed/VOL5e9zGQrA' },
    { title: 'GUNUNG GEDE VIA PUTRI : KABUT LEMBUT DAN HUJAN', url: 'https://youtu.be/zwFTTr6OL98?si=xvs_4ypFUIT1ZcLc' }
];

// --- 3. DATA TEAM ---
const teamDB = [
    { name: 'Tegar Budi Santoso.', role: 'EXPEDITION LEAD', img: 'tegar.jpg', xp: '10 Yrs Experience' },
    { name: 'Muhammad Abid Asa.', role: 'LOGISTIC & MEDIC', img: 'abid.jpg', xp: 'Outdoor First-Aid' },
    { name: 'M. Dzikri Syahid.', role: 'CHIEF GUIDE', img: 'jeka.jpg', xp: 'Certified Guide' }
];

// --- CORE SYSTEM ---
let currentImgIndex = 0;
let currentActiveTrip = null;

const lenis = new Lenis();
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

function startApp() { gsap.to("#intro-layer", { y: "-100%", duration: 1.2, ease: "expo.inOut" }); }

// Render Missions
function renderMissions(filter = "") {
    const container = document.getElementById('grid-container');
    container.innerHTML = tripDB.filter(t => t.name.includes(filter.toUpperCase())).map(t => `
        <div class="card" onclick="openTrip('${t.id}')">
            <div class="c-media"><img src="${IMG_PATH + t.images[0]}"></div>
            <div class="c-body">
                <small style="color:var(--accent); font-weight:700;">${t.loc}</small>
                <h3 style="font-family:'Unbounded'; font-size:1.2rem;">${t.name}</h3>
            </div>
        </div>
    `).join('');
}

// Render Videos
function renderVideos() {
    const container = document.getElementById('video-container');
    container.innerHTML = videoDB.map(v => `
        <div class="video-card">
            <iframe src="${v.url}" frameborder="0" allowfullscreen></iframe>
            <div class="v-info"><h4>${v.title}</h4></div>
        </div>
    `).join('');
}

// Modal Slider
window.openTrip = (id) => {
    currentActiveTrip = tripDB.find(x => x.id === id);
    currentImgIndex = 0;
    document.getElementById('d-name').innerText = currentActiveTrip.name;
    document.getElementById('d-alt').innerText = currentActiveTrip.alt;
    document.getElementById('d-price').innerText = currentActiveTrip.price;
    document.getElementById('d-desc').innerText = currentActiveTrip.desc;
    updateSlider();
    document.getElementById('detail-scene').style.display = 'block';
    gsap.fromTo("#detail-scene", { opacity: 0 }, { opacity: 1 });
};

function updateSlider() {
    const imgEl = document.getElementById('d-img');
    imgEl.src = IMG_PATH + currentActiveTrip.images[currentImgIndex];
    document.getElementById('img-counter').innerText = `${currentImgIndex + 1} / ${currentActiveTrip.images.length}`;
}

window.nextImg = () => { currentImgIndex = (currentImgIndex + 1) % currentActiveTrip.images.length; updateSlider(); };
window.prevImg = () => { currentImgIndex = (currentImgIndex - 1 + currentActiveTrip.images.length) % currentActiveTrip.images.length; updateSlider(); };
window.closeTrip = () => { document.getElementById('detail-scene').style.display = 'none'; };

// Close Menu Mobile on Click
const menuToggle = document.getElementById('menu-toggle');
document.querySelectorAll('.hud-item').forEach(item => {
    item.addEventListener('click', () => { if(menuToggle) menuToggle.checked = false; });
});

// Init
renderMissions();
renderVideos();
document.getElementById('team-container').innerHTML = teamDB.map(t => `
    <div class="char-card">
        <img src="${IMG_PATH + t.img}">
        <div class="char-info">
            <h3 style="font-family:'Unbounded'; font-size:1rem;">${t.name}</h3>
            <p style="color:var(--accent); font-size:0.8rem;">${t.role}</p>
        </div>
    </div>
`).join('');
