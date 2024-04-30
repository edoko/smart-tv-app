import useMappingController from '@/hooks/useMappingController'
import { useSideBarStore } from '@/stores/sideBarStore'
import { useEffect, useRef, useState } from 'react'

const list = [
  {
    id: 0,
    name: 'Home',
  },
  {
    id: 1,
    name: 'Programs',
  },
  {
    id: 2,
    name: 'Contact',
  },
]

const SideBar = () => {
  const { isOpenSideBar, selectMenu, close } = useSideBarStore()

  const ref = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)

  const handleMoveRight = () => {
    close()
  }

  const handleMoveUp = () => {
    setIndex((prev) => Math.max(0, prev - 1))
  }

  const handleMoveDown = () => {
    setIndex((prev) => Math.min(list.length - 1, prev + 1))
  }

  const handleKeyDown = useMappingController({
    right: handleMoveRight,
    up: handleMoveUp,
    down: handleMoveDown,
  })

  useEffect(() => {
    if (isOpenSideBar) {
      ref.current?.focus()
    }
  }, [isOpenSideBar])

  return (
    <div
      ref={ref}
      className="mt-12 flex h-full flex-col p-12"
      style={{
        width: isOpenSideBar ? '350px' : '200px',
      }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {list.map((item, i) => (
        <div
          key={item.id}
          className="mb-12 cursor-pointer p-4 text-4xl last-of-type:mb-0"
          style={{
            color: i === index ? 'white' : 'gray',
          }}
          onKeyDown={() => selectMenu(item.id)}
        >
          {item.name}
        </div>
      ))}
    </div>
  )
}

export default SideBar
