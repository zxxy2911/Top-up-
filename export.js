// Export ke CSV
function exportToCSV() {
  const data = JSON.parse(localStorage.getItem('xXzyyHistory')) || [];
  const user = localStorage.getItem('xXzyyUser');
  const userData = data.filter(tx => tx.user === user);

  if (userData.length === 0) {
    alert("⚠️ Tidak ada data untuk diekspor.");
    return;
  }

  const csvRows = [
    ['User', 'Produk', 'User ID', 'Jumlah', 'Waktu']
  ];

  userData.forEach(tx => {
    csvRows.push([tx.user, tx.product, tx.userId, tx.amount, tx.time]);
  });

  const csvContent = csvRows.map(row => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'riwayat_transaksi.csv';
  a.click();
  URL.revokeObjectURL(url);
}

// Export ke PDF
function exportToPDF() {
  const data = JSON.parse(localStorage.getItem('xXzyyHistory')) || [];
  const user = localStorage.getItem('xXzyyUser');
  const userData = data.filter(tx => tx.user === user);

  if (userData.length === 0) {
    alert("⚠️ Tidak ada data untuk diekspor.");
    return;
  }

  let printWindow = window.open('', '', 'width=800,height=600');
  printWindow.document.write('<html><head><title>Riwayat Transaksi</title>');
  printWindow.document.write('<style>body{font-family:sans-serif;} table{width:100%; border-collapse:collapse;} th,td{padding:8px;border:1px solid #ccc;text-align:left;}</style>');
  printWindow.document.write('</head><body>');
  printWindow.document.write('<h2>Riwayat Transaksi - xXzyyGames</h2>');
  printWindow.document.write('<table><thead><tr><th>User</th><th>Produk</th><th>ID</th><th>Jumlah</th><th>Waktu</th></tr></thead><tbody>');

  userData.forEach(tx => {
    printWindow.document.write(`<tr>
      <td>${tx.user}</td>
      <td>${tx.product}</td>
      <td>${tx.userId}</td>
      <td>${tx.amount}</td>
      <td>${tx.time}</td>
    </tr>`);
  });

  printWindow.document.write('</tbody></table>');
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.print();
}
