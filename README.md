# Pembukuan Enterprise — PWA

Antarmuka Progressive Web App untuk Sistem Pembukuan Enterprise. Halaman ini hanya **tampilan**; data dan logika berada di Google Apps Script + Google Sheets milik organisasi Anda.

## Isi repositori (5 berkas)

| Berkas | Fungsi |
|---|---|
| `index.html` | Aplikasi satu halaman (UI lengkap, responsif mobile) |
| `manifest.json` | Metadata instalasi PWA |
| `sw.js` | Service worker: app shell bisa dibuka offline |
| `icon.svg` | Ikon aplikasi |
| `README.md` | Dokumen ini |

## Publikasi di GitHub Pages

1. Buat repositori baru, unggah 5 berkas di atas ke cabang `main`.
2. **Settings → Pages → Build from branch → main / root**.
3. Buka `https://<akun>.github.io/<repo>/`, tempel URL Web App Apps Script (`…/exec`) dari penyedia.
   Opsional: isi `window.PE_API_URL` di `index.html` agar pengguna tidak perlu menempel URL.
4. Di ponsel: menu browser → **Tambahkan ke layar utama**.

## Mode offline

- App shell dapat dibuka tanpa internet.
- Draf **jurnal, kas, dan invoice** yang dibuat saat offline disimpan di IndexedDB perangkat dan dikirim otomatis saat online (dengan kunci idempotensi, sehingga tidak tergandakan).
- Persetujuan, posting, dan laporan **selalu** membutuhkan koneksi — data keuangan tidak disimpan oleh service worker.
- Data referensi (COA, daftar mitra) di-cache di perangkat agar formulir tetap bisa diisi.

## Keamanan

- Content-Security-Policy hanya mengizinkan koneksi ke domain Google Apps Script.
- Token sesi disimpan di `sessionStorage` (hilang saat tab ditutup).
- Seluruh otorisasi divalidasi di server.
- Repositori ini boleh publik: tidak berisi kredensial atau data. **Jangan** menambahkan URL Web App produksi bila repositori publik dan Anda tidak ingin endpoint diketahui (endpoint tetap dilindungi login).

Lisensi: proprietary — lihat perjanjian lisensi dari penyedia.
