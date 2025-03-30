import { useSelector } from "react-redux"

export default function Output () {
  const code = useSelector((state) => state.code.value)

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-900 p-2 min-h-24">
      <div className="relative w-full bg-gray-800 rounded-lg shadow-lg flex flex-col min-h-full gap-2">
        <div className="w-full p-4 text-white font-mono text-sm overflow-hidden border-b-1 border-gray-700 flex justify-between items-center">
          <div>Output</div>
          
        </div>
        <div>
          <div className="w-full p-4 text-gray-400 h-fit font-mono text-sm overflow-hidden bg-gray-800">
            <p>Output will be displayed here...</p>
            {code}
          </div>
        </div>
      </div>
    </div>
  )
}
