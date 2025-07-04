// Fungsi untuk membuka popup pembayaran
function openPopup() {
  const popup = document.getElementById('popup');
  if (popup) {
    popup.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Cegah scroll
  }
}

// Fungsi untuk menutup popup pembayaran
function closePopup() {
  const popup = document.getElementById('popup');
  if (popup) {
    popup.style.display = 'none';
    document.body.style.overflow = ''; // Aktifkan scroll lagi
  }
}

// Tutup popup jika klik di luar area konten
window.addEventListener('click', function (e) {
  const popup = document.getElementById('popup');
  const popupContent = document.querySelector('.popup-content');
  if (popup && e.target === popup) {
    closePopup();
  }
});
