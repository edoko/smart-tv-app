import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/Main'

function App() {
  return (
    <div className="flex h-full w-full overflow-x-hidden">
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </div>
  )
}

export default App
