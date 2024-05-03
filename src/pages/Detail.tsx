import client from '@/apis/client'
import useMappingController from '@/hooks/useMappingController'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Video } from './Programs'

const DetailPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [data, setData] = useState<Video>()

  const ref = useRef<HTMLDivElement>(null)

  const handleBack = () => {
    navigate(-1)
  }

  const handleKeyDown = useMappingController({
    back: handleBack,
    enter: () => {
      alert('TODO: 재생 기능 구현')
    },
  })

  useEffect(() => {
    ref.current?.focus()
  }, [])

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await client.get(`/videos/${id}`)
        setData(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [id])

  return (
    <div
      ref={ref}
      className="flex flex-col p-8"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {!data && <div>Loading...</div>}
      {data && (
        <div className="flex flex-col">
          <img
            className="mb-4"
            src={data.poster}
            alt={data.title}
            width="50%"
          />
          <h1 className="text-4xl font-bold">{data.title}</h1>
          <span className="mb-8">{data.description}</span>
          <button
            type="button"
            className="h-[50px] w-[120px] rounded-xl border-2 border-sky-100 text-xl font-bold text-sky-100"
          >
            재생
          </button>
        </div>
      )}
    </div>
  )
}

export default DetailPage
