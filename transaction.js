document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('topupForm');
  const historyDiv = document.getElementById('transactionHistory');
  const searchInput = document.getElementById('searchInput');

  // Handle form submit di topup.html
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const userId = document.getElementById('userId').value.trim();
      const product = document.getElementById('product').value;
      const amount = document.getElementById('amount').value.trim();
      const username = localStorage.getItem('xXzyyUser') || 'Guest';

      if (!userId || !product || !amount) {
        alert('❌ Semua kolom harus diisi!');
        return;
      }

      const transaksi = {
        user: username,
        product,
        userId,
        amount,
        time: new Date().toLocaleString(),
      };

      const history = JSON.parse(localStorage.getItem('xXzyyHistory')) || [];
      history.push(transaksi);
      localStorage.setItem('xXzyyHistory', JSON.stringify(history));

      alert("✅ Transaksi berhasil disimpan!");
      form.reset();
    });
  }

  // Tampilkan riwayat transaksi di dashboard.html
  function tampilkanRiwayat(filterText = "") {
    const data = JSON.parse(localStorage.getItem('xXzyyHistory')) || [];
    const user = localStorage.getItem('xXzyyUser');

    const userData = data.filter(tx => tx.user === user);
    const filtered = userData.filter(tx =>
      tx.product.toLowerCase().includes(filterText.toLowerCase()) ||
      tx.userId.toLowerCase().includes(filterText.toLowerCase()) ||
      tx.amount.toLowerCase().includes(filterText.toLowerCase())
    );

    if (historyDiv) {
      if (filtered.length === 0) {
        historyDiv.innerHTML = '<p>Tidak ada transaksi ditemukan.</p>';
        return;
      }

      let html = '<ul style="list-style: none; padding: 0;">';
      filtered.reverse().forEach(tx => {
        html += `
          <li style="margin-bottom: 12px; padding: 10px; border-radius: 8px; background: rgba(255,255,255,0.05); box-shadow: 0 0 10px #8f00ff;">
            <strong>${tx.product}</strong><br>
            ID: ${tx.userId}<br>
            Jumlah: ${tx.amount}<br>
            <small>${tx.time}</small>
          </li>
        `;
      });
      html += '</ul>';
      historyDiv.innerHTML = html;
    }
  }

  if (historyDiv) {
    tampilkanRiwayat();

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        tampilkanRiwayat(e.target.value);
      });
    }
  }
});
