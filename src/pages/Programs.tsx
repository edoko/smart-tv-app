import client from '@/apis/client'
import Item from '@/features/Videos/components/Item'
import useMappingController from '@/hooks/useMappingController'
import { useSideBarStore } from '@/stores/sideBarStore'
import getOS from '@/utils/getOS'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { throttle } from 'throttle-debounce'

export interface Video {
  id: string
  playback_id: string
  video_id: string
  slug: string
  objectID: string
  state: string
  created_at: string
  updated_at: string
  title: string
  description: string
  poster: string
  thumbnail: string
  is_vertical: boolean
  tags: string[]
  downloads: number
  views: number
  published_at: string
  aspect_ratio: string
  duration: number
  max_height: number
  max_width: number
  urls?: {
    mp4: string
    mp4_preview: string
    mp4_download: string
  }
}
interface VideosResponse {
  page: number
  pages: number
  pageSize: number
  total: number
  hits: Video[]
}

const Programs = () => {
  const { open, isOpenPage } = useSideBarStore()
  const navigate = useNavigate()

  const [list, setList] = useState<Video[]>([])
  const [itemIndex, setItemIndex] = useState(0)

  const ref = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<HTMLDivElement[]>(Array.from({ length: list.length }))

  const throttleFunc = useMemo(
    () =>
      throttle(100, (index) => {
        setItemIndex(index)
        itemRefs.current[itemIndex]?.scrollIntoView({
          behavior: 'smooth',
          inline: 'start',
        })
      }),
    [itemIndex],
  )

  const fetchRecommendedProgramList = async () => {
    try {
      const { data } = await client.get<VideosResponse>('/videos', {
        params: {
          page: 0,
          page_size: 10,
        },
      })
      setList(data.hits)
    } catch (error) {
      console.error(error)
    }
  }

  const handleMoveLeft = () => {
    if (itemIndex === 0) {
      open()
      return
    }

    throttleFunc(itemIndex - 1)
  }
  const handleMoveRight = () => {
    if (itemIndex === list.length - 1) return

    throttleFunc(itemIndex + 1)
  }
  const handleEnter = () => {
    const itemId = itemRefs.current[itemIndex]?.getAttribute('data-id')
    navigate(`/detail/${itemId}`)
  }

  const handleKeyDown = useMappingController({
    left: handleMoveLeft,
    right: handleMoveRight,
    enter: handleEnter,
    back: () => {
      if (getOS() === 'webOS') {
        ;(window as any).webOSSystem.platformBack()
      } else if (getOS() === 'tizen') {
        // TODO
      }
    },
  })

  useEffect(() => {
    itemRefs.current[itemIndex]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
    })
  }, [itemIndex])

  useEffect(() => {
    if (isOpenPage) {
      ref.current?.focus()
    }
  }, [isOpenPage])

  useEffect(() => {
    fetchRecommendedProgramList()
  }, [])

  return (
    <div
      ref={ref}
      className="flex h-full flex-col overflow-x-auto p-8"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* 목록 */}
      <div className="scrollbar-hide flex flex-row flex-nowrap overflow-x-scroll p-8">
        {list.map((item, idx) => (
          <div key={item.id} data-id={item.id}>
            <Item
              ref={(el) => {
                if (el) itemRefs.current[idx] = el
              }}
              data={item}
              selected={itemIndex === idx}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Programs
