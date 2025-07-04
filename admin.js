document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('adminTransactionList');
  const search = document.getElementById('adminSearchInput');

  function renderTransaksi(filter = '') {
    const data = JSON.parse(localStorage.getItem('xXzyyHistory')) || [];

    const filtered = data.filter(tx =>
      tx.user.toLowerCase().includes(filter.toLowerCase()) ||
      tx.product.toLowerCase().includes(filter.toLowerCase()) ||
      tx.userId.toLowerCase().includes(filter.toLowerCase()) ||
      tx.amount.toLowerCase().includes(filter.toLowerCase())
    );

    if (filtered.length === 0) {
      list.innerHTML = '<p>Tidak ada transaksi ditemukan.</p>';
      return;
    }

    let html = '<ul style="list-style: none; padding: 0;">';
    filtered.reverse().forEach(tx => {
      html += `
        <li style="margin-bottom: 12px; padding: 10px; border-radius: 8px; background: rgba(255,255,255,0.05); box-shadow: 0 0 10px #00d0ff;">
          <strong>${tx.product}</strong><br>
          User: ${tx.user}<br>
          ID: ${tx.userId}<br>
          Jumlah: ${tx.amount}<br>
          <small>${tx.time}</small>
        </li>
      `;
    });
    html += '</ul>';
    list.innerHTML = html;
  }

  if (list) {
    renderTransaksi();

    if (search) {
      search.addEventListener('input', (e) => {
        renderTransaksi(e.target.value);
      });
    }
  }
});
