import { useSelector } from "react-redux"
import { useSubmitCodeMutation } from "../services/submitCode"

export const RunCode = () => {
  const [submitCode, { isLoading }] = useSubmitCodeMutation()
  const code = useSelector((state) => state.code.value)
  const selectedLanguage = useSelector((state) => state.language.value)
  const language = selectedLanguage.toLowerCase()
  const encodedCode = btoa(code)
  const handleRunCode = async () => {
    if (!code.trim()) {
      console.error("Code is empty. Please write some code before running.")
      return
    }

    try {
      const response = await submitCode({ code: encodedCode, language }).unwrap()
      console.log("Code executed successfully:", response)
    } catch (err) {
      console.error("Error executing code:", err)
    }
  }

  return (
    // <button onClick={handleRunCode} className={`ou text-white px-4 py-2 w-36 rounded hover:bg-blue-600 cursor-pointer transition duration-200 ${isLoading && ''}`} disabled={isLoading}>
    //outlined button no background
    <button onClick={handleRunCode} className={`inline-flex items-center gap-2 rounded-md bg-gray-700 py-2 px-4 text-sm font-semibold text-white focus:outline-none border border-gray-600 hover:border-gray-300 rounded transition duration-200 cursor-pointer ${isLoading && ""}`} disabled={isLoading}>
      {isLoading ? "Running..." : "Run Code"}
    </button>
  )
}
