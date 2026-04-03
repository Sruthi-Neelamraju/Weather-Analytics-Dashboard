import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Home from './pages/Home'
import CityPage from './pages/CityPage'
import Login from './components/Login'
import { RootState } from './store/store'
import './App.css'

function App() {
  const { user, loading } = useAuth()
  const theme = useSelector((state: RootState) => state.settings.theme)

  useEffect(() => {
    document.body.classList.toggle('dark-theme', theme === 'dark')
    document.body.classList.toggle('light-theme', theme === 'light')
  }, [theme])

  // Temporary: bypass authentication when Firebase is not configured
  

  if (loading) {
    return (
      <div className="App">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          Loading...
        </div>
      </div>
    )
  }

  if (!user) {
    return <Login />
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/city/:cityName" element={<CityPage />} />
      </Routes>
    </div>
  )
}

export default App