// --- 0. CONFIGURATION & STATE ---
// Saya menggunakan link gambar langsung dari Unsplash agar Founder bisa langsung melihat hasilnya.
const tripDB = [
    { 
        id: 'lawu', name: 'LAWU', loc: 'JAWA TENGAH', alt: '3265 MDPL', price: 'IDR 850K', 
        // Array gambar untuk fungsi slider (TIDAK DIHILANGKAN)
        images: [
            'https://images.unsplash.com/photo-1600816823908-fb8d929f957e?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1596392916541-0f7962452093?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1582236113885-356a47683935?q=80&w=800&auto=format&fit=crop'
        ], 
        desc: 'Gerbang menuju keindahan abadi di perbatasan Jawa Tengah dan Timur.' 
    },
    { 
        id: 'slamet', name: 'SLAMET', loc: 'JAWA TENGAH', alt: '3428 MDPL', price: 'IDR 850K', 
        images: [
            'https://images.unsplash.com/photo-1605342129532-6c30f4a8618e?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1578165217121-87a419409848?q=80&w=800&auto=format&fit=crop'
        ], 
        desc: 'Gunung tunggal terbesar di Jawa yang menantang mental pendaki.' 
    },
    { 
        id: 'merbabu', name: 'MERBABU', loc: 'JAWA TENGAH', alt: '3145 MDPL', price: 'IDR 850K', 
        images: [
            'https://images.unsplash.com/photo-1596392916541-0f7962452093?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600816823908-fb8d929f957e?q=80&w=800&auto=format&fit=crop'
        ], 
        desc: 'Padang sabana luas dengan view lima gunung yang menakjubkan.' 
    },
    { 
        id: 'ciremai', name: 'CIREMAI', loc: 'JAWA BARAT', alt: '3078 MDPL', price: 'IDR 750K', 
        images: [
            'https://images.unsplash.com/photo-1582236113885-356a47683935?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1605342129532-6c30f4a8618e?q=80&w=800&auto=format&fit=crop'
        ], 
        desc: 'Atap Jawa Barat dengan tanjakan ikonik "Bapa Tere".' 
    },
    { 
        id: 'gede', name: 'GEDE', loc: 'JAWA BARAT', alt: '2958 MDPL', price: 'IDR 650K', 
        images: [
            'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1578165217121-87a419409848?q=80&w=800&auto=format&fit=crop'
        ], 
        desc: 'Alun-alun Surya Kencana menanti dengan hamparan edelweiss.' 
    }
];

// State untuk melacak slider modal
let currentImgIndex = 0;
let activeTrip = null;

const teamDB = [
    // CORE TEAM (Tampil Lebih Besar)
    { id:'tegar', name: 'Tegar Budi S.', role: 'FOUNDER', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop', bio: 'Visioner Rintis Arah. Mahasiswa UI yang hobi dokumentasi sinematik.', exp: '35+ Peaks', spec: 'Strategy', type: 'core' },
    { id:'siska', name: 'Siska Amelia.', role: 'SECRETARY', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop', bio: 'Manajer administrasi, keuangan, dan perizinan ekspedisi.', exp: '15+ Peaks', spec: 'Admin', type: 'core' },
    { id:'fauzan', name: 'Ahmad Fauzan.', role: 'MEDIA & PUBLIKASI', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop', bio: 'Visual storyteller. Penanggung jawab estetika konten Rintis Arah.', exp: '20+ Peaks', spec: 'Visuals', type: 'core' },
    { id:'jeka', name: 'M. Dzikri Syahid.', role: 'RnD & DESAIN', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop', bio: 'Riset rute pendakian dan desain visual brand Rintis Arah.', exp: '40+ Peaks', spec: 'Research', type: 'core' },

    // OPERATIONAL TEAM (Tampil Lebih Kecil - Slot 5 Orang)
    { id:'ops1', name: 'Abid Asa.', role: 'FIELD OPS', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop', bio: 'Koordinator logistik lapangan.', exp: '25+ Peaks', spec: 'Logistic', type: 'ops' },
    { id:'ops2', name: 'Andi W.', role: 'FIELD OPS', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop', bio: 'Navigator darat utama.', exp: '20+ Peaks', spec: 'Navigation', type: 'ops' },
    { id:'ops3', name: 'Budi S.', role: 'FIELD OPS', img: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=400&auto=format&fit=crop', bio: 'Medis lapangan.', exp: '18+ Peaks', spec: 'First Aid', type: 'ops' },
    { id:'ops4', name: 'Rian K.', role: 'FIELD OPS', img: 'https://images.unsplash.com/photo-1521119989659-a83eee4882bf?q=80&w=400&auto=format&fit=crop', bio: 'Perlengkapan tim.', exp: '15+ Peaks', spec: 'Gear', type: 'ops' },
    { id:'ops5', name: 'Haikal M.', role: 'FIELD OPS', img: 'https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?q=80&w=400&auto=format&fit=crop', bio: 'Komunikasi radio.', exp: '12+ Peaks', spec: 'Comms', type: 'ops' }
];

const eduDB = [
    { title: 'GEAR SELECTION', category: 'PRE-TRIP', img: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=800&auto=format&fit=crop', desc: 'Cara memilih carrier yang ergonomis dan sepatu trekking sesuai medan.' },
    { title: 'HYPOTHERMIA', category: 'SAFETY', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop', desc: 'Mengenali gejala awal hingga penanganan darurat menggunakan thermal blanket.' },
    { title: 'MOUNTAIN ETHICS', category: 'ETHICS', img: 'https://images.unsplash.com/photo-1544919982-b61976f0ba43?q=80&w=800&auto=format&fit=crop', desc: 'Prinsip Leave No Trace dan etika bertegur sapa di jalur pendakian.' },
    { title: 'NAVIGATION BASIC', category: 'SKILLS', img: 'https://images.unsplash.com/photo-1533240332313-0db36245e4a2?q=80&w=800&auto=format&fit=crop', desc: 'Cara membaca tanda alam dan kontur peta untuk menghindari risiko tersesat.' },
    { title: 'FIRST AID KIT', category: 'MEDIC', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop', desc: 'Daftar obat-obatan esensial dan alat medis yang wajib dibawa.' }
];

const quoteDB = [
    { text: "Ciremai bareng Rintis Arah seru bgt! Dokumentasinya juara.", author: "Anaka Irsa", mountain: "MT. CIREMAI", img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop' },
    { text: "Logistik mewah, gak kelaparan di Lawu.", author: "Abid Asa", mountain: "MT. LAWU", img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop' },
    { text: "Safety oke, guide sabar nemenin di Merbabu.", author: "Budi S", mountain: "MT. MERBABU", img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop' },
    { text: "Briefing rapi, aman buat pendaki pemula ke Prau.", author: "Siska Amelia", mountain: "MT. PRAU", img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop' },
    { text: "Safety nomor satu. Tim leader tenang bgt pas cuaca buruk di Slamet.", author: "Andi Wijaya", mountain: "MT. SLAMET", img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop' }
];

// --- CORE FUNCTIONS (LENIS, INTRO) ---
const lenis = new Lenis();
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// Fungsi Start App (Hilangkan Intro)
function startApp() { 
    gsap.to("#intro-layer", { y: "-100%", duration: 1.2, ease: "expo.inOut" }); 
}

// --- RENDERERS ---
function init() {
    // Render Missions
    document.getElementById('grid-container').innerHTML = tripDB.map(t => `
        <div class="card" onclick="openTrip('${t.id}')">
            <div class="media-box"><img src="${t.images[0]}"></div>
            <div class="content-box"><small style="color:var(--accent)">${t.loc}</small><h3>${t.name}</h3></div>
        </div>`).join('');

    // Render Quotes
    document.getElementById('quote-container').innerHTML = quoteDB.map(q => `
        <div class="quote-card content-box">
            <div style="display:flex; align-items:center; gap:15px; margin-bottom:15px;">
                <img src="${q.img}" style="width:50px; height:50px; border-radius:50%; border:2px solid var(--accent); object-fit:cover;">
                <div><small style="font-weight:700;">${q.author}</small><br><span style="color:var(--accent); font-size:0.6rem;">${q.mountain}</span></div>
            </div>
            <p style="font-style:italic; font-size:0.9rem;">"${q.text}"</p>
        </div>`).join('');

    // Render Academy (GAMBAR EDUCATION TIDAK DIHILANGKAN)
    document.getElementById('edu-container').innerHTML = eduDB.map(e => `
        <div class="edu-card">
            <div class="media-box"><span class="edu-tag">${e.category}</span><img src="${e.img}"></div>
            <div class="content-box"><h3>${e.title}</h3><p style="font-size:0.8rem; opacity:0.7;">${e.desc}</p></div>
        </div>`).join('');

    // Render Team (DENGAN PEMBEDA CORE & OPS)
    document.getElementById('team-container').innerHTML = teamDB.map(t => `
        <div class="char-card ${t.type === 'core' ? 'card-large' : 'card-small'}" onclick="openTeam('${t.id}')">
            <img src="${t.img}">
            <div class="char-info"><h3>${t.name}</h3><p style="color:var(--accent); font-size:0.7rem;">${t.role}</p></div>
        </div>`).join('');

    // GSAP Scroll Animations
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".card, .edu-card", {
        scrollTrigger: { trigger: "#archive", start: "top 85%" },
        y: 50, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out"
    });
}

// --- MODAL SYSTEMS ---

// Buka Modal Trip (DENGAN FUNGSI SLIDER)
window.openTrip = (id) => {
    activeTrip = tripDB.find(x => x.id === id);
    currentImgIndex = 0; // Reset ke gambar pertama saat modal dibuka
    updateModalSlider(); // Tampilkan gambar pertama dan counter

    document.getElementById('d-name').innerText = activeTrip.name;
    document.getElementById('d-desc').innerText = activeTrip.desc;
    document.getElementById('d-alt').innerText = activeTrip.alt;
    document.getElementById('d-price').innerText = activeTrip.price;
    
    document.getElementById('detail-scene').style.display = 'block';
    gsap.fromTo("#detail-scene", { opacity: 0 }, { opacity: 1, duration: 0.3 });
};

// --- FUNGSI SLIDER TERINTEGRASI (TIDAK DIHILANGKAN) ---
function updateModalSlider() {
    const imgElement = document.getElementById('d-img');
    const counterElement = document.getElementById('img-counter');
    
    // Animasi ganti gambar halus (fade in/out)
    gsap.to(imgElement, { opacity: 0, duration: 0.2, onComplete: () => {
        imgElement.src = activeTrip.images[currentImgIndex];
        gsap.to(imgElement, { opacity: 1, duration: 0.2 });
    }});

    // Update Counter Teks (misal: 1 / 3)
    counterElement.innerText = `${currentImgIndex + 1} / ${activeTrip.images.length}`;
}

// Fungsi Tombol NEXT (Slider)
window.nextImg = () => {
    if (!activeTrip) return;
    currentImgIndex = (currentImgIndex + 1) % activeTrip.images.length;
    updateModalSlider();
};

// Fungsi Tombol PREV (Slider)
window.prevImg = () => {
    if (!activeTrip) return;
    currentImgIndex = (currentImgIndex - 1 + activeTrip.images.length) % activeTrip.images.length;
    updateModalSlider();
};
// ------------------------------------------

// Buka Modal Team (Dengan Animasi Sliding dari Samping)
window.openTeam = (id) => {
    const t = teamDB.find(x => x.id === id);
    document.getElementById('t-name').innerText = t.name;
    document.getElementById('t-role').innerText = `// ${t.role}`;
    document.getElementById('t-bio').innerText = t.bio;
    document.getElementById('t-exp').innerText = t.exp;
    document.getElementById('t-spec').innerText = t.spec;
    document.getElementById('t-img').src = t.img;
    document.getElementById('team-modal').style.display = 'block';
    gsap.fromTo("#team-modal", { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.3 });
};

// Tutup Modals
window.closeTrip = () => { document.getElementById('detail-scene').style.display = 'none'; };
window.closeTeam = () => { document.getElementById('team-modal').style.display = 'none'; };

// Fungsi Global: Tutup dengan ESC
document.addEventListener('keydown', (e) => { if(e.key === "Escape") { closeTrip(); closeTeam(); } });

// --- INIT APP ---
init();
