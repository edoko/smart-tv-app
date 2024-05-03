import mockList from '@/const/mock'
import Item from '@/features/Videos/components/Item'
import useMappingController from '@/hooks/useMappingController'
import { useSideBarStore } from '@/stores/sideBarStore'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { throttle } from 'throttle-debounce'

const Home = () => {
  const { open, isOpenPage } = useSideBarStore()
  const navigate = useNavigate()

  const [list] = useState(mockList)
  const [listIndex, setListIndex] = useState(0)
  const [itemIndex, setItemIndex] = useState(0)

  const ref = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<HTMLDivElement[][]>(
    Array.from({ length: list.length }, () => []),
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

  useEffect(() => {
    itemRefs.current[listIndex][itemIndex]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
    })
  }, [itemIndex, listIndex])
  useEffect(() => {
    if (isOpenPage) {
      ref.current?.focus()
    }
  }, [isOpenPage])

  const handleMoveLeft = () => {
    if (itemIndex === 0) {
      open()
      return
    }

    throttleFunc(itemIndex - 1)
  }
  const handleMoveRight = () => {
    if (itemIndex === list[listIndex].list.length - 1) return

    throttleFunc(itemIndex + 1)
  }
  const handleMoveUp = () => {
    if (listIndex === 0) return
    setListIndex(listIndex - 1)
    setItemIndex(0) // 목록을 이동할 때 아이템 인덱스를 초기화
  }
  const handleMoveDown = () => {
    if (listIndex === list.length - 1) return
    setListIndex(listIndex + 1)
    setItemIndex(0) // 목록을 이동할 때 아이템 인덱스를 초기화
  }
  const handleEnter = () => {
    const itemId =
      itemRefs.current[listIndex][itemIndex].getAttribute('data-id')
    console.log('enter', itemId)
    navigate(`/detail/${itemId}`)
  }

  const handleKeyDown = useMappingController({
    left: handleMoveLeft,
    right: handleMoveRight,
    up: handleMoveUp,
    down: handleMoveDown,
    enter: handleEnter,
  })

  return (
    <div
      ref={ref}
      className="flex h-full flex-col overflow-x-auto p-8"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* 목록 */}
      <div className="flex flex-col p-8">
        {list.map((item, idx) => (
          <div key={item.id} className="mb-8">
            <h2 className="text-lg font-bold">{item.title}</h2>
            <div className="scrollbar-hide flex flex-row flex-nowrap overflow-x-scroll">
              {item.list.map((data, i) => {
                return (
                  <Item
                    key={data.id}
                    ref={(el) => {
                      if (el) itemRefs.current[idx][i] = el
                    }}
                    data={data}
                    selected={listIndex === idx && itemIndex === i}
                  />
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
