function previewImage(event) {
    const file = event.target.files[0];

    if (!file) return;

    const image = document.getElementById("preview");
    const result = document.getElementById("result");

    image.src = URL.createObjectURL(file);
    image.style.display = "block";

    result.innerHTML = `
        <h3>📸 Foto berhasil dipilih!</h3>
        <p>Tekan tombol <b>Analisis Sampah</b> untuk melanjutkan.</p>
    `;
}

function analyzeWaste() {
    const result = document.getElementById("result");

    result.innerHTML = `
        <div class="result-box">
            <h2>🔍 Hasil Analisis</h2>
            <p><b>Jenis:</b> Sampah perlu diperiksa</p>
            <p><b>Kategori:</b> Belum ditentukan</p>
            <p>💡 Sistem identifikasi otomatis akan kita tambahkan pada tahap berikutnya.</p>
        </div>
    `;
}
