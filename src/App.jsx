import './App.css'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthProvider from './AuthContext'
import UserPanel from './pages/UserPanel'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App" style={{ backgroundColor: '#eeeeee', minHeight: '100vh' }}>
          <div className="bg-blue-500 text-white p-4 text-center">
            <h1 className="text-3xl font-bold">Zarządzanie zadaniami</h1>
            <p className="text-lg">Aplikacja do zarządzania zadaniami</p>
          </div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/user" element={<UserPanel />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
