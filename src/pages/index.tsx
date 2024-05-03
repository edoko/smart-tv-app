import SideBar from '@/features/shared/components/SideBar'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Programs from './Programs'

const IndexPage = () => {
  return (
    <div className="flex h-full w-full flex-row">
      <SideBar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/programs" element={<Programs />} />
      </Routes>
    </div>
  )
}

export default IndexPage
