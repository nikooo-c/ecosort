let selectedImage = null;
let cameraStream = null;


// ==========================================
// PREVIEW FOTO
// ==========================================

function previewImage(event) {

    const file = event.target.files[0];

    if (!file) return;

    selectedImage = file;

    const reader = new FileReader();

    reader.onload = function(e) {

        const preview = document.getElementById("preview");

        preview.src = e.target.result;

        document.getElementById("previewContainer")
            .classList.add("show");

        document.getElementById("uploadBox")
            .style.display = "none";

        document.getElementById("scanner")
            .classList.remove("show");

        document.getElementById("result")
            .classList.remove("show");

    };

    reader.readAsDataURL(file);
}


// ==========================================
// BUKA KAMERA
// ==========================================

async function openCamera() {

    const cameraContainer =
        document.getElementById("cameraContainer");

    try {

        cameraStream =
            await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: "environment"
                },
                audio: false
            });

        const video =
            document.getElementById("cameraVideo");

        video.srcObject = cameraStream;

        cameraContainer.classList.add("show");

        document.getElementById("uploadBox")
            .style.display = "none";

    } catch (error) {

        alert(
            "Kamera tidak dapat digunakan. Pastikan browser memiliki izin kamera."
        );

    }
}


// ==========================================
// TUTUP KAMERA
// ==========================================

function closeCamera() {

    if (cameraStream) {

        cameraStream.getTracks().forEach(track => {
            track.stop();
        });

        cameraStream = null;
    }

    document.getElementById("cameraContainer")
        .classList.remove("show");

    document.getElementById("uploadBox")
        .style.display = "block";
}


// ==========================================
// AMBIL FOTO DARI KAMERA
// ==========================================

function takePhoto() {

    const video =
        document.getElementById("cameraVideo");

    const canvas =
        document.getElementById("cameraCanvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context =
        canvas.getContext("2d");

    context.drawImage(
        video,
        0,
        0,
        canvas.width,
        canvas.height
    );

    canvas.toBlob(function(blob) {

        selectedImage = blob;

        const imageURL =
            URL.createObjectURL(blob);

        document.getElementById("preview")
            .src = imageURL;

        document.getElementById("cameraContainer")
            .classList.remove("show");

        document.getElementById("previewContainer")
            .classList.add("show");

        document.getElementById("uploadBox")
            .style.display = "none";

        closeCamera();

    }, "image/jpeg", 0.9);
}


// ==========================================
// MULAI ANALISIS
// ==========================================

function startAnalysis() {

    if (!selectedImage) {

        alert("Silakan pilih foto terlebih dahulu.");

        return;
    }


    const preview =
        document.getElementById("preview");

    const scanImage =
        document.getElementById("scanImage");

    scanImage.src = preview.src;


    // sembunyikan preview

    document.getElementById("previewContainer")
        .classList.remove("show");


    // tampilkan scanner

    document.getElementById("scanner")
        .classList.add("show");


    // scroll ke scanner

    document.getElementById("scanner")
        .scrollIntoView({
            behavior: "smooth",
            block: "center"
        });


    // simulasi proses AI

    setTimeout(function() {

        showResult();

    }, 3000);
}


// ==========================================
// HASIL ANALISIS
// ==========================================

function showResult() {

    document.getElementById("scanner")
        .classList.remove("show");

    document.getElementById("result")
        .classList.add("show");


    // hasil contoh botol plastik

    document.getElementById("wasteName")
        .textContent = "Botol Plastik";

    document.getElementById("wasteCategory")
        .textContent = "Anorganik";

    document.getElementById("confidenceValue")
        .textContent = "96%";


    document.getElementById("ecoTip")
        .textContent =
        "Bersihkan botol sebelum digunakan kembali. Jika masih layak, gunakan kembali atau pisahkan untuk didaur ulang.";


    // scroll ke hasil

    setTimeout(function() {

        document.getElementById("result")
            .scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

    }, 200);

}


// ==========================================
// RESET
// ==========================================

function resetScanner() {

    selectedImage = null;


    document.getElementById("result")
        .classList.remove("show");

    document.getElementById("previewContainer")
        .classList.remove("show");

    document.getElementById("scanner")
        .classList.remove("show");

    document.getElementById("uploadBox")
        .style.display = "block";


    document.getElementById("wasteImage")
        .value = "";


    window.scrollTo({
        top: document.getElementById("scanner")
            .offsetTop - 80,
        behavior: "smooth"
    });

}
