import SideBar from '@/features/shared/components/SideBar'
import { LOCALSTORAGE_API_KEY } from '@/features/shared/const'
import setToken from '@/utils/setToken'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Programs from './Programs'

const IndexPage = () => {
  useEffect(() => {
    const apiToken = localStorage.getItem(LOCALSTORAGE_API_KEY)
    if (apiToken) {
      setToken(apiToken)
    }
  }, [])

  return (
    <div className="flex h-full w-full flex-1 flex-row">
      <SideBar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/programs" element={<Programs />} />
      </Routes>
    </div>
  )
}

export default IndexPage
