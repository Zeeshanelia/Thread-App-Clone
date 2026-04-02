import { Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleColorMode, toggleMainMenu, logoutUser,setLoading,} from "../../redux/slice";
import { Bounce, toast } from "react-toastify";

const MainMenu = () => {
  const { anchorEl, myInfo } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleMainMenu(null));
  };

  const handleToggleTheme = () => {
    handleClose();
    dispatch(toggleColorMode());
  };

  //  Dummy API using fetch
  const handleLogout = async () => {
    handleClose();
    dispatch(setLoading(true));

    try {
      // fake API (you can replace with jsonplaceholder)
      const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");

      if (!res.ok) throw new Error("Logout failed");

      const data = await res.json();

      dispatch(logoutUser());

      toast.warning("Logout successful", {
        position: "top-center",
        autoClose: 2500,
        theme: "colored",
        transition: Bounce,
      });

    } catch (error) {
      toast.error(error.message || "Something went wrong", {
        position: "top-center",
        autoClose: 2500,
        theme: "colored",
        transition: Bounce,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <MenuItem onClick={handleToggleTheme}>
        Toggle Theme
      </MenuItem>

      <Link to={`/profile/threads/${myInfo?._id}`} className="link">
        <MenuItem onClick={handleClose}>
          My Profile
        </MenuItem>
      </Link>

      <MenuItem onClick={handleLogout}>
        Logout
      </MenuItem>
    </Menu>
  );
};

export default MainMenu;