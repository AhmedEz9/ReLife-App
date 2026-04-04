# 🌍 ReLife - Circular Economy Platform

ReLife is a full-stack web application designed to promote sustainable development and the circular economy. This platform allows users to recycle, share, and find second-hand items within their community, reducing waste and giving items a "re-life."

This project was built to fulfill the core requirements of a Multi Platform Project course, demonstrating user authentication, database management, and file handling.

## ✨ Current Features (v1)

- **User Authentication:** Secure registration and login system.
- **Media Upload:** Users can upload images of items they want to share or recycle.
- **Database Integration:** Relational database setup to link uploaded items to specific users.
- **Community Feed:** A dynamic, responsive UI where users can browse all uploaded items.

## 🛠️ Tech Stack

**Frontend:**

- React.js (Single Page Application)
- Tailwind CSS (Styling & Responsive UI)
- React Router (Navigation)

**Backend:**

- Node.js & Express.js (REST API)
- Multer (File System Uploads)

**Database:**

- PostgreSQL (Hosted via Neon)
- Prisma (ORM)

## 🚀 How to Run Locally

### 1. Clone the repository

\`\`\`bash
git clone https://github.com/YOUR-USERNAME/ReLife-App.git
cd ReLife-App
\`\`\`

### 2. Setup the Backend

\`\`\`bash
cd backend
npm install
\`\`\`
_Create a `.env` file in the backend folder and add your Neon Database URL:_
\`\`\`env
DATABASE_URL="postgresql://username:password@your-neon-host.neon.tech/neondb?sslmode=require"
PORT=5000
\`\`\`
_Initialize the database:_
\`\`\`bash
npx prisma migrate dev
\`\`\`
_Start the backend server:_
\`\`\`bash
npm run dev
\`\`\`

### 3. Setup the Frontend

Open a new terminal window:
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`
_The app will be running at `http://localhost:5173`._

---

_Developed for the Multi Platform Project._
