import { Video } from '@/pages/Programs'
import clsx from 'clsx'
import { forwardRef } from 'react'

interface ItemProps {
  data: Video
  selected: boolean
}

const Item = forwardRef<HTMLDivElement, ItemProps>(
  ({ data, selected }, ref) => {
    return (
      <div
        ref={ref}
        data-id={data.id}
        className={clsx('mr-4 flex w-[240px] flex-col', {
          'border-4 border-gray-200': selected,
        })}
        style={{ flex: '0 0 auto' }}
      >
        <img
          src={data.thumbnail}
          alt={data.title}
          className="mb-2 h-[120px] w-[240px] rounded-md object-cover"
        />
        <span className="line-clamp-1 text-lg font-bold">{data.title}</span>
      </div>
    )
  },
)

export default Item
