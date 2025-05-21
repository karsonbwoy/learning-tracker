# 📚 Learning Tracker
Demo: https://learning-tracker-tawny.vercel.app

A simple web application to track your learning progress over time. Add, update, and remove tasks or resources, and stay organized as you grow your skills.

## 🚀 Features

- Add learning tasks (topics, books, videos, courses)
- Mark tasks as completed
- Edit or delete tasks
- Responsive and clean UI
- Reguister and login users
- Users have own tasks
- Backend API for storing tasks and users

## 🛠️ Tech Stack

### Frontend
- React + Vite
- Tailwind CSS

### Backend
- Node.js
- Express
- MongoDB (via Mongoose)

## 📂 Project Structure

```
learning-tracker/
│
├── backend/           # Express.js backend API
├── public/            # Static files
├── src/               # React frontend
│   ├── components/
│   ├── pages/
│   └── utils/
├── .env               # Environment variables
├── .eslintrc.cjs      # ESLint configuration
├── vite.config.js     # Vite configuration
└── vercel.json        # Deployment settings
```

## 🧪 Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/karsonbwoy/learning-tracker.git
cd learning-tracker
```

### 2. Install dependencies

```bash
npm install
cd backend
npm install
```

### 3. Set up `.env` files

Create `.env` files for both frontend and backend.

#### `backend/.env`:

```
MONGO_URI=your-mongodb-url
PORT=5000
JWT_SECRET=your-jwt-secret
NODE_ENV=production
CLIENT_URL=frontend-url
```

#### `frontend/.env` (optional):

```
VITE_API_URL=http://localhost:5000
```

### 4. Run the app

In the root project:

```bash
npm run dev
```

In `/backend`:

```bash
npm run dev
```

## 🔍 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

## 📄 License

[MIT](LICENSE)

---

Built with 💡 by [karsonbwoy](https://github.com/karsonbwoy)
