import { useState, useEffect, useRef, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCode } from "../features/codeSlice"

export default function CodeEditor() {
  const [lines, setLines] = useState([1])
  const textareaRef = useRef(null)
  const code = useSelector((state) => state.code.value)
  const dispatch = useDispatch()

  // Debounced handler for textarea changes
  const handleTextAreaChange = useCallback(
    (e) => {
      const { value } = e.target
      dispatch(setCode(value))
    },
    [dispatch]
  )

  // Update line numbers when code changes
  useEffect(() => {
    if (typeof code === "string") {
      const lineCount = code.split("\n").length
      setLines(Array.from({ length: lineCount }, (_, i) => i + 1))
    } else {
      console.error("Code is not a valid string.")
    }
  }, [code])

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [code])

  return (
    <div className="w-full flex-1 flex items-center justify-center bg-gray-900 p-2">
      <div className="relative w-full bg-gray-800 rounded-lg shadow-lg flex min-h-full">
        {/* Line numbers */}
        <div className="w-10 text-gray-400 text-right pr-3 py-4 text-sm font-mono border-r border-gray-700" aria-hidden="true">
          {lines.map((line) => (
            <div key={line}>{line}</div>
          ))}
        </div>
        {/* Code editor */}
        <textarea ref={textareaRef} className="w-full p-4 text-white bg-transparent outline-none font-mono text-sm resize-none overflow-hidden" value={code} onChange={handleTextAreaChange} placeholder="Write your code here..." aria-label="Code editor" spellCheck={false}/>
      </div>
    </div>
  )
}
