const IMG_PATH = 'images/';
const lenis = new Lenis();
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

let currentImgIndex = 0;
let activeTrip = null;

// --- DATABASE MISSIONS ---
const tripDB = [
    { id: 'm1', name: 'LAWU EXPEDITION', loc: 'MISSION // 01', images: ['lawu4.jpg', 'lawu10.jpg','lawu6.jpg'], alt: '3265 MDPL', price: 'IDR 850K', desc: 'Misi pendakian di perbatasan Jawa Tengah.' },
    { id: 'm2', name: 'SLAMET EXPEDITION', loc: 'MISSION // 02', images: ['slamet1.jpg', 'slamet3.jpg','slamet5.jpg'], alt: '3428 MDPL', price: 'IDR 850K', desc: 'Menembus atap Jawa Tengah.' },
    { id: 'm3', name: 'MERBABU EXPEDITION', loc: 'MISSION // 03', images: ['merbabu1.jpg', 'merbabu2.jpg','merbabu6.jpg'], alt: '3145 MDPL', price: 'IDR 850K', desc: 'Sabana luas dan kabut abadi.' },
    { id: 'm4', name: 'CIREMAI EXPEDITION', loc: 'MISSION // 04', images: ['ciremai1.jpg', 'ciremai3.jpg','ciremai5.jpg'], alt: '3078 MDPL', price: 'IDR 850K', desc: 'Atap Jawa Barat yang menantang.' },
    { id: 'e1', name: 'PRAU EXPLORE', loc: 'EXPLORE // 01', images: ['prau1.jpg', 'prau2.jpg'], alt: '2565 MDPL', price: 'IDR 750K', desc: 'Eksplorasi sunrise terbaik.' },
    { id: 'e2', name: 'GEDE EXPLORE', loc: 'EXPLORE // 02', images: ['gede1.jpg', 'gede2.jpg'], alt: '2958 MDPL', price: 'IDR 750K', desc: 'Alun-alun Surya Kencana.' },
    { id: 'e3', name: 'PAPANDAYAN EXPLORE', loc: 'EXPLORE // 03', images: ['papandayan1.jpg', 'papandayan2.jpg'], alt: '2665 MDPL', price: 'IDR 750K', desc: 'Hutan mati & kawah aktif.' },
    { id: 'e4', name: 'SINDORO EXPLORE', loc: 'EXPLORE // 04', images: ['sindoro1.jpg', 'sindoro2.jpg'], alt: '3153 MDPL', price: 'IDR 750K', desc: 'Lautan awan Jawa Tengah.' }
];

// --- DATABASE VIDEO ---
const videoDB = [
    { title: 'RINJANI JOURNEY', url: 'https://www.youtube.com/embed/VOL5e9zGQrA' },
    { title: 'MT GEDE CINEMATIC', url: 'https://www.youtube.com/embed/zwFTTr6OL98' }
];

// --- DATABASE TEAM (4 Core + 4 Ops) ---
const teamDB = [
    { id:'f1', name: 'Tegar Budi S.', role: 'CEO / FOUNDER', type: 'core', img: 'tegar.jpg', bio: 'Visioner Rintis Arah.', exp: '35+ Peaks', spec: 'Strategy' },
    { id:'f2', name: 'M.Dzikri S', role: 'SECRETARY / FOUNDER', type: 'core', img: 'jeka.jpg', bio: 'Admin Manajer.', exp: '15+ Peaks', spec: 'Admin' },
    { id:'f3', name: 'Abid Assa', role: 'MEDIA / FOUNDER', type: 'core', img: 'abid.jpg', bio: 'Visual Storyteller.', exp: '20+ Peaks', spec: 'Visuals' },
    { id:'f4', name: 'Muhammad Dafiq', role: 'RnD / FOUNDER', type: 'core', img: 'abids.jpg', bio: 'Riset Rute.', exp: '40+ Peaks', spec: 'Research' },
    { id:'o1', name: 'Anang', role: 'FIELD OPS', type: 'ops', img: 'abids.jpg', bio: 'Logistik.', exp: '25+', spec: 'Logistic' },
    { id:'o2', name: 'sonny', role: 'FIELD OPS', type: 'ops', img: 'andi.jpg', bio: 'Navigator.', exp: '20+', spec: 'Navigation' },
    { id:'o3', name: 'Arul', role: 'FIELD OPS', type: 'ops', img: 'budi.jpg', bio: 'Medis.', exp: '18+', spec: 'Medic' },
    { id:'o4', name: 'Rony', role: 'FIELD OPS', type: 'ops', img: 'rian.jpg', bio: 'Gear.', exp: '15+', spec: 'Tools' }
];

const eduDB = [
    { title: 'GEAR STUDY', img: 'edu_gear.jpg' },
    { title: 'SAFETY STUDY', img: 'edu_safety.jpg' },
    { title: 'NAV STUDY', img: 'edu_nav.jpg' },
    { title: 'ETHICS STUDY', img: 'edu_ethics.jpg' }
];

// --- 4. DATA FEEDBACK (quoteDB) ---
const quoteDB = [
    { 
        text: "Pengalaman luar biasa bersama Rintis Arah!", 
        author: "Customer A", 
        img: 'user1.jpg' 
    }, // Harus ada koma di sini
    { 
        text: "Logistik mewah, dokumentasi gokil.", 
        author: "Customer B", 
        img: 'user2.jpg' 
    }, // Harus ada koma di sini
    { 
        text: "Guide sangat sabar, cocok buat yang baru pertama naik gunung.", 
        author: "Customer C", 
        img: 'user3.jpg' 
    },
     { 
        text: "Guide sangat sabar, cocok buat yang baru pertama naik gunung.", 
        author: "Customer C", 
        img: 'user3.jpg' 
    } // Baris terakhir tidak wajib pakai koma, tapi disarankan pakai koma juga boleh// Baris terakhir tidak wajib pakai koma, tapi disarankan pakai koma juga boleh
    
];

function startApp() { gsap.to("#intro-layer", { y: "-100%", duration: 1, ease: "power4.inOut" }); }

function init() {
    document.getElementById('grid-container').innerHTML = tripDB.map(t => `<div class="card" onclick="openTrip('${t.id}')"><div class="media-box"><img src="${IMG_PATH + t.images[0]}" onerror="this.src='https://placehold.co/600x400?text=Mission'"></div><div class="content-box"><small style="color:var(--accent)">${t.loc}</small><h3>${t.name}</h3></div></div>`).join('');
    document.getElementById('video-container').innerHTML = videoDB.map(v => `<div class="video-card"><iframe src="${v.url}" allowfullscreen></iframe><div class="content-box"><h3>${v.title}</h3></div></div>`).join('');
    document.getElementById('edu-container').innerHTML = eduDB.map(e => `<div class="edu-card"><div class="media-box"><img src="${IMG_PATH + e.img}" onerror="this.src='https://placehold.co/600x400?text=Study'"></div><div class="content-box"><h3>${e.title}</h3></div></div>`).join('');
    document.getElementById('team-container').innerHTML = teamDB.map(t => `<div class="char-card ${t.type === 'core' ? 'card-large' : 'card-small'}" onclick="openTeam('${t.id}')"><img src="${IMG_PATH + t.img}" onerror="this.src='https://placehold.co/400x600?text=Crew'"><div class="char-info"><h3>${t.name}</h3><p>${t.role}</p></div></div>`).join('');
    document.getElementById('quote-container').innerHTML = quoteDB.map(q => `<div class="quote-card"><div class="content-box"><p>"${q.text}"</p><small>${q.author}</small></div></div>`).join('');

    gsap.registerPlugin(ScrollTrigger);
    gsap.from("#h-title", { y: 100, opacity: 0, duration: 1.5, delay: 0.5 });
}

function updateSlider() {
    const img = document.getElementById('d-img');
    gsap.to(img, { opacity: 0, duration: 0.2, onComplete: () => {
        img.src = IMG_PATH + activeTrip.images[currentImgIndex];
        gsap.to(img, { opacity: 1 });
    }});
    document.getElementById('img-counter').innerText = `${currentImgIndex + 1} / ${activeTrip.images.length}`;
}

window.openTrip = (id) => {
    activeTrip = tripDB.find(x => x.id === id);
    currentImgIndex = 0; updateSlider();
    document.getElementById('d-name').innerText = activeTrip.name;
    document.getElementById('d-alt').innerText = activeTrip.alt;
    document.getElementById('d-price').innerText = activeTrip.price;
    document.getElementById('d-desc').innerText = activeTrip.desc;
    document.getElementById('detail-scene').style.display = 'block';
};

window.nextImg = () => { currentImgIndex = (currentImgIndex + 1) % activeTrip.images.length; updateSlider(); };
window.prevImg = () => { currentImgIndex = (currentImgIndex - 1 + activeTrip.images.length) % activeTrip.images.length; updateSlider(); };

window.openTeam = (id) => {
    const t = teamDB.find(x => x.id === id);
    document.getElementById('t-name').innerText = t.name;
    document.getElementById('t-role').innerText = `// ${t.role}`;
    document.getElementById('t-bio').innerText = t.bio;
    document.getElementById('t-exp').innerText = t.exp;
    document.getElementById('t-spec').innerText = t.spec;
    document.getElementById('t-img').src = IMG_PATH + t.img;
    document.getElementById('team-modal').style.display = 'block';
};

window.closeTrip = () => { document.getElementById('detail-scene').style.display = 'none'; };
window.closeTeam = () => { document.getElementById('team-modal').style.display = 'none'; };

init();
