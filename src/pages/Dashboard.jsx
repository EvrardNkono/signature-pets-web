import React, { useState, useEffect } from 'react';
import AdminChat from './AdminChat'; 

// --- INTELLIGENT URL LOGIC ---
const getBaseUrl = () => {
  const isLocal = window.location.hostname === 'localhost';
  return isLocal 
    ? 'http://localhost:5000/api/v1' 
    : 'https://backpets.vercel.app/api/v1';
};

const API_BASE = getBaseUrl();
const API_PUPPIES = `${API_BASE}/puppies`;
const API_BREEDS = `${API_BASE}/breeds`;

const STATUSES = ["Available", "Reserved", "Sold"];
const GENDERS = ["Male", "Female"];

const EMPTY_DOG = { 
  name: "", 
  breed: "", 
  age: "8 weeks", 
  gender: "Male", 
  color: "", 
  price: "", 
  status: "Available", 
  description: "", 
  pedigree: "", 
  mainImage: null,
  mainImageFile: null,
  galleryImages: [],
  galleryFiles: []
};

const EMPTY_BREED = {
  title: "", 
  description: "", 
  origin: "", 
  temperament: "", 
  coatCare: "Premium Grooming", 
  image: null, 
  imageFile: null
};

export default function SignaturePetsDashboard() {
  const [dogs, setDogs] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [view, setView] = useState("dogs");
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); 
  const [current, setCurrent] = useState(EMPTY_DOG);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // --- LOADING STATES ---
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAddingGallery, setIsAddingGallery] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  
  // Separate preview states
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resDogs, resBreeds] = await Promise.all([
        fetch(API_PUPPIES),
        fetch(API_BREEDS)
      ]);
      const dogsData = await resDogs.json();
      const breedsData = await resBreeds.json();
      
      if (dogsData.success) setDogs(dogsData.data);
      if (breedsData.success) setBreeds(breedsData.data);
    } catch (err) {
      showToast("❌ Server Error");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setMainImagePreview(previewUrl);
      setCurrent(prev => ({
        ...prev,
        mainImageFile: file
      }));
    }
  };

  const handleGalleryFilesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const previews = files.map(file => URL.createObjectURL(file));
      setGalleryPreviews(prev => [...prev, ...previews]);
      
      setCurrent(prev => ({
        ...prev,
        galleryFiles: [...(prev.galleryFiles || []), ...files]
      }));
    }
  };

  const removeGalleryPreview = (indexToRemove) => {
    URL.revokeObjectURL(galleryPreviews[indexToRemove]);
    setGalleryPreviews(prev => prev.filter((_, idx) => idx !== indexToRemove));
    setCurrent(prev => ({
      ...prev,
      galleryFiles: prev.galleryFiles.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  const removeExistingGalleryImage = (imageUrlToRemove) => {
    setCurrent(prev => ({
      ...prev,
      galleryImages: prev.galleryImages.filter(img => img !== imageUrlToRemove)
    }));
  };

  const handleSave = async () => {
  setIsSaving(true);
  const isPuppy = view === "dogs";
  const formData = new FormData();
  
  if (isPuppy) {
    // ⚠️ IMPORTANT: N'utilisez que 'images' comme nom de champ (pas 'mainImage' ou 'galleryImages')
    
    // Ajouter l'image principale en premier
    if (current.mainImageFile) {
      formData.append('images', current.mainImageFile);
    }
    
    // Ajouter les images de la galerie (même nom de champ 'images')
    if (current.galleryFiles && current.galleryFiles.length > 0) {
      current.galleryFiles.forEach(file => {
        formData.append('images', file);
      });
    }
    
    // IMPORTANT: Envoyer les images existantes comme un champ texte
    // Combiner l'image principale et les images de galerie existantes
    const allExistingImages = [];
    if (current.mainImage) allExistingImages.push(current.mainImage);
    if (current.galleryImages && current.galleryImages.length > 0) {
      allExistingImages.push(...current.galleryImages);
    }
    
    if (allExistingImages.length > 0) {
      formData.append('existingImages', JSON.stringify(allExistingImages));
    }
    
    // Ajouter tous les autres champs
    Object.keys(current).forEach(key => {
      // Exclure tous les champs liés aux images et les champs système
      const excludedKeys = [
        'mainImageFile', 'galleryFiles', 'galleryImages', 'mainImage', 
        'images', '_id', 'createdAt', 'updatedAt', '__v'
      ];
      if (!excludedKeys.includes(key)) {
        if (current[key] !== null && current[key] !== undefined) {
          formData.append(key, current[key]);
        }
      }
    });
  } else {
    // Breeds: une seule image
    if (current.imageFile) {
      formData.append('heroImage', current.imageFile);
    }
    Object.keys(current).forEach(key => {
      if (!['imageFile', 'image', '_id', 'createdAt', 'updatedAt', '__v', 'heroImage'].includes(key)) {
        if (current[key] !== null && current[key] !== undefined) {
          formData.append(key, current[key]);
        }
      }
    });
  }

  const urlBase = isPuppy ? API_PUPPIES : API_BREEDS;
  const method = current._id ? 'PUT' : 'POST';
  const url = current._id ? `${urlBase}/${current._id}` : urlBase;
  
  try {
    const res = await fetch(url, { method, body: formData });
    const result = await res.json();

    if (res.ok && result.success) {
      showToast(current._id ? "✓ Updated Successfully" : "✓ Created Successfully");
      await fetchData();
      setModal(null);
      resetForm();
    } else {
      showToast(`❌ ${result.error || "Save Error"}`);
    }
  } catch (err) {
    console.error('Save error:', err);
    showToast("❌ Failed to connect to server");
  } finally {
    setIsSaving(false);
  }
};

  const handleAddGalleryImages = async () => {
    if (!current._id || !current.galleryFiles || current.galleryFiles.length === 0) {
      showToast("❌ No images to add");
      return;
    }

    setIsAddingGallery(true);
    const formData = new FormData();
    current.galleryFiles.forEach(file => {
      formData.append('images', file);
    });

    try {
      const res = await fetch(`${API_PUPPIES}/${current._id}/images/add`, {
        method: 'POST',
        body: formData
      });
      const result = await res.json();

      if (res.ok && result.success) {
        showToast(`✓ ${result.addedImages.length} image(s) added to gallery!`);
        await fetchData();
        setModal(null);
        resetForm();
      } else {
        showToast(`❌ ${result.error || "Add failed"}`);
      }
    } catch (err) {
      showToast("❌ Failed to connect to server");
    } finally {
      setIsAddingGallery(false);
    }
  };

  const resetForm = () => {
    setCurrent(EMPTY_DOG);
    setMainImagePreview(null);
    setGalleryPreviews([]);
    galleryPreviews.forEach(preview => URL.revokeObjectURL(preview));
    if (mainImagePreview) URL.revokeObjectURL(mainImagePreview);
  };

  const openFormModal = (item = null) => {
    if (view === "dogs") {
      if (item) {
        setCurrent({ 
          ...item, 
          mainImageFile: null, 
          galleryFiles: [],
          mainImage: item.images?.[0] || null,
          galleryImages: item.images?.slice(1) || []
        });
        setMainImagePreview(item.images?.[0] || null);
        setGalleryPreviews([]);
      } else {
        setCurrent(EMPTY_DOG);
        setMainImagePreview(null);
        setGalleryPreviews([]);
      }
    } else {
      setCurrent(item || EMPTY_BREED);
    }
    setModal("form");
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    const urlBase = view === "dogs" ? API_PUPPIES : API_BREEDS;
    try {
      const res = await fetch(`${urlBase}/${deleteTarget}`, { method: 'DELETE' });
      if (res.ok) {
        showToast("🗑️ Deleted");
        await fetchData();
        setModal(null);
      }
    } catch (err) {
      showToast("❌ Deletion Error");
    } finally {
      setIsDeleting(false);
    }
  };

  // Composant Loader
  const Loader = ({ size = "md", text = "" }) => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-8 h-8",
      lg: "w-12 h-12"
    };
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <div className={`${sizeClasses[size]} border-2 border-brand-gold border-t-transparent rounded-full animate-spin`}></div>
        {text && <p className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold">{text}</p>}
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#FAF6F0] font-['Jost'] text-[#1a1008] overflow-hidden">
      
      {/* MOBILE NAV BAR */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#1a1008] text-white z-[60]">
        <h1 className="font-['Playfair_Display'] text-lg font-bold text-[#C8A84B]">Signature Pets</h1>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-2xl focus:outline-none">
          {isSidebarOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#1a1008] flex flex-col shadow-2xl transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-8 border-b border-white/5 hidden md:block">
          <h1 className="font-['Playfair_Display'] text-xl font-bold text-[#C8A84B] tracking-wider">Signature Pets</h1>
          <p className="text-[10px] text-[#8a7060] uppercase tracking-[0.2em] mt-1">Admin Panel v2.0</p>
        </div>

        <nav className="flex-1 p-6 space-y-3 mt-16 md:mt-0">
          <div className="text-[10px] uppercase tracking-[0.2em] text-[#8a7060] mb-4 font-bold">Management</div>
          
          <button onClick={() => { setView("dogs"); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all ${view === "dogs" ? 'bg-gradient-to-r from-[#C1654A] to-[#9E4A32] text-white shadow-lg' : 'text-[#8a7060] hover:bg-white/5'}`}>
            <span>🐾</span> My Puppies
          </button>
          
          <button onClick={() => { setView("breeds"); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all ${view === "breeds" ? 'bg-gradient-to-r from-[#C1654A] to-[#9E4A32] text-white shadow-lg' : 'text-[#8a7060] hover:bg-white/5'}`}>
            <span>📚</span> Breeds Library
          </button>

          <div className="pt-4 mt-4 border-t border-white/5">
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#8a7060] mb-4 font-bold">Communication</div>
            <button onClick={() => { setView("chat"); setIsSidebarOpen(false); }} className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-bold transition-all ${view === "chat" ? 'bg-[#C8A84B] text-[#1a1008] shadow-lg' : 'text-[#8a7060] hover:bg-white/5'}`}>
              <div className="flex items-center gap-4">
                <span>💬</span> Live Concierge
              </div>
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            </button>
          </div>
        </nav>
      </aside>

      {/* MAIN VIEW */}
      <main className="flex-1 overflow-y-auto relative bg-[#FAF6F0]">
        {view === "chat" ? (
          <AdminChat />
        ) : (
          <>
            <header className="px-6 py-6 md:h-24 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between sticky top-0 bg-[#FAF6F0]/80 backdrop-blur-xl z-40 border-b border-[#F2EBE0] gap-4">
              <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl font-black capitalize">
                {view === "dogs" ? "Puppy Inventory" : "Breed Library"}
              </h2>
              <button 
                onClick={() => openFormModal()}
                className="w-full md:w-auto bg-[#1a1008] text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-xl hover:scale-105 transition-all"
              >
                ＋ Add {view === "dogs" ? "Puppy" : "Breed"}
              </button>
            </header>

            <div className="p-6 md:p-10">
              {loading ? (
                <div className="flex justify-center py-20">
                  <Loader size="lg" text="Loading..." />
                </div>
              ) : view === "dogs" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                  {dogs.map(dog => (
                    <div key={dog._id} className="bg-white rounded-[32px] p-4 shadow-sm border border-[#F2EBE0] group">
                      <div className="h-48 md:h-56 rounded-[24px] overflow-hidden relative">
                        <img src={dog.images?.[0] || 'https://via.placeholder.com/400'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                        <div className="absolute top-4 right-4 flex gap-2 md:opacity-0 md:group-hover:opacity-100 transition-all">
                           <button onClick={() => openFormModal(dog)} className="p-2 bg-white rounded-xl shadow-lg hover:text-[#C1654A] text-lg">✏️</button>
                           <button onClick={() => { setDeleteTarget(dog._id); setModal("delete"); }} className="p-2 bg-white rounded-xl shadow-lg hover:text-red-500 text-lg">🗑️</button>
                        </div>
                        {dog.images && dog.images.length > 1 && (
                          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg">
                            <span className="text-white text-[9px] font-bold">🎨 Gallery: {dog.images.length - 1} photos</span>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-[10px] font-black uppercase text-[#C1654A] tracking-tighter">{dog.breed}</div>
                            <h3 className="text-xl font-bold mt-1">{dog.name}</h3>
                            <p className="text-xs text-[#8a7060] font-bold">{dog.age}</p>
                          </div>
                          <span className="text-lg font-black text-[#1a1008]">${dog.price}</span>
                        </div>
                        <div className="mt-4 pt-4 border-t border-dashed flex justify-between items-center">
                          <span className="text-[10px] text-[#8a7060] uppercase font-bold tracking-widest">{dog.color || "No Color"}</span>
                          <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase ${dog.status === 'Available' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                            {dog.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-[24px] md:rounded-[32px] overflow-hidden border border-[#F2EBE0]">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[500px]">
                      <thead className="bg-[#FAF6F0] text-[10px] uppercase font-black text-[#8a7060]">
                        <tr>
                          <th className="p-6">Visual</th>
                          <th className="p-6">Breed</th>
                          <th className="p-6">Origin</th>
                          <th className="p-6 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F2EBE0]">
                        {breeds.map(b => (
                          <tr key={b._id} className="hover:bg-[#FAF6F0]/50 transition-colors">
                            <td className="p-6"><img src={b.heroImage} className="w-12 h-12 rounded-xl object-cover" alt="" /></td>
                            <td className="p-6 font-bold">{b.title}</td>
                            <td className="p-6 text-sm text-[#8a7060]">{b.origin}</td>
                            <td className="p-6 text-right space-x-4">
                              <button onClick={() => openFormModal(b)} className="text-[#C1654A] font-bold text-xs uppercase tracking-widest">Edit</button>
                              <button onClick={() => { setDeleteTarget(b._id); setModal("delete"); }} className="text-red-500 font-bold text-xs uppercase tracking-widest">Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {/* FORM MODAL */}
      {modal === "form" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1a1008]/60 backdrop-blur-md overflow-y-auto">
          <div className="bg-white w-full max-w-4xl rounded-[30px] md:rounded-[40px] shadow-2xl p-6 md:p-10 my-auto">
            <h2 className="text-2xl md:text-3xl font-['Playfair_Display'] font-black mb-6 md:mb-8">
                {current._id ? "Edit" : "Add"} {view === "dogs" ? "Puppy" : "Breed"}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-h-[60vh] overflow-y-auto px-2">
              {view === "dogs" ? (
                <>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase text-[#8a7060]">Name *</label>
                    <input className="p-4 bg-[#FAF6F0] rounded-2xl outline-none border border-transparent focus:border-[#C1654A]" value={current.name} onChange={e => setCurrent({...current, name: e.target.value})} placeholder="e.g. Bella" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase text-[#8a7060]">Breed *</label>
                    <select className="p-4 bg-[#FAF6F0] rounded-2xl outline-none" value={current.breed} onChange={e => setCurrent({...current, breed: e.target.value})}>
                      <option value="">Select a breed...</option>
                      {breeds.map(b => <option key={b._id} value={b.title}>{b.title}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase text-[#8a7060]">Age</label>
                    <input className="p-4 bg-[#FAF6F0] rounded-2xl outline-none" value={current.age} onChange={e => setCurrent({...current, age: e.target.value})} placeholder="e.g. 8 weeks" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase text-[#8a7060]">Gender</label>
                    <select className="p-4 bg-[#FAF6F0] rounded-2xl outline-none" value={current.gender} onChange={e => setCurrent({...current, gender: e.target.value})}>
                      {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase text-[#8a7060]">Color</label>
                    <input className="p-4 bg-[#FAF6F0] rounded-2xl outline-none" value={current.color} onChange={e => setCurrent({...current, color: e.target.value})} placeholder="e.g. Fawn" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase text-[#8a7060]">Price ($) *</label>
                    <input type="number" className="p-4 bg-[#FAF6F0] rounded-2xl outline-none" value={current.price} onChange={e => setCurrent({...current, price: e.target.value})} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase text-[#8a7060]">Status</label>
                    <select className="p-4 bg-[#FAF6F0] rounded-2xl outline-none" value={current.status} onChange={e => setCurrent({...current, status: e.target.value})}>
                      {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase text-[#8a7060]">Pedigree</label>
                    <input className="p-4 bg-[#FAF6F0] rounded-2xl outline-none" value={current.pedigree} onChange={e => setCurrent({...current, pedigree: e.target.value})} placeholder="e.g. AKC Certified" />
                  </div>
                  
                  {/* MAIN IMAGE SECTION */}
                  <div className="md:col-span-2 flex flex-col gap-3 p-4 bg-[#FAF6F0] rounded-2xl border-2 border-[#C8A84B]/20">
                    <label className="text-[12px] font-black uppercase text-[#C1654A] flex items-center gap-2">
                      ⭐ MAIN IMAGE (Hero / Cover)
                      <span className="text-[8px] text-[#8a7060] font-normal">- Displayed on homepage cards</span>
                    </label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleMainImageChange}
                      className="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#C1654A] file:text-white cursor-pointer"
                    />
                    {(mainImagePreview || current.mainImage) && (
                      <div className="mt-2">
                        <p className="text-[9px] text-[#8a7060] mb-2">Current Main Image:</p>
                        <img 
                          src={mainImagePreview || current.mainImage} 
                          className="w-32 h-32 object-cover rounded-xl border-2 border-[#C1654A] shadow-md" 
                          alt="Main"
                        />
                      </div>
                    )}
                  </div>

                  {/* GALLERY SECTION */}
                  <div className="md:col-span-2 flex flex-col gap-3 p-4 bg-[#FAF6F0] rounded-2xl border-2 border-dashed border-[#C8A84B]/40">
                    <label className="text-[12px] font-black uppercase text-[#C8A84B] flex items-center gap-2">
                      🎨 GALLERY (Carousel Images)
                      <span className="text-[8px] text-[#8a7060] font-normal">- For the photo carousel</span>
                    </label>
                    <input 
                      type="file" 
                      multiple 
                      accept="image/*"
                      onChange={handleGalleryFilesChange}
                      className="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#C8A84B] file:text-[#1a1008] cursor-pointer"
                    />
                    
                    {galleryPreviews.length > 0 && (
                      <div className="mt-3">
                        <p className="text-[9px] text-[#8a7060] mb-2">🆕 New gallery images ({galleryPreviews.length}):</p>
                        <div className="grid grid-cols-4 gap-2">
                          {galleryPreviews.map((preview, idx) => (
                            <div key={`new-${idx}`} className="relative group">
                              <img 
                                src={preview} 
                                alt={`Gallery ${idx + 1}`} 
                                className="w-full h-20 object-cover rounded-lg border-2 border-[#C8A84B]"
                              />
                              <button
                                onClick={() => removeGalleryPreview(idx)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] hover:scale-110 transition"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {current.galleryImages && current.galleryImages.length > 0 && (
                      <div className="mt-3">
                        <p className="text-[9px] text-[#8a7060] mb-2">📸 Current gallery ({current.galleryImages.length} images):</p>
                        <div className="grid grid-cols-4 gap-2">
                          {current.galleryImages.map((img, idx) => (
                            <div key={`existing-${idx}`} className="relative group">
                              <img 
                                src={img} 
                                alt={`Gallery ${idx + 1}`} 
                                className="w-full h-20 object-cover rounded-lg border border-gray-300"
                              />
                              <button
                                onClick={() => removeExistingGalleryImage(img)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] hover:scale-110 transition"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <p className="text-[8px] text-[#8a7060] italic mt-2">
                      💡 Tip: Gallery images will appear in the carousel when viewing puppy details (max 10 images)
                    </p>
                  </div>
                  
                  <div className="md:col-span-2 flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase text-[#8a7060]">Description & Details</label>
                    <textarea rows="3" className="p-4 bg-[#FAF6F0] rounded-2xl outline-none border border-transparent focus:border-[#C1654A]" value={current.description} onChange={e => setCurrent({...current, description: e.target.value})} placeholder="Write details here..."></textarea>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-[10px] font-black uppercase text-[#8a7060]">Breed Name</label>
                    <input className="p-4 bg-[#FAF6F0] rounded-2xl outline-none" value={current.title} onChange={e => setCurrent({...current, title: e.target.value})} placeholder="e.g. Cavapoo" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase text-[#8a7060]">Origin</label>
                    <input className="p-4 bg-[#FAF6F0] rounded-2xl outline-none" value={current.origin} onChange={e => setCurrent({...current, origin: e.target.value})} placeholder="e.g. France" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase text-[#8a7060]">Temperament</label>
                    <input className="p-4 bg-[#FAF6F0] rounded-2xl outline-none" value={current.temperament} onChange={e => setCurrent({...current, temperament: e.target.value})} placeholder="e.g. Playful" />
                  </div>
                  <div className="md:col-span-2 flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase text-[#8a7060]">Media (Hero Image)</label>
                    <input type="file" onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setCurrent(prev => ({
                          ...prev,
                          heroImage: URL.createObjectURL(file),
                          imageFile: file
                        }));
                      }
                    }} className="text-xs cursor-pointer" />
                    {(current.heroImage || current.image) && (
                      <img src={current.heroImage || current.image} className="h-24 w-24 object-cover rounded-2xl mt-2 shadow-md" alt="Preview" />
                    )}
                  </div>
                  <div className="md:col-span-2 flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase text-[#8a7060]">Description</label>
                    <textarea rows="3" className="p-4 bg-[#FAF6F0] rounded-2xl outline-none" value={current.description} onChange={e => setCurrent({...current, description: e.target.value})}></textarea>
                  </div>
                </>
              )}
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <div className="flex flex-col-reverse md:flex-row justify-end gap-4">
                <button 
                  onClick={() => {
                    setModal(null);
                    resetForm();
                  }} 
                  disabled={isSaving || isAddingGallery}
                  className="px-8 py-4 font-bold text-[#8a7060] disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave} 
                  disabled={isSaving}
                  className="px-10 py-4 bg-[#C1654A] text-white font-bold rounded-2xl shadow-xl hover:bg-[#9E4A32] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>{current._id ? "Update" : "Create"}</span>
                  )}
                </button>
              </div>
              
              {current._id && view === "dogs" && current.galleryFiles && current.galleryFiles.length > 0 && (
                <button 
                  onClick={handleAddGalleryImages}
                  disabled={isAddingGallery}
                  className="w-full py-3 bg-[#C8A84B] text-[#1a1008] font-bold rounded-2xl shadow-lg hover:scale-[1.02] transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isAddingGallery ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#1a1008] border-t-transparent rounded-full animate-spin"></div>
                      <span>Adding...</span>
                    </>
                  ) : (
                    <span>🎨 Add {current.galleryFiles.length} New Photo(s) to Gallery (Keep Existing)</span>
                  )}
                </button>
              )}
              
              <p className="text-[8px] text-center text-[#8a7060] mt-2">
                {view === "dogs" 
                  ? "⭐ Main Image = Card display | 🎨 Gallery = Carousel (Select multiple with Ctrl+Click / Cmd+Click)" 
                  : "Accepted formats: JPG, PNG (max 5MB)"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {modal === "delete" && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#1a1008]/80 backdrop-blur-md p-4">
           <div className="bg-white p-8 md:p-10 rounded-[32px] text-center max-w-sm w-full">
             <div className="text-5xl mb-4">⚠️</div>
             <h3 className="text-xl font-bold mb-2">Delete Permanently?</h3>
             <p className="text-sm text-[#8a7060] mb-8">This action cannot be undone.</p>
             <div className="flex gap-3 flex-col sm:flex-row">
               <button onClick={() => setModal(null)} className="flex-1 py-3 font-bold text-[#8a7060] bg-[#FAF6F0] rounded-xl order-2 sm:order-1">Cancel</button>
               <button 
                 onClick={confirmDelete} 
                 disabled={isDeleting}
                 className="flex-1 py-3 font-bold text-white bg-red-500 rounded-xl shadow-lg order-1 sm:order-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
               >
                 {isDeleting ? (
                   <>
                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                     <span>Deleting...</span>
                   </>
                 ) : (
                   <span>Delete</span>
                 )}
               </button>
             </div>
           </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-8 md:translate-x-0 z-[200] bg-[#1a1008] text-white px-6 py-4 rounded-2xl shadow-2xl animate-bounce">
          <span className="text-sm font-bold whitespace-nowrap">{toast}</span>
        </div>
      )}
    </div>
  );
}