# School App - Next.js + MySQL Assignment

## What this contains
- Next.js (Pages API) app with:
  - `pages/addSchool.jsx` — form (react-hook-form) to add schools + image upload
  - `pages/showSchools.jsx` — grid listing of schools
  - `pages/api/schools/index.js` — API route to insert & list schools (uses multer for uploads)
  - `lib/db.js` — mysql2 pool helper
  - `public/schoolImages/` — folder where uploaded images are stored (created at runtime)

## Setup (local)
1. Ensure Node 18+ and MySQL are installed.
2. Create database & table (run these in your MySQL client):

```sql
CREATE DATABASE IF NOT EXISTS schooldb;
USE schooldb;
CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  contact VARCHAR(30) NOT NULL,
  image TEXT,
  email_id VARCHAR(255) NOT NULL
);
```

3. Copy files locally, run:
```
npm install
```
4. Create `.env.local` (see `.env.example`) and provide DB credentials.
5. Run:
```
npm run dev
```
6. Open:
- Add school: http://localhost:3000/addSchool
- Show schools: http://localhost:3000/showSchools

## Notes about hosting
- Vercel's filesystem is ephemeral; uploaded files won't persist. Use a cloud storage (Cloudinary/S3) for production.
- If you want Cloudinary integration, I can provide a version that uploads images to Cloudinary and stores the URL.
