// --- DATA KONFIGURASI ---
const tripDB = [
    { 
        id: 'lawu', name: 'LAWU', loc: 'JAWA TENGAH', alt: '3265 MDPL', price: 'IDR 1.450K', prog: 70, 
        images: [
            '/Users/test/Downloads/RINTISJEKA/images/lawu4.jpg',
            '/Users/test/Downloads/RINTISJEKA/images/lawu10.jpg',
            '/Users/test/Downloads/RINTISJEKA/images/lawu6.JPG'
        ], 
        desc: 'Gerbang menuju keindahan abadi di perbatasan Jawa. Jalur klasik dengan pemandangan sabana yang luas.' 
    },
    { 
        id: 'slamet', name: 'SLAMET', loc: 'JAWA TENGAH', alt: '3428 MDPL', price: 'IDR 1.200K', prog: 70, 
        images: [
            '/Users/test/Downloads/RINTISJEKA/images/slamet1.jpeg',
            '/Users/test/Downloads/RINTISJEKA/images/slamet3.JPG',
            '/Users/test/Downloads/RINTISJEKA/images/slamet5.JPG'
        ], 
        desc: 'Gunung tunggal terbesar di Jawa. Menantang adrenalin dengan jalur bebatuan dan pasir yang curam.' 
    },
    { 
        id: 'merbabu', name: 'MERBABU', loc: 'JAWA TENGAH', alt: '3.145 MDPL', price: 'IDR 1.800K', prog: 30, 
        images: [
             '/Users/test/Downloads/RINTISJEKA/images/merbabu6.HEIC',
            '/Users/test/Downloads/RINTISJEKA/images/merbabu1.jpg'
        ], 
        desc: 'gunung berapi tipe Stratovulcano di Jawa Tengah yang terkenal dengan padang sabana luas dan pemandangan lima gunung (Merapi, Sumbing, Sindoro, Lawu, Slamet). Terletak di perbatasan Magelang, Boyolali, dan Semarang' 
    }
];

const teamDB = [
    { name: 'Tegar Budi Santoso.', role: 'EXPEDITION LEAD', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', xp: '10 Yrs Experience' },
    { name: 'Muhammad Abid Asa.', role: 'LOGISTIC & MEDIC', img: '/Users/test/Downloads/RINTISJEKA/images/abid.jpeg', xp: 'Outdoor First-Aid' },
    { name: 'M. Dzikri Syahid.', role: 'CHIEF GUIDE', img: '/Users/test/Downloads/RINTISJEKA/images/Muhammad Dzikri Syahid.jpeg', xp: 'Certified Guide' }
];

// --- CORE SYSTEM ---
let currentImgIndex = 0;
let currentActiveTrip = null;

const lenis = new Lenis();
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

function startApp() { gsap.to("#intro-layer", { y: "-100%", duration: 1.2, ease: "expo.inOut" }); }

document.addEventListener('mousemove', e => { gsap.to("#cursor", { x: e.clientX, y: e.clientY, duration: 0.1 }); });

// --- RENDER MISSIONS ---
function renderMissions(filter = "") {
    const container = document.getElementById('grid-container');
    container.innerHTML = tripDB.filter(t => t.name.includes(filter.toUpperCase())).map(t => `
        <div class="card" onclick="openTrip('${t.id}')">
            <div class="c-media"><img src="${t.images[0]}"></div>
            <div class="c-body">
                <small style="color:var(--accent); font-weight:700;">${t.loc}</small>
                <h3 style="margin:5px 0; font-family:'Unbounded';">${t.name}</h3>
                <div style="height:2px; background:#333; margin:10px 0;">
                    <div style="width:${t.prog}%; height:100%; background:var(--accent);"></div>
                </div>
            </div>
        </div>
    `).join('');
}

// --- ALBUM SLIDER ---
window.openTrip = (id) => {
    currentActiveTrip = tripDB.find(x => x.id === id);
    currentImgIndex = 0;
    document.getElementById('d-name').innerText = currentActiveTrip.name;
    document.getElementById('d-alt').innerText = currentActiveTrip.alt;
    document.getElementById('d-price').innerText = currentActiveTrip.price;
    document.getElementById('d-desc').innerText = currentActiveTrip.desc;
    updateSlider();
    document.getElementById('detail-scene').style.display = 'block';
    gsap.fromTo("#detail-scene", { opacity: 0 }, { opacity: 1, duration: 0.5 });
};

function updateSlider() {
    const imgEl = document.getElementById('d-img');
    gsap.to(imgEl, { opacity: 0, duration: 0.2, onComplete: () => {
        imgEl.src = currentActiveTrip.images[currentImgIndex];
        document.getElementById('img-counter').innerText = `${currentImgIndex + 1} / ${currentActiveTrip.images.length}`;
        gsap.to(imgEl, { opacity: 1, duration: 0.3 });
    }});
}

window.nextImg = () => { currentImgIndex = (currentImgIndex + 1) % currentActiveTrip.images.length; updateSlider(); };
window.prevImg = () => { currentImgIndex = (currentImgIndex - 1 + currentActiveTrip.images.length) % currentActiveTrip.images.length; updateSlider(); };
window.closeTrip = () => { gsap.to("#detail-scene", { opacity: 0, duration: 0.3, onComplete: () => { document.getElementById('detail-scene').style.display = 'none'; }}); };

// Mini Game Logic
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let active = false, player, obstacles = [], frame = 0, score = 0;

function startGame() {
    canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
    active = true; score = 0; obstacles = []; frame = 0;
    player = { y: canvas.height - 40, v: 0, grounded: true };
    document.getElementById('game-overlay').style.display = 'none';
    gameLoop();
}

window.addEventListener('keydown', e => { 
    if(e.code === 'Space' && player.grounded && active) { player.v = -15; player.grounded = false; }
    if(e.key === 'Escape') closeTrip();
    if(e.key === 'ArrowRight' && currentActiveTrip) nextImg();
    if(e.key === 'ArrowLeft' && currentActiveTrip) prevImg();
});

function gameLoop() {
    if(!active) return;
    ctx.clearRect(0,0, canvas.width, canvas.height);
    player.v += 0.8; player.y += player.v;
    if(player.y > canvas.height - 40) { player.y = canvas.height - 40; player.grounded = true; }
    ctx.fillStyle = '#ff3c00'; ctx.fillRect(50, player.y - 30, 30, 30);
    if(frame % 100 === 0) obstacles.push({ x: canvas.width, w: 30, h: 40 });
    obstacles.forEach((o, i) => {
        o.x -= 7;
        ctx.fillStyle = '#fff'; ctx.fillRect(o.x, canvas.height - o.h, o.w, o.h);
        if(o.x < 80 && o.x + 30 > 50 && player.y > canvas.height - 50) active = false;
    });
    if(!active) document.getElementById('game-overlay').style.display = 'flex';
    score++; document.getElementById('score-val').innerText = Math.floor(score/10);
    frame++; requestAnimationFrame(gameLoop);
}

// Start Init
document.getElementById('mountain-search').addEventListener('input', e => renderMissions(e.target.value));
window.toggleTheme = () => document.body.classList.toggle('light-mode');
renderMissions();

document.getElementById('team-container').innerHTML = teamDB.map(t => `
    <div class="char-card">
        <img src="${t.img}">
        <div class="char-info">
            <h3 style="font-family:'Unbounded';">${t.name}</h3>
            <p style="color:var(--accent); font-size:0.8rem; font-weight:700;">${t.role}</p>
            <small style="opacity:0.6;">${t.xp}</small>
        </div>
    </div>
`).join('');