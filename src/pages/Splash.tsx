import { LOCALSTORAGE_API_KEY } from '@/features/shared/const'
import setToken from '@/utils/setToken'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SplashPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timeout: NodeJS.Timeout = setTimeout(() => {
      navigate('/main/home')
    }, 2000)

    const apiToken = localStorage.getItem(LOCALSTORAGE_API_KEY)
    if (apiToken) {
      setToken(apiToken)
      timeout
    } else {
      setToken(import.meta.env.VITE_API_KEY)
      localStorage.setItem(LOCALSTORAGE_API_KEY, import.meta.env.VITE_API_KEY)
      timeout
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
