import mappingKeys from '@/utils/mappingKeys'
import { useCallback, useEffect } from 'react'

type KeyboardEventType = KeyboardEvent | React.KeyboardEvent
type KeyboardCallbackType = (e?: KeyboardEventType) => void

interface useMappingControllerProps {
  left?: KeyboardCallbackType
  right?: KeyboardCallbackType
  up?: KeyboardCallbackType
  down?: KeyboardCallbackType
}

function useMappingController({
  left,
  right,
  up,
  down,
}: useMappingControllerProps) {
  const onKeyDown = useCallback(
    (e: KeyboardEventType) => {
      switch (e.keyCode) {
        case mappingKeys.LEFT:
          left?.(e)
          break
        case mappingKeys.RIGHT:
          right?.(e)
          break
        case mappingKeys.UP:
          up?.(e)
          break
        case mappingKeys.DOWN:
          down?.(e)
          break
        default:
          break
      }
    },
    [down, left, right, up],
  )

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  return onKeyDown
}

export default useMappingController
