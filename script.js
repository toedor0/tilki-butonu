document.getElementById("tilkiButon").addEventListener("click", function() {
    let tilkiResmi = document.getElementById("tilkiResmi");
    let loadingText = document.getElementById("loading");
    let bilgiKutusu = document.getElementById("tilkiBilgisi");
    let bilgiBaslik = document.getElementById("bilgiBaslik");
    let bilgiResim = document.getElementById("bilgiResim");

    // Yüklenme animasyonu göster
    loadingText.style.display = "block";
    tilkiResmi.style.display = "none";

    fetch('https://randomfox.ca/floof/')
        .then(response => {
            if (!response.ok) {
                throw new Error("Tilki API'ye ulaşılamadı!");
            }
            return response.json();
        })
        .then(data => {
            tilkiResmi.src = data.image;

            tilkiResmi.onload = () => {
                loadingText.style.display = "none";
                tilkiResmi.style.display = "block";

                // Tilki Bilgisini Güncelle
                fetch('tilki-bilgileri.json')
                    .then(res => {
                        if (!res.ok) {
                            throw new Error("Bilgi JSON dosyasına ulaşılamadı!");
                        }
                        return res.json();
                    })
                    .then(bilgiler => {
                        let rastgeleBilgi = bilgiler[Math.floor(Math.random() * bilgiler.length)];
                        bilgiBaslik.innerText = "📌 " + rastgeleBilgi.title;
                        bilgiKutusu.innerText = "🦊 " + rastgeleBilgi.description;

                        // Eğer JSON'da görsel varsa, ekrana koy
                        if (rastgeleBilgi.image) {
                            bilgiResim.src = rastgeleBilgi.image;
                            bilgiResim.style.display = "block";
                        } else {
                            bilgiResim.style.display = "none";
                        }
                    })
                    .catch(error => {
                        console.error("JSON Hatası:", error);
                        bilgiBaslik.innerText = "Bilgi yüklenirken hata oluştu.";
                        bilgiKutusu.innerText = "Lütfen sayfayı yenileyin.";
                        bilgiResim.style.display = "none";
                    });
            };
        })
        .catch(error => {
            console.error("API Hatası:", error);
            loadingText.innerText = "Hata oluştu, tekrar deneyin!";
        });
});
