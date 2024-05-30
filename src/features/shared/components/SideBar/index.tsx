import useMappingController from '@/hooks/useMappingController'
import { useSideBarStore } from '@/stores/sideBarStore'
import getOS from '@/utils/getOS'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const list = [
  {
    id: 0,
    name: '내 보관함',
    path: '/main/home',
    icon: 'Icon_myplaylists',
  },
  {
    id: 1,
    name: '설정',
    path: '/main/programs',
    icon: 'Icon_setting',
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
      className="flex h-full flex-col items-center justify-center px-[80px]"
      style={{
        minWidth: 0,
      }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {list.map((item, i) => (
        <div key={item.id} className="flex cursor-pointer p-5">
          {isOpenSideBar && (
            <div
              className={clsx(
                'flex w-[400px] flex-row items-center justify-start p-6',
                i === index
                  ? 'rounded-2xl border-[1px] border-solid border-[#EBEBEB] bg-[#303030]'
                  : '',
              )}
            >
              <img
                src={`/src/assets/icons/${item.icon}.svg`}
                alt={item.name}
                className="mr-6 size-[56px]"
              />
              <span className="text-2xl font-bold">{item.name}</span>
            </div>
          )}
          {!isOpenSideBar && (
            <div
              className={clsx(
                'flex size-[96px] items-center justify-center',
                i === index ? 'rounded-2xl bg-[#303030]' : '',
              )}
            >
              <img
                src={`/src/assets/icons/${item.icon}.svg`}
                alt={item.name}
                className="size-[56px]"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default SideBar
