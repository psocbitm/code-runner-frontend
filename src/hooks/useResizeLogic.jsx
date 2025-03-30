import { useState, useEffect } from "react"

export function useResizeLogic(containerRef) {
  const [editorWidth, setEditorWidth] = useState(50)
  const [isMobile, setIsMobile] = useState(false)
  const MIN_WIDTH_EDITOR = 400
  const MIN_WIDTH_OUTPUT = 300

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 1024)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const handleMouseDown = (event) => {
    if (isMobile || !containerRef.current) return

    event.preventDefault()
    const container = containerRef.current
    const startX = event.clientX
    const startWidth = (editorWidth * container.clientWidth) / 100

    const onMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX
      const newWidthPx = startWidth + deltaX
      const outputWidthPx = container.clientWidth - newWidthPx

      if (newWidthPx >= MIN_WIDTH_EDITOR && outputWidthPx >= MIN_WIDTH_OUTPUT) {
        setEditorWidth((newWidthPx / container.clientWidth) * 100)
      }
    }

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseup", onMouseUp)
    }

    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseup", onMouseUp)
  }

  return { editorWidth, isMobile, handleMouseDown }
}
