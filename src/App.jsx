import { BrowserRouter, Routes, Route } from "react-router-dom"
// import Header from './components/common/Header'
import Home from './pages/Protected/Home'
import Search from './pages/Protected/Search'
import ProtectedLayout from './pages/Protected/ProtectedLayout'
import Error from './pages/Error'
import { Box } from "@mui/material"
// import Register from './pages/Register'

const App = () => {
  return (
    <Box minHieght={'100vh'} >
      <BrowserRouter>
        {/* < Register /> */}

        <Routes>
          <Route path="/" element={<ProtectedLayout />} >
            <Route path="" element={< Home />} />
            <Route path="post/:id" element={<>post</>} />
            <Route path="/search" element={< Search />} />
            <Route path="*" element={< Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Box>
  )
}

export default App