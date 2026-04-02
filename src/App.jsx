import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Error from "./pages/Error";
import Home from "./pages/Protected/Home";
import ProfileLayout from "./pages/Protected/profile/ProfileLayout";
import Replies from "./pages/Protected/profile/Replies";
import Repost from "./pages/Protected/profile/Repost";
import Threads from "./pages/Protected/profile/Threads";
import ProtectedLayout from "./pages/Protected/ProtectedLayout";
import Search from "./pages/Protected/Search";
import Register from "./pages/Register";
import SinglePost from "./pages/Protected/SinglePost";

// API
import { useMyInfoQuery } from "./redux/service";

const App = () => {
  const { darkMode } = useSelector((state) => state.service);

  // 🔥 Toggle this for testing
  const bypassAuth = true;

  // Only call API if NOT bypassing
  const { data, isError, isLoading } = useMyInfoQuery(undefined, {
    skip: bypassAuth,
  });

  // ✅ Show Register ONLY if auth is required
  if (!bypassAuth) {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (isError || !data) {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Register />} />
          </Routes>
        </BrowserRouter>
      );
    }
  }

  // ✅ Main App
  return (
    <Box minHeight="100vh" className={darkMode ? "mode" : ""}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedLayout />}>
            <Route index element={<Home />} />
            <Route path="post/:id" element={<SinglePost />} />
            <Route path="search" element={<Search />} />

            {/* ✅ FIXED nested routing */}
            <Route path="profile/:id" element={<ProfileLayout />}>
              <Route path="threads/:id" element={<Threads />} />
              <Route path="replies/:id" element={<Replies />} />
              <Route path="reposts/:id" element={<Repost />} />
            </Route>
          </Route>

          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
};

export default App;