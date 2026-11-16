function previewImage(event) {

    const file = event.target.files[0];

    if (!file) {
        return;
    }

    const preview = document.getElementById("preview");
    const analyzeButton = document.getElementById("analyzeButton");
    const result = document.getElementById("result");

    const imageURL = URL.createObjectURL(file);

    preview.src = imageURL;
    preview.style.display = "block";

    analyzeButton.style.display = "block";

    result.innerHTML = "";
}


function analyzeWaste() {

    const fileInput = document.getElementById("wasteImage");
    const result = document.getElementById("result");

    if (!fileInput.files || fileInput.files.length === 0) {

        result.innerHTML = `
            <div class="result-card">
                <h3>⚠️ Foto belum dipilih</h3>
                <p>
                    Silakan pilih foto sampah terlebih dahulu.
                </p>
            </div>
        `;

        return;
    }


    const fileName = fileInput.files[0].name.toLowerCase();

    let jenis = "Sampah Umum";
    let saran = "Pisahkan sampah dan buang pada tempat yang sesuai.";


    // Identifikasi sederhana berdasarkan nama file
    if (
        fileName.includes("botol") ||
        fileName.includes("plastik")
    ) {

        jenis = "♻️ Sampah Plastik";

        saran =
            "Pisahkan dari sampah organik. Botol atau kemasan plastik yang masih layak dapat digunakan kembali atau disalurkan ke tempat daur ulang.";

    }

    else if (
        fileName.includes("kertas") ||
        fileName.includes("karton")
    ) {

        jenis = "📄 Sampah Kertas";

        saran =
            "Pastikan kertas dalam kondisi relatif kering dan bersih. Kertas dapat dikumpulkan untuk didaur ulang.";

    }

    else if (
        fileName.includes("daun") ||
        fileName.includes("makanan") ||
        fileName.includes("organik")
    ) {

        jenis = "🌱 Sampah Organik";

        saran =
            "Sampah organik dapat dipisahkan dan dimanfaatkan untuk kompos.";

    }

    else if (
        fileName.includes("kaleng") ||
        fileName.includes("besi")
    ) {

        jenis = "🥫 Sampah Logam";

        saran =
            "Pisahkan dari sampah lainnya dan kumpulkan untuk digunakan kembali atau didaur ulang.";

    }


    result.innerHTML = `
        <div class="result-card">

            <h3>
                ${jenis}
            </h3>

            <p>
                <strong>Nama file:</strong>
                ${fileInput.files[0].name}
            </p>

            <p>
                <strong>Saran pengelolaan:</strong><br>
                ${saran}
            </p>

        </div>
    `;
}
