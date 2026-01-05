# Wedwise
Use case Business
```
  WedWise adalah platform digital yang menyediakan berbagai layanan terpadu
untuk acara pernikahan. Dimulai dari undangan digital dengan integrasi AI chatbot,
RSVP online, pencatatan kehadiran tamu, galeri foto acara, hingga kontrol stok
makanan dan souvenir. Dengan pendekatan modular dan sistem bundling, WedWise
menyasar pasangan muda yang ingin menghadirkan pengalaman pernikahan yang
praktis, modern, dan terorganisir dengan baik. Layanan ini dikembangkan dengan
pendekatan kolaboratif bersama vendor Wedding Organizer untuk menyesuaikan
produk dengan kebutuhan pasar pernikahan modern.
```
Role
1. Guest =>    : Tamu undangan yang membuka undangan (tidak perlu login, hanya buka link) 
2. Customer => : Pemilik undangan 
3. Admin =>    : Admin untuk memantau system

Flow
1. Customer visit website kemudian check tema yang tersedia, lihat layanan yang ada beserta pricingnya
2. Customer Register dan Login, kemudian request digital invitation, payment dan akan dibuatkan dashboard untuk customer ini  
3. di dashboard customer akan mendaftakan siapa saja guest yang akan mendapat kan link undangan, includes no WA untuk integrasi layanan chatbot di WA
4. Link di sebar oleh customer, guest klik link (digital invitation) dan akan mendapat chat dari chatbot untuk berbagai keperluan acara undangan

Flow admin masuk ke dashboard
- list customer
  ada availability untuk check traffic undangan digital dan message chatbot yang di gunakan
- list feature
- list tema website undangan
    berbentuk table dengan data (metadata) dan link preview
    ada expandable row untuk melihat preview kecil (image 400 X 400)
- list pembayaran / invoice
- list agent AI
- traffic message agent AI 
- config payment

Detail Digital Invitations (full feature version)
1. Digital Invitation
2. Countdown
3. Audio Music
4. Gallery Pengantin
5. Story Pengantin
6. RSVP (bisa melalui isi form di website atau dibantu chatbot melalui whatsapp, buat automation dengan n8n)
7. Detail acara, rundown, lokasi, tanggal
8. Reward ke pengantin
9. Komentar Acara dan Pengantin
10. Integrasi ke whatsapp untuk reminder, information, dan AI Help
11. AI Assistant chatbot (like customer service) di pojok bawah website

Detail Admin Panel Customer
1. Management Guest
2. Builder Digital Invitations (standar from theme exist)
3. Inject Context invitation untuk di pakai oleh AI (add fallback to customer if AI can't help chatting)
4. Halaman untuk pantau chatting chatbot dengan tamu undangan 

1. feature => list feature yang ada di wedwise, di kelola oleh admin
   - Digital Invitation
   - Countdown
   - Audio Music        
   - Gallery Pengantin
   - Story Pengantin
   - RSVP 
   - Chatbot
   - Whatsapp Broadcast and Chatbot Integration
   - dsb
2. invitations => untuk menyimpan list templates digital wedding invitation, relasi ke customer
   - bisa disable enable chatbot dan fitur lainnya, misal rsvp, gallery, manajemen catering, dsb
   - bisa enable chatbot via whatsapp saja atau via website, ataupun keduanya
   - ada manajemen context tambahan oleh customer untuk AI
3. conversation => relasi ke guest, customer, invitations

Aspek yang sudah di kerjakan
1. Authentication, include metode credential, oauth google, forgot password mechanism
2. Authorization RBAC yang scallable, clean code, dengan middleware di level page dan route API
3. satu template undangan digital
4. nemu satu arsitektur yang pass, yaittu deploy template ke github pages, isolated per template, serve via iframe di project utama next js
5. udah ada gambaran gimana cara passing data, apa aja yang perlu disimpan dll  

Plan Algoritma Chatbot
1. Extract request body : customerId, guestId dan message (request)
2. parsed message request
   - Remove filler words, 
   - standarize,
   - sanitize string input, 
   - make sure no get sensitive data,
   - if (messages indicates suspicious) return response to message warning
3. Cari invitation berdasarkan guestId
4. Ambil aiContext invitation
5. Cari conversation berdasarkan guestId (field messages)
6. if (conversation > 15) summarize : todo research teori summarize
7. get 3 latest exchanges conversation
8. Inject history conversation (messages) ke prompt (json stringify object structured)
9. request ke google gemini genai
10. if(gemini success response) save response dan request messages ke conversation
11. return messages response

Schema Database

Customer ke user => one to one
Customer ke Invitation => one to many
Invitation ke InvitationFeatures => many to many
Invitation ke guest => one to many
Guest ke Conversation => one to one

```ts
const pathnames = [
  // Public
  "/", 
  "/pricing", 
  "/order",

  // Admin Panel disisi Customer
  "/[customerId]", 
  "/[customerId]/guests",
  "/[customerId]/guests/create", 
  "/[customerId]/guests/[customerId]", 
  "/[customerId]/guests/[customerId]/edit", 

  // Backoffice admin
  "/backoffice",
  "/backoffice/customers",
  "/backoffice/customers/create", 
  "/backoffice/customers/[customerId]",
  "/backoffice/customers/[customerId]/edit", 
];
```

## Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the application
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm db:generate` - Generate database schema
- `pnpm db:migrate` - Run database migrations
- `pnpm db:seed` - Seed the database with initial data
- `pnpm db:studio` - Database Studio to manage data
- `pnpm db:truncate --help` - Show help
- `pnpm db:truncate` - Clear all data (keeps structure)
- `pnpm db:truncate user_roles` - Clear specific tables example users and user_roles
- `pnpm db:drop` - Drop all tables
- `pnpm db:drop roles permissions` - Drop specific tables example roles and permissions
- `pnpm db:drop -- help` - Show help

## How RBAC Works

RBAC di proyek ini berbasis NextAuth (JWT) + middleware App Router:

- **Token berisi roles & permissions**
  Saat login, JWT di inject `roles` dan `permissions` user dari database.
- **Deklarasi izin per route**:

  Setiap file `app/**/page.tsx` atau `app/**/route.ts` bisa mengekspor

  ```ts
  export const permissions = [PERMISSIONS.CUSTOMER.READ, ...]`.
  ```

- **Auto-generate path permissions**:

  Script `permissions:generate` membaca deklarasi tersebut dan membuat file `lib/routes/permissions.ts` (jangan diedit manual).

- **Enforcement di Middleware**:

  `middleware.ts` membaca path permissions dan memblokir akses jika user tidak memiliki semua permission yang dibutuhkan untuk path tersebut (mendukung route dinamis seperti `[id]` → `:id` dan catch-all `*`).

- **Guard ekstra di API**:

  Untuk response JSON 403 yang konsisten, gunakan `safeHandler(handler, ["permission"])` di masing-masing handler API.

### How To Use

1. Seed & jalankan dev

   ```bash
   pnpm db:seed
   pnpm dev
   ```

   Dev script otomatis menjalankan watcher `permissions:watch` yang akan regenerate `lib/routes/permissions.ts` ketika export array `permissions` di route/page.

2. Tambahkan izin pada halaman (Page Route)

   ```tsx
   // app/admin/page.tsx
   export const permissions = [PERMISSIONS.CUSTOMER.READ, PERMISSIONS.CUSTOMER.UPDATE ]. // halaman ini butuh permission read and update

   export default function Page() {
   return <div>Admin</div>;
   }
   ```

3. Tambahkan izin pada API (Route Handler)

   ```tsx
   // app/api/users/route.ts
   import { NextResponse } from "next/server";
   import { safeHandler } from "~/lib/handler/safe-handler";

   // example guard permissions, but does'nt support per method security
   // all handler will be protected to this permission
   export const permissions = [
     PERMISSIONS.CUSTOMER.READ,
     PERMISSIONS.CUSTOMER.UPDATE,
   ];

   export const GET = safeHandler(async () => {
     const data = await db
       .select({
         id: users.id,
         name: users.name,
         email: users.email,
       })
       .from(users);
     return NextResponse.json({ message: "Success Get Data User", data: data });
     // return 403 if doesn't have this permission
   }, ["something:permission"]);
   ```

4. Atur public route (opsional)

   Secara default, `middleware.ts` mengizinkan akses tanpa login ke:

   ```ts
   const publicRoutes = ["/", "/auth/register", "/auth/login"];
   ```

   Tambahkan path lain ke `publicRoutes` di `middleware.ts` jika dibutuhkan.

   ### Catatan Penting
   - File `lib/routes/permissions.ts` adalah hasil generate. Jangan edit manual.
   - Build production otomatis menjalankan generate: `pnpm build` → `pnpm permissions:generate` + `next build`.
   - Route dinamis seperti `/admin/users/[id]` akan di-match sebagai `/admin/users/:id` oleh middleware.
   - Jika user tidak punya izin:
     - Pada halaman/API yang dilindungi middleware: akan di-redirect ke `/auth/login`.
     - Dengan `safeHandler`: handler dapat mengembalikan `403` JSON secara eksplisit.
