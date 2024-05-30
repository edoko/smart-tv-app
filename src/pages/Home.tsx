import useMappingController from '@/hooks/useMappingController'
import { useSideBarStore } from '@/stores/sideBarStore'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import ImagePlayButton from '/assets/imgs/button_play.png'

const mockList = [
  {
    id: 0,
    name: '좋아요한 운동',
  },
  {
    id: 1,
    name: '근력 + 유산소 루틴',
  },
  {
    id: 2,
    name: '나를 위한 산후 회복 루틴 🫧',
  },
  {
    id: 3,
    name: '빡세게 운동하고 싶을 때, 딱이거다🔥',
  },
]

const Home = () => {
  const { open, close, isOpenPage } = useSideBarStore()
  const [playListIndex] = useState(0)

  const playListRef = useRef<HTMLDivElement[]>([])
  const detailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpenPage) {
      playListRef.current[0].focus()
    }
  }, [isOpenPage])

  const handleMoveLeft = () => {
    open()
  }
  const handleMoveBack = () => {
    open()
  }

  const handleKeyDown = useMappingController({
    left: handleMoveLeft,
    back: handleMoveBack,
  })

  return (
    <div
      className="items-stast flex h-full flex-row justify-start"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* 내 보관함 리스트 */}
      <div className="mr-[60px] flex h-full w-[488px] flex-col items-start justify-start">
        <h2 className="mb-12 px-5 text-[48px] font-bold leading-[150%] text-[#EBEBEB]">
          내 보관함
        </h2>
        {mockList.map((item, i) => {
          return (
            <div
              key={item.id}
              ref={(el) => {
                if (el) playListRef.current[i] = el
              }}
              className={clsx(
                'mb-2 flex flex-row items-center justify-start p-5',
                playListIndex === i &&
                  'w-full rounded-2xl border-[1px] border-solid border-[#EBEBEB] bg-[#303030]',
              )}
            >
              <div className="mr-6 size-[80px] rounded-lg bg-[#949494]" />
              <span className="text-2xl text-[#EBEBEB]">{item.name}</span>
            </div>
          )
        })}
      </div>
      {/* 보관함 선택하면 나오는 상세 화면 */}
      <div ref={detailRef} className="flex flex-col justify-between">
        <div className="flex flex-col gap-y-6">
          <h2 className="text-[56px] font-bold leading-[150%]">
            좋아요한 운동
          </h2>
          <p className="text-2xl text-[#CECECE]">14개 * 1시간 32분 * 556kcal</p>
          <span className="mb-[72px] text-2xl text-[#B7B7B7] ">
            콰트 앱 내에서 좋아요 표시한 운동 강의가 여기에 담겨요.
          </span>
          <img
            src={ImagePlayButton}
            alt="play button"
            className="h-[88px] w-[267px] cursor-pointer"
          />
        </div>
        {/* list */}
        <div className="flex flex-row items-center justify-start gap-x-5">
          {/* item */}
          <div className="flex h-[322px] w-[342px] flex-col">
            <div className="mb-4 h-[188px] w-[342px] rounded-lg bg-[#B7B7B7]" />
            <p className="mb-1 text-2xl font-bold">타이틀</p>
            <span className="text-[24px] leading-[150%] text-[#B7B7B7]">
              입문 . 10분 . 35kcal . 매트
            </span>
            <span className="text-[24px] leading-[150%] text-[#B7B7B7]">
              빅씨스
            </span>
          </div>
          {/* item */}
          <div className="flex h-[322px] w-[342px] flex-col">
            <div className="mb-4 h-[188px] w-[342px] rounded-lg bg-[#B7B7B7]" />
            <p className="mb-1 text-2xl font-bold">타이틀</p>
            <span className="text-[24px] leading-[150%] text-[#B7B7B7]">
              입문 . 10분 . 35kcal . 매트
            </span>
            <span className="text-[24px] leading-[150%] text-[#B7B7B7]">
              빅씨스
            </span>
          </div>
          {/* item */}
          <div className="flex h-[322px] w-[342px] flex-col">
            <div className="mb-4 h-[188px] w-[342px] rounded-lg bg-[#B7B7B7]" />
            <p className="mb-1 text-2xl font-bold">타이틀</p>
            <span className="text-[24px] leading-[150%] text-[#B7B7B7]">
              입문 . 10분 . 35kcal . 매트
            </span>
            <span className="text-[24px] leading-[150%] text-[#B7B7B7]">
              빅씨스
            </span>
          </div>
          {/* item */}
          <div className="flex h-[322px] w-[342px] flex-col">
            <div className="mb-4 h-[188px] w-[342px] rounded-lg bg-[#B7B7B7]" />
            <p className="mb-1 text-2xl font-bold">타이틀</p>
            <span className="text-[24px] leading-[150%] text-[#B7B7B7]">
              입문 . 10분 . 35kcal . 매트
            </span>
            <span className="text-[24px] leading-[150%] text-[#B7B7B7]">
              빅씨스
            </span>
          </div>
          {/* item */}
          <div className="flex h-[322px] w-[342px] flex-col">
            <div className="mb-4 h-[188px] w-[342px] rounded-lg bg-[#B7B7B7]" />
            <p className="mb-1 text-2xl font-bold">타이틀</p>
            <span className="text-[24px] leading-[150%] text-[#B7B7B7]">
              입문 . 10분 . 35kcal . 매트
            </span>
            <span className="text-[24px] leading-[150%] text-[#B7B7B7]">
              빅씨스
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
