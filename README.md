# 🧭 Responsive Admin Dashboard (React + TypeScript + Tailwind)

A fully responsive **Admin Dashboard Web App** built with **React (TypeScript)** and **Tailwind CSS**.  
It demonstrates strong skills in component architecture, UI/UX, API handling, state management, testing, and performance.

---

## 🚀 Overview

This dashboard consumes live data from the **JSONPlaceholder Public API** and provides:
- A **Sidebar** for navigation  
- A **Top Navbar** with profile avatar & dark mode toggle  
- A **Dashboard Summary** with dynamic statistics  
- A **Users Table** with pagination, search, and skeleton loader  
- Full **Dark Mode Support**  
- Responsive layout for all screen sizes  

---

## 🧩 Features

### 🎨 UI & Components
- Sidebar with links: *Dashboard, Users, Reports*
- Navbar with profile avatar (from [Liara Avatar API](https://avatar.iran.liara.run/public))
- Responsive grid layout
- Modern Tailwind styling with dark mode toggle

### 📊 Data Features
- Fetches data from:  
  `https://jsonplaceholder.typicode.com/users`
- Displays:
  - Total Users  
  - Active Users  
  - Unique Domains  
  - Total Websites  

### 🧠 Functionality
- Search/filter in Users table  
- Pagination  
- Skeleton loader during API fetch  
- Error handling & empty states  


## ⚙️ Tech Stack

| Category | Technologies Used |
|-----------|-------------------|
| **Framework** | React (TypeScript) |
| **UI Styling** | Tailwind CSS |
| **State Management** | React Hooks (useState, useEffect) |
| **Testing** | Jest + React Testing Library |
| **Build Tool** | Vite |
| **HTTP Client** | Axios |
| **Icons** | React Icons |

---

## 🧰 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone [text](https://github.com/amardeep-SDE/MiraiEdge)
cd responsive-dashboard

2️⃣ Install dependencies
npm install

3️⃣ Run the project
npm run dev

Then open in browser:
👉 http://localhost:5173

🌙 Dark Mode Support

A ThemeToggle component lets users switch between Light and Dark mode.
The theme preference is saved in localStorage so it persists across reloads.

🔍 Testing (Jest + React Testing Library)
✅ Run all tests
npm test

📈 Generate coverage report
npm run test -- --coverage


Test Highlights:

Dashboard: verifies summary cards render after API success

Users: verifies skeleton loader, API data display, search filter, and error handling

🧩 Task Summary: Responsive Admin Dashboard (React + TypeScript + Tailwind)

You already have:
✅ Working layout (Sidebar + Navbar + MainLayout)
✅ Dashboard (summary + charts)
✅ Users (table + pagination + search + skeleton)
✅ Dark mode toggle
✅ Unit test (Dashboard)
✅ Clean structure & good code quality


🚀 Production Build
npm run build

🌍 Deploying to GitHub Pages

MiraiEdge uses HashRouter + gh-pages for reliable GitHub Pages deployment.

1️⃣ Install gh-pages
npm install --save-dev gh-pages

2️⃣ Add Scripts in package.json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}

3️⃣ Set Vite Base Path (vite.config.ts)
export default defineConfig({
  plugins: [react()],
  base: "/MiraiEdge/",  
});

4️⃣ Build + Deploy
npm run deploy

5️⃣ Enable GitHub Pages

Go to:
Settings → Pages → Deploy from Branch → gh-pages

Your project will be live at:

👉 https://amardeep-sde.github.io/MiraiEdge/


🤝 Contributing

Pull requests are welcome! For major changes, open an issue first.

📜 License

MIT License © 2025 Amardeep

🧑‍💻 Author

Amardeep Dwivedi
MERN Developer | React Specialist
Indore, Madhya Pradesh