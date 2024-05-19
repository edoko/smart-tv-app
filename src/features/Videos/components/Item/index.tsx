import { Video } from '@/pages/Programs'
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
        className="mr-4 flex w-[20vw] flex-col"
        style={{
          flex: '0 0 auto',
          boxShadow: selected ? '0 0 0 4px gray' : 'none',
        }}
      >
        <img
          src={data.thumbnail}
          alt={data.title}
          className="mb-2 h-full w-full rounded-md object-cover"
        />
        <span className="line-clamp-1 text-lg font-bold">{data.title}</span>
      </div>
    )
  },
)

export default Item
