
# Sistem Monitoring Qurban

Aplikasi web untuk monitoring proses penyembelihan hewan qurban dan distribusi daging.

## Features

- Dashboard dengan tampilan visual status hewan qurban
- Tampilan grafik pie untuk melihat persentase hewan yang telah disembelih
- Progress bar untuk monitoring keluar kandang dan penyembelihan
- Monitoring packing dan distribusi daging
- Panel admin untuk mengatur semua data (dilindungi dengan login)
- Penyimpanan data di database Supabase

## Login Admin

Untuk mengakses halaman admin, gunakan kredensial berikut:
- Username: `adminkurban`
- Password: `@AlfatihahBerkah99`

Sesi login akan bertahan selama 6 jam.

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- shadcn-ui
- Recharts
- Supabase (database)

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
   http://localhost:5173
   ```

### Database Setup

Aplikasi ini menggunakan Supabase sebagai database. Untuk menerapkan database di lingkungan lokal atau produksi, ikuti langkah-langkah berikut:

1. Buat akun di [Supabase](https://supabase.com) dan buat project baru
   
2. Jalankan SQL berikut di SQL Editor Supabase untuk membuat tabel yang diperlukan:

   ```sql
   -- Create a table for qurban_data
   CREATE TABLE public.qurban_data (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     total_goats INTEGER NOT NULL DEFAULT 200,
     out_of_pen_goats INTEGER NOT NULL DEFAULT 0,
     slaughtered_goats INTEGER NOT NULL DEFAULT 0,
     total_sheep INTEGER NOT NULL DEFAULT 500,
     out_of_pen_sheep INTEGER NOT NULL DEFAULT 0,
     slaughtered_sheep INTEGER NOT NULL DEFAULT 0,
     total_cows INTEGER NOT NULL DEFAULT 50,
     out_of_pen_cows INTEGER NOT NULL DEFAULT 0,
     slaughtered_cows INTEGER NOT NULL DEFAULT 0,
     total_packaging INTEGER NOT NULL DEFAULT 1500,
     completed_packaging INTEGER NOT NULL DEFAULT 0,
     total_distribution INTEGER NOT NULL DEFAULT 1500,
     completed_distribution INTEGER NOT NULL DEFAULT 0,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
   );

   -- Create a trigger to update the updated_at column
   CREATE OR REPLACE FUNCTION update_modified_column()
   RETURNS TRIGGER AS $$
   BEGIN
       NEW.updated_at = now();
       RETURN NEW;
   END;
   $$ LANGUAGE plpgsql;

   CREATE TRIGGER update_qurban_data_updated_at
   BEFORE UPDATE ON public.qurban_data
   FOR EACH ROW
   EXECUTE FUNCTION update_modified_column();

   -- Set up RLS - make the table publicly accessible for this app's purpose
   ALTER TABLE public.qurban_data ENABLE ROW LEVEL SECURITY;
   CREATE POLICY "Allow public access to qurban_data" ON public.qurban_data FOR ALL USING (true);

   -- Insert default data
   INSERT INTO public.qurban_data (
     total_goats, out_of_pen_goats, slaughtered_goats,
     total_sheep, out_of_pen_sheep, slaughtered_sheep,
     total_cows, out_of_pen_cows, slaughtered_cows,
     total_packaging, completed_packaging,
     total_distribution, completed_distribution
   ) VALUES (
     200, 0, 0,
     500, 0, 0,
     50, 0, 0,
     1500, 0,
     1500, 0
   );
   ```

3. Dapatkan URL dan API key Supabase dari Dashboard > Settings > API

4. Buat file `.env.local` di root proyek dan tambahkan kredensial Supabase:
   ```
   VITE_SUPABASE_URL=<your-supabase-url>
   VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
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

#### Deploy ke CPanel

1. Buat build produksi:
   ```sh
   npm run build
   ```

2. Upload folder `dist` ke server CPanel Anda melalui File Manager atau FTP:
   - Login ke CPanel
   - Buka File Manager atau gunakan client FTP (seperti FileZilla)
   - Navigasi ke folder `public_html` atau subdomain yang diinginkan
   - Upload semua file dari folder `dist`

3. Konfigurasi redirect (opsional):
   - Buat file `.htaccess` di folder yang sama dengan konten berikut:
     ```
     <IfModule mod_rewrite.c>
       RewriteEngine On
       RewriteBase /
       RewriteRule ^index\.html$ - [L]
       RewriteCond %{REQUEST_FILENAME} !-f
       RewriteCond %{REQUEST_FILENAME} !-d
       RewriteRule . /index.html [L]
     </IfModule>
     ```
   - Ini diperlukan untuk menangani routing di sisi klien dengan React Router

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

## Penggunaan Offline Tanpa Internet

Untuk penggunaan offline tanpa koneksi internet, Anda perlu memodifikasi aplikasi untuk menggunakan localStorage sebagai penyimpanan data:

1. Modifikasi file `src/lib/db.ts` untuk menggunakan localStorage sebagai fallback ketika koneksi Supabase tidak tersedia.

2. Pastikan semua dependensi diinstal dengan benar sebelum menggunakan aplikasi tanpa internet.

3. Jalankan file build di server lokal (seperti XAMPP, WAMP, atau Nginx) untuk akses offline.

## Catatan Penting

- Untuk penggunaan produksi, pastikan untuk mengganti kredensial admin dengan nilai yang aman
- Pastikan database Supabase dikonfigurasi dengan benar dan dapat diakses dari aplikasi
- Backup data secara berkala untuk menghindari kehilangan data

## Screenshot

[Screenshot aplikasi akan ditampilkan di sini]

## License

[MIT](https://choosealicense.com/licenses/mit/)
