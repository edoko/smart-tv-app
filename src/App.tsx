import { Route, Routes } from 'react-router-dom'
import IndexPage from './pages'
import DetailPage from './pages/Detail'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/main/*" element={<IndexPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </div>
  )
}

export default App
