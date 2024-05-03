import useMappingController from '@/hooks/useMappingController'
import { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const DetailPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const ref = useRef<HTMLDivElement>(null)

  const handleBack = () => {
    navigate(-1)
  }

  const handleKeyDown = useMappingController({
    back: handleBack,
  })

  useEffect(() => {
    ref.current?.focus()
  }, [])

  return (
    <div ref={ref} tabIndex={0} onKeyDown={handleKeyDown}>
      <div>
        <h1>Detail Page {id}</h1>
      </div>
    </div>
  )
}

export default DetailPage
