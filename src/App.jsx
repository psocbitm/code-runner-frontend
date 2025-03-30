import { Route, Routes } from "react-router"
import Homepage from "./pages/homepage"
import "./App.css"
import Layout from "./components/Layout"

function App() {
  return (
    <>
      <div>
        <Layout>
          <Routes>
            <Route path="/" element={<Homepage />} />
          </Routes>
        </Layout>
      </div>
    </>
  )
}

export default App
