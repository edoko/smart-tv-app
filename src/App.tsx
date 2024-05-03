import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { LOCALSTORAGE_API_KEY } from './features/shared/const'
import IndexPage from './pages'
import DetailPage from './pages/Detail'
import SplashPage from './pages/Splash'

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    function getToken() {
      const apiToken = localStorage.getItem(LOCALSTORAGE_API_KEY)
      if (!apiToken) {
        navigate('/')
      }
    }

    getToken()
    window.addEventListener('storage', () => getToken())

    return () => {
      window.removeEventListener('storage', () => getToken())
    }
  }, [navigate])

  return (
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="/main/*" element={<IndexPage />} />
      <Route path="/detail/:id" element={<DetailPage />} />
    </Routes>
  )
}

export default App
