
# Sistem Monitoring Qurban

Aplikasi web untuk monitoring proses penyembelihan hewan qurban dan distribusi daging.

## Fitur Utama

- Dashboard visual untuk status hewan qurban
- Grafik persentase hewan yang telah disembelih
- Progress bar untuk monitoring keluar kandang dan penyembelihan
- Tracking packing dan distribusi daging
- Panel admin terproteksi

## Prasyarat

- Node.js 18+ 
- npm atau bun
- Akun Supabase

## Instalasi Cepat

### 1. Clone Repositori

```bash
git clone https://github.com/anda/qurban-tracker
cd qurban-tracker
```

### 2. Konfigurasi Lingkungan

1. Salin `.env.example` menjadi `.env.local`
2. Isi kredensial Supabase dari dashboard proyek Anda

```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Instalasi Dependensi

```bash
npm install
# atau
bun install
```

### 4. Jalankan Migrasi Database

Gunakan SQL Editor di Supabase untuk menjalankan migrasi awal yang disediakan dalam README.

### 5. Jalankan Aplikasi

```bash
npm run dev
# atau
bun run dev
```

## Mode Offline

Untuk penggunaan offline:
- Pastikan semua dependensi terinstal
- Gunakan `npm run build` untuk membuat build statis
- Jalankan melalui server web lokal seperti nginx atau xampp

## Deployment

### Netlify
```bash
netlify deploy
netlify deploy --prod
```

### Vercel
```bash
vercel
vercel --prod
```

### CPanel
1. Buat build produksi: `npm run build`
2. Upload folder `dist` ke direktori publik

## Kredensial Admin

- Username: `adminkurban`
- Password: `@AlfatihahBerkah99`
- Sesi login: 6 jam

## Teknologi

- React 18
- TypeScript
- Tailwind CSS
- Supabase
- shadcn/ui

## Lisensi

[MIT License](https://opensource.org/licenses/MIT)
