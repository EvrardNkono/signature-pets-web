import React, { useState, useRef } from 'react';

/* ─────────────── PALETTE & FONTS ─────────────── */
// Terracotta #C1654A, Gold #C8A84B, Dark #1a1008, Cream #FAF6F0

const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Jost:wght@300;400;500;600&display=swap');

  :root {
    --terra:    #C1654A;
    --terra-dk: #9E4A32;
    --terra-lt: #E8896E;
    --gold:     #C8A84B;
    --gold-lt:  #E8CC7A;
    --dark:     #1a1008;
    --dark2:    #2c1c10;
    --cream:    #FAF6F0;
    --cream2:   #F2EBE0;
    --muted:    #8a7060;
    --white:    #ffffff;
    --danger:   #b94040;
    --success:  #4a8f6a;
    --shadow:   0 8px 40px rgba(26,16,8,0.13);
    --shadow-lg: 0 20px 60px rgba(26,16,8,0.2);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Jost', sans-serif;
    background: var(--cream);
    color: var(--dark);
    min-height: 100vh;
  }

  .dash-root {
    display: flex;
    min-height: 100vh;
    background: var(--cream);
  }

  /* ── SIDEBAR ── */
  .sidebar {
    width: 260px;
    min-height: 100vh;
    background: var(--dark);
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0; left: 0; bottom: 0;
    z-index: 100;
    transition: transform 0.3s ease;
  }
  .sidebar.closed { transform: translateX(-100%); }

  .sidebar-logo {
    padding: 36px 28px 24px;
    border-bottom: 1px solid rgba(200,168,75,0.15);
  }
  .sidebar-logo-title {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 700;
    color: var(--gold);
    letter-spacing: 0.04em;
  }
  .sidebar-logo-sub {
    font-size: 10px;
    color: var(--muted);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-top: 4px;
  }

  .sidebar-nav { flex: 1; padding: 24px 16px; }
  .nav-section-label {
    font-size: 9px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--muted);
    padding: 0 12px;
    margin: 20px 0 8px;
  }
  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 8px;
    cursor: pointer;
    color: rgba(250,246,240,0.6);
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.02em;
    transition: all 0.2s;
    margin-bottom: 2px;
  }
  .nav-item:hover { background: rgba(193,101,74,0.12); color: var(--terra-lt); }
  .nav-item.active { background: linear-gradient(135deg, var(--terra), var(--terra-dk)); color: #fff; box-shadow: 0 4px 20px rgba(193,101,74,0.35); }
  .nav-item .nav-icon { font-size: 16px; width: 20px; text-align: center; }

  .sidebar-footer {
    padding: 20px 28px;
    border-top: 1px solid rgba(200,168,75,0.12);
    font-size: 11px;
    color: var(--muted);
  }

  /* ── MAIN ── */
  .main-area {
    margin-left: 260px;
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  /* ── TOPBAR ── */
  .topbar {
    position: sticky;
    top: 0;
    background: rgba(250,246,240,0.9);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--cream2);
    padding: 0 40px;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 50;
  }
  .topbar-left { display: flex; align-items: center; gap: 16px; }
  .topbar-title {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    color: var(--dark);
  }
  .topbar-badge {
    background: linear-gradient(135deg, var(--terra), var(--terra-dk));
    color: #fff;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.1em;
    padding: 3px 10px;
    border-radius: 20px;
  }
  .topbar-right { display: flex; align-items: center; gap: 16px; }
  .topbar-avatar {
    width: 40px; height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--gold), var(--terra));
    display: flex; align-items: center; justify-content: center;
    color: #fff;
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
  }
  .hamburger {
    display: none;
    background: none; border: none;
    font-size: 22px; cursor: pointer; color: var(--dark);
    padding: 4px;
  }

  /* ── PAGE CONTENT ── */
  .page-content { padding: 40px; flex: 1; }

  /* ── STATS ROW ── */
  .stats-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 40px;
  }
  .stat-card {
    background: var(--white);
    border-radius: 16px;
    padding: 24px 28px;
    box-shadow: var(--shadow);
    border: 1px solid rgba(200,168,75,0.12);
    position: relative;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .stat-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); }
  .stat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--terra), var(--gold));
  }
  .stat-icon {
    font-size: 26px;
    margin-bottom: 10px;
  }
  .stat-value {
    font-family: 'Playfair Display', serif;
    font-size: 36px;
    font-weight: 900;
    color: var(--dark);
    line-height: 1;
  }
  .stat-label {
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--muted);
    margin-top: 6px;
  }

  /* ── TOOLBAR ── */
  .toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28px;
    gap: 16px;
    flex-wrap: wrap;
  }
  .search-box {
    display: flex;
    align-items: center;
    gap: 10px;
    background: var(--white);
    border: 1.5px solid var(--cream2);
    border-radius: 10px;
    padding: 10px 18px;
    flex: 1;
    max-width: 340px;
    transition: border-color 0.2s;
  }
  .search-box:focus-within { border-color: var(--gold); }
  .search-box input {
    border: none; outline: none;
    font-family: 'Jost', sans-serif;
    font-size: 14px;
    background: transparent;
    width: 100%;
    color: var(--dark);
  }
  .filter-tabs {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  .filter-tab {
    padding: 8px 18px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    cursor: pointer;
    border: 1.5px solid var(--cream2);
    background: var(--white);
    color: var(--muted);
    transition: all 0.2s;
  }
  .filter-tab.active {
    background: linear-gradient(135deg, var(--terra), var(--terra-dk));
    border-color: transparent;
    color: #fff;
    box-shadow: 0 4px 16px rgba(193,101,74,0.3);
  }
  .btn-add {
    display: flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(135deg, var(--gold), #b8982e);
    color: var(--dark);
    border: none;
    border-radius: 10px;
    padding: 11px 22px;
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.06em;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(200,168,75,0.4);
    transition: all 0.2s;
    white-space: nowrap;
  }
  .btn-add:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(200,168,75,0.5); }

  /* ── DOG GRID ── */
  .dogs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
  }

  .dog-card {
    background: var(--white);
    border-radius: 18px;
    overflow: hidden;
    box-shadow: var(--shadow);
    border: 1px solid rgba(200,168,75,0.1);
    transition: transform 0.3s, box-shadow 0.3s;
    position: relative;
  }
  .dog-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }

  .dog-img-wrap {
    position: relative;
    height: 220px;
    overflow: hidden;
    background: var(--cream2);
  }
  .dog-img {
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  .dog-card:hover .dog-img { transform: scale(1.06); }

  .dog-status-badge {
    position: absolute;
    top: 14px; left: 14px;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }
  .badge-available { background: rgba(74,143,106,0.9); color: #fff; }
  .badge-reserved  { background: rgba(200,168,75,0.9); color: var(--dark); }
  .badge-sold      { background: rgba(185,64,64,0.85); color: #fff; }

  .dog-actions-overlay {
    position: absolute;
    top: 14px; right: 14px;
    display: flex;
    gap: 8px;
    opacity: 0;
    transform: translateY(-6px);
    transition: all 0.25s;
  }
  .dog-card:hover .dog-actions-overlay { opacity: 1; transform: translateY(0); }
  .action-btn {
    width: 34px; height: 34px;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px;
    cursor: pointer;
    border: none;
    transition: all 0.18s;
  }
  .action-btn-edit { background: rgba(200,168,75,0.92); color: var(--dark); }
  .action-btn-edit:hover { background: var(--gold); transform: scale(1.1); }
  .action-btn-del  { background: rgba(185,64,64,0.88); color: #fff; }
  .action-btn-del:hover  { background: var(--danger); transform: scale(1.1); }

  .dog-info { padding: 20px 22px 22px; }
  .dog-breed {
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--terra);
    font-weight: 600;
    margin-bottom: 4px;
  }
  .dog-name {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 700;
    color: var(--dark);
    margin-bottom: 8px;
  }
  .dog-desc {
    font-size: 12.5px;
    color: var(--muted);
    line-height: 1.6;
    margin-bottom: 14px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .dog-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 14px;
    border-top: 1px solid var(--cream2);
  }
  .dog-meta-item {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 11px;
    color: var(--muted);
    font-weight: 500;
  }
  .dog-price {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 700;
    color: var(--terra);
  }

  /* ── MODAL OVERLAY ── */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(26,16,8,0.55);
    backdrop-filter: blur(6px);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    animation: fadeIn 0.2s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .modal {
    background: var(--white);
    border-radius: 22px;
    width: 100%;
    max-width: 680px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 30px 80px rgba(26,16,8,0.35);
    animation: slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }
  @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

  .modal-header {
    padding: 32px 36px 24px;
    border-bottom: 1px solid var(--cream2);
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    position: sticky;
    top: 0;
    background: var(--white);
    border-radius: 22px 22px 0 0;
    z-index: 2;
  }
  .modal-title {
    font-family: 'Playfair Display', serif;
    font-size: 24px;
    font-weight: 700;
    color: var(--dark);
  }
  .modal-subtitle {
    font-size: 12px;
    color: var(--muted);
    margin-top: 3px;
    letter-spacing: 0.05em;
  }
  .modal-close {
    background: var(--cream2);
    border: none;
    width: 36px; height: 36px;
    border-radius: 10px;
    font-size: 18px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    color: var(--muted);
    transition: all 0.18s;
    flex-shrink: 0;
  }
  .modal-close:hover { background: var(--danger); color: #fff; }

  .modal-body { padding: 28px 36px 36px; }

  /* ── FORM ── */
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  .form-group { display: flex; flex-direction: column; gap: 7px; }
  .form-group.full { grid-column: 1 / -1; }
  .form-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--dark);
  }
  .form-control {
    border: 1.5px solid var(--cream2);
    border-radius: 10px;
    padding: 12px 16px;
    font-family: 'Jost', sans-serif;
    font-size: 14px;
    color: var(--dark);
    background: var(--cream);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    width: 100%;
  }
  .form-control:focus {
    border-color: var(--gold);
    box-shadow: 0 0 0 3px rgba(200,168,75,0.12);
    background: var(--white);
  }
  textarea.form-control { resize: vertical; min-height: 90px; }
  select.form-control { cursor: pointer; }

  /* Image upload area */
  .img-upload-area {
    border: 2px dashed var(--cream2);
    border-radius: 12px;
    padding: 28px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
    background: var(--cream);
    position: relative;
  }
  .img-upload-area:hover { border-color: var(--gold); background: rgba(200,168,75,0.05); }
  .img-upload-area input[type="file"] {
    position: absolute; inset: 0;
    opacity: 0; cursor: pointer; width: 100%; height: 100%;
  }
  .img-preview-row {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 12px;
  }
  .img-preview {
    width: 80px; height: 80px;
    border-radius: 10px;
    object-fit: cover;
    border: 2px solid var(--cream2);
  }

  /* ── FORM FOOTER ── */
  .form-footer {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    margin-top: 28px;
    padding-top: 24px;
    border-top: 1px solid var(--cream2);
  }
  .btn {
    padding: 12px 28px;
    border-radius: 10px;
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.07em;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
  }
  .btn-secondary {
    background: var(--cream2);
    color: var(--muted);
  }
  .btn-secondary:hover { background: #e0d6cc; color: var(--dark); }
  .btn-primary {
    background: linear-gradient(135deg, var(--terra), var(--terra-dk));
    color: #fff;
    box-shadow: 0 4px 20px rgba(193,101,74,0.35);
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(193,101,74,0.45); }
  .btn-danger {
    background: linear-gradient(135deg, #c94040, #9e2828);
    color: #fff;
  }

  /* ── DELETE CONFIRM MODAL ── */
  .delete-modal {
    background: var(--white);
    border-radius: 18px;
    padding: 40px;
    max-width: 420px;
    width: 100%;
    text-align: center;
    box-shadow: 0 30px 80px rgba(26,16,8,0.35);
  }
  .delete-icon { font-size: 48px; margin-bottom: 16px; }
  .delete-title {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    color: var(--dark);
    margin-bottom: 10px;
  }
  .delete-msg { font-size: 14px; color: var(--muted); line-height: 1.6; margin-bottom: 28px; }

  /* ── EMPTY STATE ── */
  .empty-state {
    text-align: center;
    padding: 80px 20px;
    color: var(--muted);
  }
  .empty-icon { font-size: 56px; margin-bottom: 16px; }
  .empty-title {
    font-family: 'Playfair Display', serif;
    font-size: 24px;
    color: var(--dark);
    margin-bottom: 8px;
  }
  .empty-sub { font-size: 14px; margin-bottom: 24px; }

  /* ── TOAST ── */
  .toast {
    position: fixed;
    bottom: 32px; right: 32px;
    background: var(--dark);
    color: #fff;
    padding: 14px 24px;
    border-radius: 12px;
    font-size: 13px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: 0 12px 40px rgba(0,0,0,0.25);
    z-index: 999;
    animation: slideRight 0.3s ease;
  }
  @keyframes slideRight {
    from { transform: translateX(60px); opacity: 0; }
    to   { transform: translateX(0);    opacity: 1; }
  }
  .toast-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--gold); }

  /* ── RESPONSIVE ── */
  @media (max-width: 1100px) {
    .stats-row { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 768px) {
    .sidebar { transform: translateX(-100%); }
    .sidebar.open { transform: translateX(0); }
    .main-area { margin-left: 0; }
    .hamburger { display: flex; }
    .page-content { padding: 24px 16px; }
    .topbar { padding: 0 20px; }
    .stats-row { grid-template-columns: repeat(2, 1fr); gap: 14px; }
    .dogs-grid { grid-template-columns: 1fr; }
    .form-grid { grid-template-columns: 1fr; }
    .modal { border-radius: 18px; }
    .modal-header, .modal-body { padding-left: 22px; padding-right: 22px; }
    .toolbar { flex-direction: column; align-items: stretch; }
    .search-box { max-width: 100%; }
  }
  @media (max-width: 480px) {
    .stats-row { grid-template-columns: 1fr 1fr; }
    .stat-value { font-size: 28px; }
    .topbar-title { font-size: 17px; }
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--cream2); }
  ::-webkit-scrollbar-thumb { background: var(--terra-lt); border-radius: 4px; }
`;

/* ─────────────── INITIAL DATA ─────────────── */
const INITIAL_DOGS = [
  {
    id: 1,
    name: "Duchess",
    breed: "Golden Retriever",
    age: "8 weeks",
    gender: "Female",
    color: "Cream",
    price: 2800,
    status: "Available",
    description: "Duchess is a stunning cream Golden Retriever from champion bloodlines. She is playful, affectionate and raised in a loving home environment with children and cats.",
    pedigree: "AKC Registered",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80",
  },
  {
    id: 2,
    name: "Apollo",
    breed: "French Bulldog",
    age: "10 weeks",
    gender: "Male",
    color: "Brindle",
    price: 4500,
    status: "Reserved",
    description: "Apollo is a compact, muscular French Bulldog with an irresistible brindle coat. Extremely gentle with children. Health-tested parents, microchipped and vaccinated.",
    pedigree: "FCI Registered",
    image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600&q=80",
  },
  {
    id: 3,
    name: "Luna",
    breed: "Cavalier King Charles",
    age: "12 weeks",
    gender: "Female",
    color: "Ruby",
    price: 3200,
    status: "Available",
    description: "Luna carries the elegance of her breed with a ruby coat and soulful dark eyes. Perfect companion for apartment living. Fully health-tested and vet cleared.",
    pedigree: "CKCS Club Registered",
    image: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=600&q=80",
  },
  {
    id: 4,
    name: "Baron",
    breed: "German Shepherd",
    age: "9 weeks",
    gender: "Male",
    color: "Black & Tan",
    price: 2200,
    status: "Sold",
    description: "Baron is a confident, intelligent German Shepherd puppy from working-line parents. Already showing excellent temperament and social behaviour. Health guaranteed.",
    pedigree: "SV Certified",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80",
  },
  {
    id: 5,
    name: "Pearl",
    breed: "Maltese",
    age: "11 weeks",
    gender: "Female",
    color: "White",
    price: 1900,
    status: "Available",
    description: "Pearl is a silky, snow-white Maltese with a gentle and loving character. Non-shedding coat, ideal for allergy sufferers. Raised underfoot with great socialisation.",
    pedigree: "AKC Registered",
    image: "https://images.unsplash.com/photo-1615751072497-5f5169febe17?w=600&q=80",
  },
  {
    id: 6,
    name: "Titan",
    breed: "Rottweiler",
    age: "8 weeks",
    gender: "Male",
    color: "Black & Mahogany",
    price: 2600,
    status: "Available",
    description: "Titan is a powerful, well-built Rottweiler puppy. Calm, loyal and incredibly smart. Both parents are certified health-tested with excellent hip scores.",
    pedigree: "ADRK Registered",
    image: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=600&q=80",
  },
];

const BREEDS = ["Golden Retriever","French Bulldog","Cavalier King Charles","German Shepherd","Maltese","Rottweiler","Labrador Retriever","Poodle","Bulldog","Beagle","Yorkshire Terrier","Shih Tzu","Dachshund","Chihuahua","Border Collie","Other"];
const AGES   = ["4 weeks","6 weeks","8 weeks","9 weeks","10 weeks","11 weeks","12 weeks","4 months","6 months","1 year","2 years","Other"];
const STATUSES = ["Available","Reserved","Sold"];
const GENDERS  = ["Male","Female"];

const EMPTY_DOG = { name:"", breed:"Golden Retriever", age:"8 weeks", gender:"Male", color:"", price:"", status:"Available", description:"", pedigree:"", image:"" };

/* ─────────────── COMPONENT ─────────────── */
export default function SignaturePetsDashboard() {
  const [dogs,       setDogs]       = useState(INITIAL_DOGS);
  const [search,     setSearch]     = useState("");
  const [filter,     setFilter]     = useState("All");
  const [modal,      setModal]      = useState(null);   // null | "add" | "edit" | "delete"
  const [current,    setCurrent]    = useState(EMPTY_DOG);
  const [deleteId,   setDeleteId]   = useState(null);
  const [toast,      setToast]      = useState(null);
  const [sideOpen,   setSideOpen]   = useState(false);
  const [activeNav,  setActiveNav]  = useState("listings");
  const nextId = useRef(INITIAL_DOGS.length + 1);

  /* ── Helpers ── */
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const openAdd = () => {
    setCurrent({ ...EMPTY_DOG });
    setModal("add");
  };

  const openEdit = (dog) => {
    setCurrent({ ...dog });
    setModal("edit");
  };

  const openDelete = (id) => {
    setDeleteId(id);
    setModal("delete");
  };

  const closeModal = () => {
    setModal(null);
    setDeleteId(null);
  };

  const handleSave = () => {
    if (!current.name.trim() || !current.price) return;
    if (modal === "add") {
      setDogs(d => [...d, { ...current, id: nextId.current++, price: Number(current.price) }]);
      showToast("✓ Listing added successfully");
    } else {
      setDogs(d => d.map(x => x.id === current.id ? { ...current, price: Number(current.price) } : x));
      showToast("✓ Listing updated successfully");
    }
    closeModal();
  };

  const handleDelete = () => {
    setDogs(d => d.filter(x => x.id !== deleteId));
    showToast("Listing removed");
    closeModal();
  };

  const handleImageUrl = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setCurrent(c => ({ ...c, image: ev.target.result }));
    reader.readAsDataURL(file);
  };

  /* ── Filtered list ── */
  const filtered = dogs.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
                        d.breed.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || d.status === filter;
    return matchSearch && matchFilter;
  });

  const stats = {
    total: dogs.length,
    available: dogs.filter(d => d.status === "Available").length,
    reserved:  dogs.filter(d => d.status === "Reserved").length,
    sold:      dogs.filter(d => d.status === "Sold").length,
  };

  /* ── Render ── */
  return (
    <>
      <style>{STYLE}</style>
      <div className="dash-root">

        {/* SIDEBAR OVERLAY (mobile) */}
        {sideOpen && (
          <div
            onClick={() => setSideOpen(false)}
            style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.4)', zIndex:99 }}
          />
        )}

        {/* ── SIDEBAR ── */}
        <aside className={`sidebar ${sideOpen ? 'open' : ''}`}>
          <div className="sidebar-logo">
            <div style={{ fontSize:22, marginBottom:6 }}>🐾</div>
            <div className="sidebar-logo-title">Signature Pets</div>
            <div className="sidebar-logo-sub">Breeder Dashboard</div>
          </div>
          <nav className="sidebar-nav">
            <div className="nav-section-label">Main</div>
            {[
              { key:"listings", icon:"🐶", label:"Dog Listings" },
              { key:"inquiries", icon:"📩", label:"Inquiries" },
              { key:"appointments", icon:"📅", label:"Appointments" },
            ].map(item => (
              <div
                key={item.key}
                className={`nav-item ${activeNav === item.key ? 'active' : ''}`}
                onClick={() => { setActiveNav(item.key); setSideOpen(false); }}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </div>
            ))}
            <div className="nav-section-label">Settings</div>
            {[
              { key:"profile", icon:"👤", label:"Profile" },
              { key:"branding", icon:"🎨", label:"Branding" },
              { key:"payments", icon:"💳", label:"Payments" },
            ].map(item => (
              <div
                key={item.key}
                className={`nav-item ${activeNav === item.key ? 'active' : ''}`}
                onClick={() => { setActiveNav(item.key); setSideOpen(false); }}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </nav>
          <div className="sidebar-footer">
            © 2026 Signature Pets<br />All rights reserved
          </div>
        </aside>

        {/* ── MAIN ── */}
        <div className="main-area">

          {/* TOPBAR */}
          <header className="topbar">
            <div className="topbar-left">
              <button className="hamburger" onClick={() => setSideOpen(s => !s)}>☰</button>
              <div className="topbar-title">Dog Listings</div>
              <span className="topbar-badge">{stats.available} Available</span>
            </div>
            <div className="topbar-right">
              <div style={{ fontSize:12, color:'var(--muted)' }}>Welcome back,</div>
              <div className="topbar-avatar">S</div>
            </div>
          </header>

          {/* CONTENT */}
          <main className="page-content">

            {/* STATS */}
            <div className="stats-row">
              {[
                { icon:"🐾", val: stats.total,     label:"Total Listings",   color:"var(--terra)" },
                { icon:"✅", val: stats.available, label:"Available",        color:"var(--success)" },
                { icon:"🔖", val: stats.reserved,  label:"Reserved",         color:"var(--gold)" },
                { icon:"🏠", val: stats.sold,       label:"Placed in Homes",  color:"var(--muted)" },
              ].map((s, i) => (
                <div className="stat-card" key={i}>
                  <div className="stat-icon">{s.icon}</div>
                  <div className="stat-value" style={{ color: s.color }}>{s.val}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            {/* TOOLBAR */}
            <div className="toolbar">
              <div className="search-box">
                <span style={{ fontSize:16, color:'var(--muted)' }}>🔍</span>
                <input
                  placeholder="Search by name or breed…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <div className="filter-tabs">
                {["All","Available","Reserved","Sold"].map(f => (
                  <button
                    key={f}
                    className={`filter-tab ${filter === f ? 'active' : ''}`}
                    onClick={() => setFilter(f)}
                  >{f}</button>
                ))}
              </div>
              <button className="btn-add" onClick={openAdd}>
                <span style={{ fontSize:18 }}>＋</span> Add Listing
              </button>
            </div>

            {/* GRID */}
            {filtered.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🐶</div>
                <div className="empty-title">No listings found</div>
                <div className="empty-sub">Try adjusting your search or filters.</div>
                <button className="btn btn-primary" onClick={openAdd}>Add your first listing</button>
              </div>
            ) : (
              <div className="dogs-grid">
                {filtered.map(dog => (
                  <div className="dog-card" key={dog.id}>
                    <div className="dog-img-wrap">
                      {dog.image
                        ? <img className="dog-img" src={dog.image} alt={dog.name} />
                        : <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:48 }}>🐾</div>
                      }
                      <span className={`dog-status-badge badge-${dog.status.toLowerCase()}`}>{dog.status}</span>
                      <div className="dog-actions-overlay">
                        <button className="action-btn action-btn-edit" onClick={() => openEdit(dog)} title="Edit">✏️</button>
                        <button className="action-btn action-btn-del"  onClick={() => openDelete(dog.id)} title="Delete">🗑️</button>
                      </div>
                    </div>
                    <div className="dog-info">
                      <div className="dog-breed">{dog.breed}</div>
                      <div className="dog-name">{dog.name}</div>
                      <div className="dog-desc">{dog.description}</div>
                      <div className="dog-meta">
                        <div style={{ display:'flex', gap:14 }}>
                          <div className="dog-meta-item">🎂 {dog.age}</div>
                          <div className="dog-meta-item">{dog.gender === "Female" ? "♀" : "♂"} {dog.gender}</div>
                          {dog.color && <div className="dog-meta-item">🎨 {dog.color}</div>}
                        </div>
                        <div className="dog-price">${dog.price.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>

        {/* ── ADD / EDIT MODAL ── */}
        {(modal === "add" || modal === "edit") && (
          <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) closeModal(); }}>
            <div className="modal">
              <div className="modal-header">
                <div>
                  <div className="modal-title">{modal === "add" ? "Add New Listing" : `Edit — ${current.name}`}</div>
                  <div className="modal-subtitle">{modal === "add" ? "Fill in the details to publish a new puppy listing." : "Update the listing information below."}</div>
                </div>
                <button className="modal-close" onClick={closeModal}>✕</button>
              </div>
              <div className="modal-body">
                <div className="form-grid">

                  {/* Name */}
                  <div className="form-group">
                    <label className="form-label">Name *</label>
                    <input className="form-control" placeholder="e.g. Duchess" value={current.name}
                      onChange={e => setCurrent(c => ({ ...c, name: e.target.value }))} />
                  </div>

                  {/* Breed */}
                  <div className="form-group">
                    <label className="form-label">Breed *</label>
                    <select className="form-control" value={current.breed}
                      onChange={e => setCurrent(c => ({ ...c, breed: e.target.value }))}>
                      {BREEDS.map(b => <option key={b}>{b}</option>)}
                    </select>
                  </div>

                  {/* Age */}
                  <div className="form-group">
                    <label className="form-label">Age</label>
                    <select className="form-control" value={current.age}
                      onChange={e => setCurrent(c => ({ ...c, age: e.target.value }))}>
                      {AGES.map(a => <option key={a}>{a}</option>)}
                    </select>
                  </div>

                  {/* Gender */}
                  <div className="form-group">
                    <label className="form-label">Gender</label>
                    <select className="form-control" value={current.gender}
                      onChange={e => setCurrent(c => ({ ...c, gender: e.target.value }))}>
                      {GENDERS.map(g => <option key={g}>{g}</option>)}
                    </select>
                  </div>

                  {/* Color */}
                  <div className="form-group">
                    <label className="form-label">Color / Coat</label>
                    <input className="form-control" placeholder="e.g. Cream, Brindle…" value={current.color}
                      onChange={e => setCurrent(c => ({ ...c, color: e.target.value }))} />
                  </div>

                  {/* Price */}
                  <div className="form-group">
                    <label className="form-label">Price (USD) *</label>
                    <input className="form-control" type="number" min="0" placeholder="e.g. 2800" value={current.price}
                      onChange={e => setCurrent(c => ({ ...c, price: e.target.value }))} />
                  </div>

                  {/* Status */}
                  <div className="form-group">
                    <label className="form-label">Status</label>
                    <select className="form-control" value={current.status}
                      onChange={e => setCurrent(c => ({ ...c, status: e.target.value }))}>
                      {STATUSES.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>

                  {/* Pedigree */}
                  <div className="form-group">
                    <label className="form-label">Pedigree / Registration</label>
                    <input className="form-control" placeholder="e.g. AKC Registered" value={current.pedigree}
                      onChange={e => setCurrent(c => ({ ...c, pedigree: e.target.value }))} />
                  </div>

                  {/* Description */}
                  <div className="form-group full">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" placeholder="Describe the puppy's temperament, health, environment…" value={current.description}
                      onChange={e => setCurrent(c => ({ ...c, description: e.target.value }))} />
                  </div>

                  {/* Image */}
                  <div className="form-group full">
                    <label className="form-label">Photo</label>
                    <div className="img-upload-area">
                      <input type="file" accept="image/*" onChange={handleImageUrl} />
                      <div style={{ fontSize:28, marginBottom:8 }}>📷</div>
                      <div style={{ fontSize:13, color:'var(--muted)', fontWeight:500 }}>Click or drag an image here</div>
                      <div style={{ fontSize:11, color:'var(--muted)', marginTop:4 }}>JPG, PNG, WEBP — max 5MB</div>
                    </div>

                    {/* OR manual URL */}
                    <div style={{ display:'flex', alignItems:'center', gap:10, margin:'12px 0 4px' }}>
                      <div style={{ flex:1, height:1, background:'var(--cream2)' }} />
                      <span style={{ fontSize:11, color:'var(--muted)', fontWeight:600 }}>OR paste image URL</span>
                      <div style={{ flex:1, height:1, background:'var(--cream2)' }} />
                    </div>
                    <input className="form-control" placeholder="https://…" value={current.image}
                      onChange={e => setCurrent(c => ({ ...c, image: e.target.value }))} />

                    {current.image && (
                      <div className="img-preview-row">
                        <img className="img-preview" src={current.image} alt="preview" onError={e => e.target.style.display='none'} />
                      </div>
                    )}
                  </div>

                </div>

                <div className="form-footer">
                  <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                  <button
                    className="btn btn-primary"
                    onClick={handleSave}
                    disabled={!current.name.trim() || !current.price}
                    style={{ opacity: (!current.name.trim() || !current.price) ? 0.5 : 1 }}
                  >
                    {modal === "add" ? "✦ Publish Listing" : "✦ Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── DELETE CONFIRM ── */}
        {modal === "delete" && (
          <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) closeModal(); }}>
            <div className="delete-modal">
              <div className="delete-icon">🗑️</div>
              <div className="delete-title">Remove this listing?</div>
              <div className="delete-msg">
                This action cannot be undone. The listing for <strong>{dogs.find(d => d.id === deleteId)?.name}</strong> will be permanently removed.
              </div>
              <div style={{ display:'flex', gap:12, justifyContent:'center' }}>
                <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                <button className="btn btn-danger" onClick={handleDelete}>Yes, Remove</button>
              </div>
            </div>
          </div>
        )}

        {/* ── TOAST ── */}
        {toast && (
          <div className="toast">
            <div className="toast-dot" />
            {toast}
          </div>
        )}

      </div>
    </>
  );
}