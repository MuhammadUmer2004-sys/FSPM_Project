# 🚀 Freelance-Flow: Software Project Management (SPM) Focused Bidding Platform

**Freelance-Flow** is a specialized freelance bidding platform built not just as a marketplace, but as a demonstration of core **Software Project Management (SPM)** principles. It bridges the gap between clients and developers by enforcing rigorous scoping, estimation, and work breakdown structures from the very first bid.

---

## 🌟 Key Features

### 🛡️ SPM "Marks Earner" Features
Designed to demonstrate deep understanding of software planning and management:
*   **W5HH Project Definition**: Task posting forms follow the **Why, What, When, Who, Where, How, and How much** principle to ensure business clarity.
*   **COCOMO-Lite Estimation Tool**: An integrated calculator that uses COCOMO logic to suggest realistic budgets based on feature complexity.
*   **Explicit Scope Boundaries**: Hard-coded sections for **"In-Scope"** vs. **"Out-of-Scope"** to prevent the #1 killer of software projects: **Scope Creep**.
*   **WBS Phased Bidding**: Developers submit bids broken down into **Work Breakdown Structure (WBS)** milestones (e.g., Design → Dev → Test).
*   **Audit Trail Logs**: Automated timestamping and logging of all project interactions for process integrity.

### 💻 Core Marketplace Functionality
*   **Role-Based Access Control (RBAC)**: Distinct dashboards and workflows for **Clients** (posters) and **Developers** (bidders).
*   **Real-Time Bidding Dashboard**: Clients can compare incoming bids side-by-side with milestone breakdowns.
*   **Milestone Tracking**: Visual progress indicators for project phases.
*   **Premium UI/UX**: State-of-the-art **Dark Mode & Glassmorphism** design.

---

## 🏗️ Technical Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React + Vite |
| **Backend** | Node.js + Express |
| **Database** | MongoDB (Atlas/Local) |
| **Styling** | Modern Vanilla CSS (Glassmorphism) |
| **Deployment** | Vercel |

---

## 📊 Project Planning & Architecture
This project was delivered in a strict **21-day sprint**. Below are the planning artifacts utilized:

### Work Breakdown Structure (WBS)
![WBS Diagram](assets/wbs_diagram.png)

### Activity on Node (AoN) Network Diagram
![AoN Diagram](assets/aon_diagram.png)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (Local instance or Atlas connection string)

### 1. Clone the Repository
```bash
git clone https://github.com/MuhammadUmer2004-sys/FSPM.git
cd FSPM
```

### 2. Backend Setup
```bash
cd backend
npm install
# Create a .env file based on .env.example
# Add your MONGODB_URI and PORT
npm start
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

---

## 📖 SPM Methodology Applied

### 1. Scope Management
Unlike traditional platforms that allow vague descriptions, **Freelance-Flow** forces the client to list "Excluded Features." This creates a legal and technical boundary that protects both parties from unplanned work.

### 2. Cost Estimation
The **COCOMO-Lite tool** provides a data-driven baseline for negotiations. Instead of "guessing" a price, clients use a complexity multiplier (Number of Features × Complexity) to see what a professional team would realistically charge.

### 3. Execution (WBS)
Every bid is a mini-project plan. By requiring developers to define milestones (Design, Development, QA), the platform ensures that the project is manageable and measurable from day one.

---

## 👥 Team
This project was developed for the **Fundamentals of Software Project Management (FSPM)** course.
- **Team Size**: 5 Members
- **Duration**: 3-Week Sprint

---

## 📄 License
This project is for educational purposes as part of a Software Project Management curriculum.
