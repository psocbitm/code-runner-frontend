import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { ChevronDown } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { setLanguage } from "../features/languageSlice"

export default function LanguageSelector() {
  const selectedLanguage = useSelector((state) => state.language.value)
  const dispatch = useDispatch()

  const languages = ["JavaScript", "C++", "Java", "Python"]

  const handleLanguageSelect = (language) => {
    dispatch(setLanguage(language))
  }

  return (
    <div className="text-right">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-2 px-4 text-sm font-semibold text-white hover:bg-gray-700 focus:outline-none border border-gray-700 rounded hover:bg-blue-600 transition duration-200 cursor-pointer">
          {selectedLanguage}
          <ChevronDown className="size-4" />
        </MenuButton>

        <MenuItems className="absolute right-auto mt-2 w-52 origin-top-right rounded-xl border border-white/5 bg-gray-800 p-1 text-sm text-white shadow-lg focus:outline-none z-2">
          {languages.map((language) => (
            <MenuItem key={language}>
              <button onClick={() => handleLanguageSelect(language)} className={`group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-gray-700 cursor-pointer ${selectedLanguage === language ? "bg-gray-700" : ""}`}>
                {language}
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  )
}
