import { LOCALSTORAGE_API_KEY } from '@/features/shared/const'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SplashPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const apiToken = localStorage.getItem(LOCALSTORAGE_API_KEY)
    let timeout: NodeJS.Timeout
    if (apiToken) {
      timeout = setTimeout(() => {
        navigate('/main')
      }, 2000)
    } else {
      localStorage.setItem(LOCALSTORAGE_API_KEY, import.meta.env.VITE_API_KEY)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [navigate])

  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center">
      <h1 className="mb-4 text-3xl font-bold">SplashPage</h1>
      <span>Loading ...</span>
    </div>
  )
}

export default SplashPage
