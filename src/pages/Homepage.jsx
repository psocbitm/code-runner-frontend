import { useRef } from "react"
import { useResizeLogic } from "../hooks/useResizeLogic.jsx"
import CodeEditor from "../components/CodeEditor.jsx"
import Output from "../components/Output.jsx"

function EditorSection({ editorWidth, isMobile }) {
  const MIN_WIDTH_EDITOR = 400

  return (
    <div
      className="bg-slate-800 flex"
      style={{
        width: isMobile ? "100%" : `${editorWidth}%`,
        minWidth: isMobile ? "auto" : `${MIN_WIDTH_EDITOR}px`,
      }}
    >
      <CodeEditor />
    </div>
  )
}

function OutputSection({ isMobile }) {
  const MIN_WIDTH_OUTPUT = 400

  return (
    <div
      className="bg-slate-800 flex-1 flex"
      style={{
        width: isMobile ? "100%" : "auto",
        minWidth: isMobile ? "auto" : `${MIN_WIDTH_OUTPUT}px`,
      }}
    >
      <Output />
    </div>
  )
}

function ResizeDivider({ onMouseDown }) {
  return (
    <div className="w-2 cursor-col-resize flex items-center justify-center hover:bg-gray-500 transition" onMouseDown={onMouseDown} title="Drag to resize">
      <div className="w-[4px] h-10 bg-gray-400 rounded-md" />
    </div>
  )
}
export default function Homepage() {
  const containerRef = useRef(null)
  const { editorWidth, isMobile, handleMouseDown } = useResizeLogic(containerRef)

  return (
    <div ref={containerRef} className={`flex-1 flex bg-gray-800 ${isMobile ? "flex-col" : "flex-row"}`}>
      <EditorSection editorWidth={editorWidth} isMobile={isMobile} />
      {!isMobile && <ResizeDivider onMouseDown={handleMouseDown} />}
      <OutputSection isMobile={isMobile} />
    </div>
  )
}
