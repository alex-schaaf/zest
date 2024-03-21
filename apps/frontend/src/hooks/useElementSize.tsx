import {
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"

interface Size {
  width: number
  height: number
}

/**
 * adapted from: https://usehooks-ts.com/react-hook/use-element-size
 */
function useElementSize<T extends HTMLElement = HTMLDivElement>(): [
  (node: T | null) => void,
  Size,
] {
  const [ref, setRef] = useState<T | null>(null)
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
  })

  const handleSize = useCallback(() => {
    setSize({
      width: ref?.offsetWidth || 0,
      height: ref?.offsetHeight || 0,
    })
  }, [ref?.offsetHeight, ref?.offsetWidth])

  useResizeListener(handleSize)

  useLayoutEffect(() => {
    handleSize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref?.offsetHeight, ref?.offsetWidth])

  return [setRef, size]
}

export default useElementSize

/**
 * Adds an resize event listener to the window or a given RefObject.
 *
 * adapted from: https://usehooks-ts.com/react-hook/use-event-listener
 */
function useResizeListener<T extends HTMLElement>(
  handler: (event: Event) => void,
  element?: RefObject<T>,
  options?: AddEventListenerOptions
) {
  const savedHandler = useRef(handler)

  useLayoutEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const targetElement = element?.current ?? window
    if (!targetElement) return

    const listener: typeof handler = (event) => savedHandler.current(event)

    targetElement.addEventListener("resize", listener, options)

    return () => {
      targetElement.removeEventListener("resize", listener, options)
    }
  }, [element, options])
}
