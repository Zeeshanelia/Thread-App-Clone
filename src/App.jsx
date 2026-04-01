import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Protected/Home'
import Search from './pages/Protected/Search'
import ProtectedLayout from './pages/Protected/ProtectedLayout'
import Error from './pages/Error'
import { Box } from "@mui/material"
import Register from './pages/Register'
import ProfileLayout from './pages/Protected/profile/ProfileLayout'
import Threads from './pages/Protected/profile/Threads'
import Replies from './pages/Protected/profile/Replies'
import Repost from './pages/Protected/profile/Repost'
import SinglePost from "./pages/Protected/SinglePost";

const App = () => {
  const data = true

  return (
    <Box minHieght={'100vh'} >

      <BrowserRouter>
        <Routes>
          {
            data
              ?
              (<Route path="/" element={<ProtectedLayout />} >
                <Route path="" element={< Home />} />
                <Route exact path="post/:id" element={<SinglePost />} />
                <Route path="/search" element={< Search />} />
                <Route path="profile" element={<ProfileLayout />} >
                  <Route path="threads/:id" element={<Threads />} />
                  <Route path="replies/:id" element={<Replies />} />
                  <Route path="repost/:id" element={< Repost />} />
                </Route>
              </Route>)
              :
              <Route exact path="/" element={<Register />} />
          }


          <Route path="*" element={< Error />} />
        </Routes>
      </BrowserRouter>
    </Box>
  )
}

export default App



