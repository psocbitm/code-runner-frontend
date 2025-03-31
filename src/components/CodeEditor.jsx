import { useState, useEffect, useRef, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCode } from "../features/codeSlice"

export default function CodeEditor() {
  const [lines, setLines] = useState([1])
  const textareaRef = useRef(null)
  const code = useSelector((state) => state.code.value)
  const dispatch = useDispatch()

  // Define indentation (customize as needed: "\t" for tab, "  " for 2 spaces, etc.)
  const INDENT = "  " // 2 spaces is a common standard

  // Debounced handler for textarea changes
  const handleTextAreaChange = useCallback(
    (e) => {
      const { value } = e.target
      dispatch(setCode(value))
    },
    [dispatch]
  )

  // Handle Tab and Shift+Tab key presses
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Tab") {
        e.preventDefault() // Prevent focus shift
        const textarea = textareaRef.current
        const start = textarea.selectionStart
        const end = textarea.selectionEnd

        if (start === end) {
          // No selection: insert indent at cursor
          const newValue = code.substring(0, start) + INDENT + code.substring(end)
          dispatch(setCode(newValue))
          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = start + INDENT.length
          }, 0)
        } else {
          // Selection: indent all selected lines
          const lines = code.split("\n")
          const startLine = code.substring(0, start).split("\n").length - 1
          const endLine = code.substring(0, end).split("\n").length - 1
          let newCode = ""

          if (e.shiftKey) {
            // Shift+Tab: unindent selected lines
            for (let i = 0; i < lines.length; i++) {
              if (i >= startLine && i <= endLine && lines[i].startsWith(INDENT)) {
                lines[i] = lines[i].substring(INDENT.length)
              }
              newCode += (i > 0 ? "\n" : "") + lines[i]
            }
          } else {
            // Tab: indent selected lines
            for (let i = 0; i < lines.length; i++) {
              if (i >= startLine && i <= endLine) {
                lines[i] = INDENT + lines[i]
              }
              newCode += (i > 0 ? "\n" : "") + lines[i]
            }
          }

          dispatch(setCode(newCode))

          // Adjust selection after indent/unindent
          setTimeout(() => {
            const newStart = newCode.indexOf(lines[startLine])
            const newEnd = newCode.indexOf(lines[endLine]) + lines[endLine].length
            textarea.selectionStart = newStart
            textarea.selectionEnd = newEnd
          }, 0)
        }
      }
    },
    [code, dispatch, INDENT]
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
        <textarea
          ref={textareaRef}
          className="w-full p-4 text-white bg-transparent outline-none font-mono text-sm resize-none overflow-hidden"
          value={code}
          onChange={handleTextAreaChange}
          onKeyDown={handleKeyDown}
          placeholder="Write your code here..."
          aria-label="Code editor"
          spellCheck={false}
        />
      </div>
    </div>
  )
}