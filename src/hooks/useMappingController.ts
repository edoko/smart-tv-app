import mappingKeys from '@/utils/mappingKeys'
import { useCallback, useEffect, useRef } from 'react'

type KeyboardEventType = KeyboardEvent | React.KeyboardEvent
type KeyboardCallbackType = (e?: KeyboardEventType) => void

interface useMappingControllerProps {
  left?: KeyboardCallbackType
  right?: KeyboardCallbackType
  up?: KeyboardCallbackType
  down?: KeyboardCallbackType
  enter?: KeyboardCallbackType
  back?: KeyboardCallbackType
}

function debugKeys(e: KeyboardEventType) {
  console.log({
    keyCode: e.keyCode,
    key: e.key,
    code: e.code,
  })
}

function useMappingController(props: useMappingControllerProps) {
  const { left, right, up, down, enter, back } = props
  const isMounted = useRef(false)

  const onKeyDown = useCallback(
    (e: KeyboardEventType) => {
      process.env.NODE_ENV === 'development' && debugKeys(e)

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
        case mappingKeys.ENTER:
          enter?.(e)
          break
        case mappingKeys.BACK:
          back?.(e)
          break
        default:
          break
      }
    },
    [back, down, enter, left, right, up],
  )

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      document.addEventListener('keydown', onKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [onKeyDown])

  return onKeyDown
}

export default useMappingController
