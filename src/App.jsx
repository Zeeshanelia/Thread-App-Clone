import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from './components/common/Header'

const App = () => {
  return (
    <BrowserRouter>
        < Header />
      <Routes>
        {/* <Route path="/" element={<h1 className="bg-red-300 font-bold"> home </h1>} /> */}

      </Routes>
    </BrowserRouter>
  )
}

export default App