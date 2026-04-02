import { Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleMyMenu,
  deletePostLocal,
  setLoading,
} from "../../redux/slice";
import { Bounce, toast } from "react-toastify";

const MyMenu = () => {
  const { myMenuAnchorEl, postId } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleMyMenu(null));
  };

  //  Dummy API delete
  const handleDeletePost = async () => {
    handleClose();
    dispatch(setLoading(true));

    try {
      // fake API call
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Delete failed");

      // remove from redux state
      dispatch(deletePostLocal(postId));

      toast.warning("Post deleted successfully", {
        position: "top-center",
        autoClose: 2500,
        theme: "colored",
        transition: Bounce,
      });
    } catch (error) {
      toast.error(error.message || "Error deleting post", {
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
      anchorEl={myMenuAnchorEl}
      open={Boolean(myMenuAnchorEl)}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}>
      <MenuItem onClick={handleDeletePost}>
        Delete
      </MenuItem>
    </Menu>
  );
};

export default MyMenu;