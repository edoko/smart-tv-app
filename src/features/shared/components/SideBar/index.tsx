import useMappingController from '@/hooks/useMappingController'
import { useSideBarStore } from '@/stores/sideBarStore'
import getOS from '@/utils/getOS'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const list = [
  {
    id: 0,
    name: 'Home',
    path: '/main/home',
  },
  {
    id: 1,
    name: 'Programs',
    path: '/main/programs',
  },
]

const SideBar = () => {
  const { isOpenSideBar, selectedId, selectMenu, close } = useSideBarStore()
  const navigate = useNavigate()

  const ref = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(selectedId)

  const handleMoveRight = () => {
    close()
  }
  const handleMoveUp = () => {
    setIndex((prev) => Math.max(0, prev - 1))
  }
  const handleMoveDown = () => {
    setIndex((prev) => Math.min(list.length - 1, prev + 1))
  }
  const handleMoveBack = () => {
    if (getOS() === 'webOS') {
      ;(window as any).webOSSystem.platformBack()
    } else if (getOS() === 'tizen') {
      // TODO
    }
  }

  const handleKeyDown = useMappingController({
    right: handleMoveRight,
    up: handleMoveUp,
    down: handleMoveDown,
    enter: () => navigate(`${list[index].path}`),
    back: handleMoveBack,
  })

  useEffect(() => {
    if (isOpenSideBar) {
      ref.current?.focus()
    }
  }, [isOpenSideBar])

  useEffect(() => {
    const selected = list[index]
    if (selectedId !== selected.id) {
      selectMenu(selected.id)
      navigate(selected.path)
    }
  }, [index, navigate, selectMenu, selectedId])

  return (
    <div
      ref={ref}
      className="flex h-full flex-col p-12"
      style={{
        width: isOpenSideBar ? '20vw' : '10vw',
        minWidth: 0,
      }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {list.map((item, i) => (
        <div
          key={item.id}
          className="mb-12 cursor-pointer p-4 text-center text-4xl last-of-type:mb-0"
          style={{
            color: i === index ? 'white' : 'gray',
          }}
        >
          {isOpenSideBar ? item.name : item.name.slice(0, 1)}
        </div>
      ))}
    </div>
  )
}

export default SideBar
