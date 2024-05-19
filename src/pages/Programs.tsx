import client from '@/apis/client'
import Item from '@/features/Videos/components/Item'
import useMappingController from '@/hooks/useMappingController'
import { useSideBarStore } from '@/stores/sideBarStore'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useMemo, useRef, useState } from 'react'
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
interface NormalizedVideo {
  id: number
  name: string
  list: Video[]
}

const Programs = () => {
  const { open, isOpenPage } = useSideBarStore()
  const navigate = useNavigate()

  const [listIndex, setListIndex] = useState(0)
  const [itemIndex, setItemIndex] = useState(0)

  const { data: list, isPending } = useQuery<NormalizedVideo[]>({
    queryKey: ['videos'],
    queryFn: async () => {
      const { data } = await client.get<VideosResponse>('/videos', {
        params: {
          page: 0,
          page_size: 10,
          sort_by: 'popularity',
        },
      })
      const { data: data2 } = await client.get<VideosResponse>('/videos', {
        params: {
          page: 0,
          page_size: 10,
          sort_by: 'date',
        },
      })

      return [
        {
          id: 1,
          name: 'Popularity',
          list: data.hits,
        },
        {
          id: 2,
          name: 'Date',
          list: data2.hits,
        },
      ]
    },
  })

  const ref = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<HTMLDivElement[][]>(
    Array.from({ length: 20 }, () => []),
  )

  const throttleFunc = useMemo(
    () =>
      throttle(100, (index) => {
        setItemIndex(index)
        itemRefs.current[listIndex][index]?.scrollIntoView({
          behavior: 'smooth',
          inline: 'start',
        })
      }),
    [listIndex],
  )

  const handleMoveLeft = () => {
    if (itemIndex === 0) {
      open()
      return
    }

    throttleFunc(itemIndex - 1)
  }
  const handleMoveRight = () => {
    if (!list) return
    if (itemIndex === list[listIndex].list.length - 1) return

    throttleFunc(itemIndex + 1)
  }
  const handleMoveUp = () => {
    if (listIndex === 0) return

    setListIndex(listIndex - 1)
    setItemIndex(0)
  }

  const handleMoveDown = () => {
    if (!list) return
    if (listIndex === list.length - 1) return

    setListIndex(listIndex + 1)
    setItemIndex(0)
  }
  const handleEnter = () => {
    const itemId =
      itemRefs.current[listIndex][itemIndex]?.getAttribute('data-id')
    navigate(`/detail/${itemId}`)
  }
  const handleMoveBack = () => {
    open()
  }

  const handleKeyDown = useMappingController({
    left: handleMoveLeft,
    right: handleMoveRight,
    up: handleMoveUp,
    down: handleMoveDown,
    enter: handleEnter,
    back: handleMoveBack,
  })

  useEffect(() => {
    if (!isPending) {
      itemRefs.current[listIndex][itemIndex]?.scrollIntoView({
        behavior: 'smooth',
        inline: 'start',
      })
    }
  }, [itemIndex, isPending, listIndex])

  useEffect(() => {
    if (isOpenPage) {
      ref.current?.focus()
    }
  }, [isOpenPage])

  return (
    <div
      ref={ref}
      className="flex h-full flex-1 flex-col overflow-x-auto p-8"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* 목록 */}
      {!isPending &&
        list?.map((item, idx) => (
          <React.Fragment key={item.id}>
            <h2 className="text-4xl">Sort by: {item.name}</h2>
            <div className="scrollbar-hide flex flex-row flex-nowrap overflow-x-scroll p-8">
              {item.list.map((video, i) => (
                <Item
                  key={video.id}
                  data-id={video.id}
                  ref={(el) => {
                    if (el) itemRefs.current[idx][i] = el
                  }}
                  data={video}
                  selected={listIndex === idx && itemIndex === i}
                />
              ))}
            </div>
          </React.Fragment>
        ))}
    </div>
  )
}

export default Programs
