import LanguageSelector from "./LanguageSelector"
import { RunCode } from "./RunCode"

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold text-white font-mono">Code Runner</div>
        <div className="flex gap-2">
          <LanguageSelector />
          <RunCode />
        </div>
      </div>
    </nav>
  )
}
