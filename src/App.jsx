import './App.css'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <div className="App" style={{ backgroundColor: '#eeeeee', minHeight: '100vh' }}>
        <div className="bg-blue-500 text-white p-4 text-center mb-10 ">
          <h1 className="text-3xl font-bold">Zarządzanie zadaniami</h1>
          <p className="text-lg">Aplikacja do zarządzania zadaniami</p>
        </div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
