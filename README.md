
# Sistem Monitoring Qurban

Aplikasi web untuk monitoring proses penyembelihan hewan qurban dan distribusi daging.

## Features

- Dashboard dengan tampilan visual status hewan qurban
- Tampilan grafik pie untuk melihat persentase hewan yang telah disembelih
- Progress bar untuk monitoring keluar kandang dan penyembelihan
- Monitoring packing dan distribusi daging
- Panel admin untuk mengatur semua data
- Penyimpanan data secara lokal di browser

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- shadcn-ui
- Chart.js
- Local Storage (untuk database)

## Installation & Setup

### Development Setup (Offline)

1. Clone repository:
   ```sh
   git clone <repository-url>
   cd qurban-tracker-dashboard-system
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Jalankan aplikasi dalam mode development:
   ```sh
   npm run dev
   ```

4. Buka browser dan akses:
   ```
   http://localhost:8080
   ```

### Production Build

1. Buat build produksi:
   ```sh
   npm run build
   ```

2. Test build hasil produksi secara lokal:
   ```sh
   npm run preview
   ```

### Deployment

#### Deploy ke Hosting Statis (Netlify, Vercel, dll)

1. Buat build produksi:
   ```sh
   npm run build
   ```

2. Upload folder `dist` ke provider hosting statis pilihan Anda.

#### Deploy ke Netlify

1. Pastikan Anda memiliki akun Netlify
2. Instal Netlify CLI:
   ```sh
   npm install -g netlify-cli
   ```

3. Login ke Netlify:
   ```sh
   netlify login
   ```

4. Deploy ke Netlify:
   ```sh
   netlify deploy
   ```

5. Untuk deployment produksi:
   ```sh
   netlify deploy --prod
   ```

#### Deploy ke Vercel

1. Pastikan Anda memiliki akun Vercel
2. Instal Vercel CLI:
   ```sh
   npm install -g vercel
   ```

3. Login ke Vercel:
   ```sh
   vercel login
   ```

4. Deploy ke Vercel:
   ```sh
   vercel
   ```

5. Untuk deployment produksi:
   ```sh
   vercel --prod
   ```

## Catatan Penting

- Aplikasi ini menggunakan localStorage untuk menyimpan data. Hal ini berarti:
  - Data tersimpan di browser pengguna
  - Data tidak akan dibagikan antar perangkat/browser
  - Membersihkan cache browser akan menghapus data

- Untuk penggunaan produksi yang memerlukan database terpusat, kode perlu dimodifikasi untuk menggunakan backend API dengan database seperti MongoDB, MySQL, atau PostgreSQL.

## Screenshot

[Screenshot aplikasi akan ditampilkan di sini]

## License

[MIT](https://choosealicense.com/licenses/mit/)
