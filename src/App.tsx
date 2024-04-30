import { Route, Routes } from 'react-router-dom'
import SideBar from './features/shared/components/SideBar'
import Main from './pages/Main'

function App() {
  return (
    <div className="flex h-full w-full flex-row">
      <SideBar />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </div>
  )
}

export default App
