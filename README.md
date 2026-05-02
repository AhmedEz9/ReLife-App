# 🌍 ReLife - Circular Economy Platform

ReLife is a full-stack web application designed to promote sustainable development and the circular economy. This platform allows users to recycle, share, and find second-hand items within their community, reducing waste and giving items a "re-life."

This project was built to fulfill the core requirements of the Multi Platform Project course (TX00EY70), demonstrating user authentication, database management, file handling, and comprehensive software testing.

## 🔗 Live Links & Access

- **Live Frontend (Vercel):** [https://re-life-app.vercel.app](https://re-life-app.vercel.app)
- **Live API (Render):** [https://relife-backend.onrender.com](https://relife-backend.onrender.com)
- **API Documentation:** [ReLife API Postman Collection](https://github.com/AhmedEz9/ReLife-App/blob/main/docs/Relife.postman_collection.json)

**Login Details:**
To test the core features of the app without registering a new account, please use these test credentials:

- **Email:** test@example.com
- **Password:** mypassword123

## ✨ Features Implemented

- **User Authentication:** Secure registration and login system using JWT.
- **Media Upload:** Users can upload images of items to share. Images are securely hosted on Cloudinary rather than the local file system.
- **Item Browsing & Search:** A dynamic, responsive UI where users can browse all uploaded items and filter them using a search bar.
- **Status Updates:** Users can edit their items and mark them as "Claimed" when someone picks them up.
- **Responsive Design:** Mobile-first UI using Tailwind CSS.

## 📸 Interface Screenshots

<img src="./assets/login-page.png" width="500" alt="Login Page">
<br><br>
<img src="./assets/feed-page.png" width="500" alt="Feed & Search View">
<br><br>
<img src="./assets/upload-page.png" width="500" alt="Upload Item View">

## 🗄️ Database Architecture

The application uses a PostgreSQL relational database managed by Prisma ORM.

**Core Models:**

- `User`: Stores user credentials (hashed passwords) and profile data.
- `Post`: Stores the item details (title, description, category, status) and the Cloudinary image URL. Forms a one-to-many relationship with the `User` table.

```mermaid
erDiagram
    User ||--o{ Post : "uploads"
    User {
        Int id PK
        String email UK
        String username
        String password
        DateTime createdAt
    }
    Post {
        Int id PK
        String title
        String description
        String imageUrl
        String category
        String status
        DateTime createdAt
        Int userId FK
    }
```

## 🧪 Software Testing

Testing was a major focus of this development cycle to ensure stability. The test files are located in the respective `/tests` folders in both the frontend and backend directories.

- **Unit Testing (Jest):** Tested backend logic (e.g., email validation).
- **Component Testing (React Testing Library):** Verified that UI elements render correctly on the screen.
- **API Integration (Postman/Thunder Client):** Ensured the frontend forms communicate properly with the PostgreSQL database.
- **E2E Testing (Playwright):** Simulated a real user logging in and navigating the app.

<img src="./assets/test2.png" width="500" alt="Backend Unit Testing">
<br><br>
<img src="./assets/test3.png" width="500" alt="Frontend Component Testing">
<br><br>
<img src="./assets/test5.png" width="500" alt="E2E Playwright Pass">
<br><br>
<img src="./assets/test4.png" width="500" alt="API Integration Pass">

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS, React Router, Vite.
- **Backend:** Node.js, Express.js.
- **Database & Storage:** PostgreSQL (Neon), Prisma ORM, Cloudinary.
- **Testing:** Jest, Vitest, React Testing Library, Playwright.

## 🐛 Known Bugs & Limitations

- No major breaking bugs are known at this time.
- The links and buttons located in the website's footer are placeholders for visual purposes only and do not currently lead to active pages.

## 📚 References & Resources

- Course materials.
- Tailwind CSS Documentation
- Prisma ORM Documentation
- Cloudinary Node.js Upload Integration Guide

---

## 🚀 How to Run Locally

### 1. Clone the repository

```bash
git clone [https://https://github.com/AhmedEz9/ReLife-App.git](https://github.com/AhmedEz9/ReLife-App.git)
cd ReLife-App
```

### 2. Setup the Backend

```bash
cd backend
npm install
```

_Create a `.env` file in the backend folder and add your environment variables:_

```env
PORT=5000
DATABASE_URL="postgresql://username:password@your-neon-host.neon.tech/neondb?sslmode=require"
JWT_SECRET="your_secret_key"
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

_Initialize the database and start the server:_

```bash
npx prisma migrate dev
npm run dev
```

### 3. Setup the Frontend

Open a new terminal window:

```bash
cd frontend
npm install
npm run dev
```

_The app will be running at `http://localhost:5173`._

To view the database data:
Run `bash npm run studio ` in the backend folder. This will open a GUI in your browser at http://localhost:5555.
