function initSlider() {
  const sliderContainer = document.getElementById('hero-slider-container');
  if (!sliderContainer) return;

  const locations = JSON.parse(sliderContainer.dataset.locations);
  const sliderEl = document.getElementById('image-carousel');
  const titleEl = document.getElementById('hero-title');
  const subtitleEl = document.getElementById('hero-subtitle');

  if (!sliderEl) return;
  
  const splide = new Splide(sliderEl, {
    type       : 'loop',
    direction  : 'ltr',
    perPage    : 3,
    focus      : 'center',
    gap        : '1rem',
    pagination : false,
    arrows     : true,
    fixedWidth : '10rem',
    fixedHeight: '14rem',
  });

  // Fungsi untuk mengganti background dan judul
  function updateHero(index) {
  const activeLocation = locations[index];
  if (activeLocation && titleEl && subtitleEl) {
    sliderContainer.style.backgroundImage = `url('${activeLocation.bgImage}')`;
    titleEl.textContent = activeLocation.title;
    subtitleEl.textContent = activeLocation.subtitle;

    // === Tambahan: update link Google Maps ===
    const mapsLink = document.getElementById('hero-maps-link');
    if (mapsLink && activeLocation.mapsUrl) {
      mapsLink.href = activeLocation.mapsUrl;
      mapsLink.style.display = 'inline-block'; // pastikan terlihat
    }
  }
}


  // Fungsi untuk efek zoom pada kartu
  function updateCardClasses(splideInstance) {
    for (const slide of splideInstance.Components.Slides.get()) {
      const cardDiv = slide.slide.firstElementChild;
      if (cardDiv) {
        // Hapus semua kelas efek dulu
        cardDiv.classList.remove('scale-110', 'opacity-100', 'opacity-60');
        
        // Tambahkan kelas yang sesuai
        if (slide.index === splideInstance.index) {
          cardDiv.classList.add('scale-110', 'opacity-100'); // Kartu aktif
        } else {
          cardDiv.classList.add('opacity-60'); // Kartu tidak aktif
        }
      }
    }
  }

  // Event listener utama
  splide.on('mounted moved', () => {
    updateHero(splide.index);
    updateCardClasses(splide); // Panggil fungsi zoom di sini
  });

  splide.on('click', (slide) => {
    splide.go(slide.index);
  });

  splide.mount();
}

// Menunggu halaman benar-benar siap sebelum menjalankan script
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initSlider, 50);
});