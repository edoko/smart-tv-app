import useMappingController from '@/hooks/useMappingController'
import { useSideBarStore } from '@/stores/sideBarStore'
import { useEffect, useRef } from 'react'

const Programs = () => {
  const { open, isOpenPage } = useSideBarStore()

  const ref = useRef<HTMLDivElement>(null)

  const handleKeyDown = useMappingController({
    left: () => open(),
  })

  useEffect(() => {
    if (isOpenPage) {
      ref.current?.focus()
    }
  }, [isOpenPage])

  return (
    <div
      ref={ref}
      className="flex h-full flex-col overflow-x-auto p-8"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="flex flex-col p-8">
        <div className="flex flex-row">
          <div className="flex flex-col">
            <div className="text-3xl font-bold">Programs</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Programs
