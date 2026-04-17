# 🚀 Freelance-Flow Deployment Guide

This guide provides step-by-step instructions to deploy your full-stack bidding platform for your project defense.

---

## 🏗️ Deployment Strategy: The "Monorepo" Approach
Since you have a **React (Vite)** frontend and a **Node/Express** backend, the easiest way to deploy is using **Render.com** or **Railway.app**.

### Option A: Render.com (Recommended for Students)

#### 1. Prepare your Repository
Make sure your project is pushed to a **GitHub** repository. Ensure your `.gitignore` includes `node_modules` and `.env`.

#### 2. Deploy the Backend (Web Service)
1.  Log in to [Render.com](https://render.com) and click **New > Web Service**.
2.  Connect your GitHub repo.
3.  **Root Directory:** `backend`
4.  **Build Command:** `npm install`
5.  **Start Command:** `node server.js`
6.  **Environment Variables:**
    - `PORT`: `10000` (Render's default)
    - `MONGODB_URI`: *Your MongoDB Atlas connection string*
    - `NODE_ENV`: `production`

#### 3. Deploy the Frontend (Static Site)
1.  Click **New > Static Site**.
2.  Connect the same GitHub repo.
3.  **Root Directory:** `frontend`
4.  **Build Command:** `npm run build`
5.  **Publish Directory:** `dist`
6.  **Environment Variables:**
    - `VITE_API_URL`: *The URL of your deployed backend* (e.g., `https://your-app-backend.onrender.com`)

---

## 📦 Database Selection: MongoDB Atlas
1.  Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2.  Go to **Database Access** and create a user.
3.  Go to **Network Access** and select "Allow Access from Anywhere" (0.0.0.0/0).
4.  Click **Connect > Drivers** to get your connection string.

---

## ✅ Deployment Checklist (Smoke Test)
Once deployed, verify the following:
- [ ] Does the Landing Page load?
- [ ] Can you log in as a Client and post a task?
- [ ] Can you log in as a Developer and see that task?
- [ ] Do the CORS settings allow your frontend to talk to your backend?

> [!TIP]
> **CORS Handling:** In your `backend/server.js`, ensure you have enabled CORS to allow requests from your frontend's domain:
> ```javascript
> const cors = require('cors');
> app.use(cors({ origin: 'https://your-frontend-app.onrender.com' }));
> ```

---

## 🛠️ Local Production Test
Before pushing to GitHub, you can test a production build locally:
1.  Inside `frontend`, run: `npm run build`
2.  Then run: `npx serve -s dist`
3.  This mimics how the app will behave on a live server.
