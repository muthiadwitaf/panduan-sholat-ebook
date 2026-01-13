# E-Learning Panduan Sholat & Doa Harian Berbasis E-Book

Aplikasi web E-Learning interaktif untuk membantu pengguna mempelajari tata cara Sholat Fardhu dan Doa Harian. Dibangun dengan HTML5, CSS3, dan JavaScript murni tanpa backend, cocok untuk demonstrasi akademik dan mudah digunakan di mana saja.

## Fitur Utama

- **Panduan Sholat Interaktif**: Langkah-langkah sholat lengkap dengan Niat, Bacaan Arab, Latin, dan Terjemahan.
- **Doa Harian**: Kumpulan doa sehari-hari (bangun tidur, makan, dll) dengan fitur pencarian.
- **Kuis Pengetahuan**: Evaluasi pemahaman pengguna dengan kuis interaktif skor otomatis.
- **Mode E-Book**: Tampilan membaca yang nyaman dan terstruktur.
- **Audio Support**: Integrasi pemutar audio untuk bacaan sholat dan doa (Placeholder support).
- **Desain Premium**: Antarmuka modern, responsif (Mobile Friendly), dan estetis.

## Struktur Project

```
panduan-sholat-ebook/
├── index.html          # Halaman utama aplikasi
├── css/
│   └── styles.css      # Styling premium dengan transisi halus
├── js/
│   └── app.js          # Logika aplikasi (Navigasi, Quiz, Render Data)
├── data/               # Data konten (JSON-like objects)
│   ├── sholatData.js   # Data tata cara sholat
│   ├── doaData.js      # Data kumpulan doa
│   └── quizData.js     # Bank soal kuis
└── assets/             # Aset media
    ├── images/         # Gambar ilustrasi
    └── audio/          # File audio (MP3) untuk bacaan
```

## Cara Menjalankan Secara Lokal (Offline)

1.  Pastikan Anda telah mengunduh seluruh folder project ini.
2.  Buka folder project.
3.  Klik dua kali file `index.html`.
4.  Aplikasi akan terbuka di browser default Anda (Chrome, Firefox, Edge, dll).

## Cara Menambahkan Audio

Untuk melengkapi fitur audio, tambahkan file `.mp3` ke dalam folder `assets/audio/`.
Penamaan file harus sesuai dengan nama gerakan/doa (huruf kecil, spasi diganti underscore).
Contoh:
- Tata cara "Takbiratul Ihram" -> file: `assets/audio/takbiratul_ihram.mp3`
- Doa "Doa Sebelum Tidur" -> file: `assets/audio/doa_sebelum_tidur.mp3`

## Panduan Deployment ke GitHub Pages (Online)

Agar aplikasi dapat diakses secara online oleh publik:

1.  **Buat Repository Baru** di GitHub (misal: `panduan-sholat-web`).
2.  **Upload File** dari folder ini ke repository tersebut.
    - Pastikan `index.html` berada di root (halaman utama).
3.  Masuk ke menu **Settings** > **Pages** di repository GitHub Anda.
4.  Pada bagian **Source**, pilih branch `main` (atau `master`) dan folder `/ (root)`.
5.  Klik **Save**.
6.  Tunggu beberapa saat, link website Anda akan muncul (contoh: `https://username.github.io/panduan-sholat-web/`).

## Teknologi

- **Frontend**: HTML5, CSS3 (Custom Properties, Flexbox, Grid), Vanilla JavaScript (ES6+).
- **Icons & Fonts**: Google Fonts (Outfit, Amiri).
- **Architecture**: Single Page Application (SPA) feel tanpa framework berat.

## Lisensi

Project ini dibuat untuk tujuan edukasi dan akademik. Bebas dikembangkan lebih lanjut.
