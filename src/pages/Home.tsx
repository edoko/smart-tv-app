import useMappingController from '@/hooks/useMappingController'
import { useSideBarStore } from '@/stores/sideBarStore'
import { useEffect, useRef } from 'react'

const Home = () => {
  const { open, isOpenPage } = useSideBarStore()

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpenPage) {
      ref.current?.focus()
    }
  }, [isOpenPage])

  const handleMoveLeft = () => {
    open()
  }

  const handleKeyDown = useMappingController({
    left: handleMoveLeft,
  })

  return (
    <div
      ref={ref}
      className="flex h-full flex-col p-8"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      HomePage
    </div>
  )
}

export default Home
