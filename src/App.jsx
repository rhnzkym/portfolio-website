import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { AuthProvider } from './contexts/AuthContext'
import { DataProvider } from './contexts/DataContext'
import Loading from './components/Loading'
import ProtectedRoute from './components/admin/ProtectedRoute'
import PortfolioPage from './pages/PortfolioPage'
import AdminPage from './pages/AdminPage'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (!darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <AnimatePresence mode="wait">
            {isLoading && <Loading key="loading" />}
          </AnimatePresence>

          {!isLoading && (
            <Routes>
              <Route
                path="/"
                element={<PortfolioPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                  </ProtectedRoute>
                }
              />
            </Routes>
          )}
        </Router>
      </DataProvider>
    </AuthProvider>
  )
}

export default App
