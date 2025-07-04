// Proses login
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();

      if (!username || !password) {
        alert('❌ Username dan password harus diisi!');
        return;
      }

      // Simpan ke localStorage
      localStorage.setItem('xXzyyUser', username);
      alert(`✅ Selamat datang, ${username}!`);
      window.location.href = 'dashboard.html';
    });
  }

  // Proteksi dashboard & tampilkan nama user
  const userDisplay = document.getElementById('userDisplay');
  if (userDisplay) {
    const user = localStorage.getItem('xXzyyUser');
    if (!user) {
      alert('⚠️ Anda harus login dulu!');
      window.location.href = 'login.html';
    } else {
      userDisplay.textContent = user;
    }
  }
});

// Logout user
function logout() {
  localStorage.removeItem('xXzyyUser');
  alert('🔒 Anda telah logout!');
  window.location.href = 'login.html';
}
