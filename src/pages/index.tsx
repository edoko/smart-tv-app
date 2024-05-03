import SideBar from '@/features/shared/components/SideBar'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'

const IndexPage = () => {
  return (
    <div className="flex h-full w-full flex-row">
      <SideBar />
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  )
}

export default IndexPage
