document.getElementById("tilkiButon").addEventListener("click", function() {
    let tilkiResmi = document.getElementById("tilkiResmi");
    let loadingText = document.getElementById("loading");

    // Fotoğrafı yükleme öncesi gizle ve "Yükleniyor..." yazısını göster
    tilkiResmi.style.display = "none";
    loadingText.style.display = "block";

    fetch('https://randomfox.ca/floof/')
        .then(response => {
            if (!response.ok) {
                throw new Error("Ağ hatası! Tilki bulunamadı.");
            }
            return response.json();
        })
        .then(data => {
            // Yeni fotoğrafı yükle
            tilkiResmi.src = data.image;

            // Fotoğraf yüklenince "Yükleniyor..." yazısını kaldır
            tilkiResmi.onload = () => {
                loadingText.style.display = "none";
                tilkiResmi.style.display = "block";
            };
        })
        .catch(error => {
            console.error('Hata:', error);
            loadingText.innerText = "Hata oluştu, tekrar deneyin!";
        });
});
