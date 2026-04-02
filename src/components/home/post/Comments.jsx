import { Avatar, Menu, MenuItem, Stack, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { IoIosMore } from "react-icons/io";
import { useSelector } from "react-redux";
import { useDeleteCommentMutation, useSinglePostQuery } from "../../../redux/service";
import { Bounce, toast } from "react-toastify";

const Comments = ({ e, postId }) => {
  const { darkMode, myInfo } = useSelector((state) => state.service);

  const [anchorEl, setAnchorEl] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const is700 = useMediaQuery("(min-width:700px)");

  const [deleteComment, deleteCommentData] = useDeleteCommentMutation();
  const { refetch } = useSinglePostQuery(postId);

  const handleClose = () => setAnchorEl(null);

  const handleDeleteComment = async () => {
    if (!e?._id || !postId) return;
    await deleteComment({ postId, id: e._id });
    handleClose();
    refetch();
  };

  // Check if current user is the admin of this comment
  useEffect(() => {
    setIsAdmin(e?.admin?._id === myInfo?._id);
  }, [e, myInfo]);

  // Toast notifications
  useEffect(() => {
    if (deleteCommentData.isSuccess) {
      toast.success(deleteCommentData.data?.msg || "Comment deleted", {
        position: "top-center",
        autoClose: 2500,
        theme: "colored",
        transition: Bounce,
      });
    }
    if (deleteCommentData.isError) {
      toast.error(deleteCommentData.error?.data?.msg || "Error deleting comment", {
        position: "top-center",
        autoClose: 2500,
        theme: "colored",
        transition: Bounce,
      });
    }
  }, [deleteCommentData.isSuccess, deleteCommentData.isError]);

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        px={2}
        pb={4}
        borderBottom="1px solid gray"
        mx="auto"
        width="90%"
      >
        <Stack direction="row" gap={is700 ? 2 : 1}>
          <Avatar src={e?.admin?.profilePic || ""} alt={e?.admin?.userName || ""} />
          <Stack direction="column">
            <Typography variant="h6" fontWeight="bold" fontSize="0.9rem">
              {e?.admin?.userName || ""}
            </Typography>
            <Typography variant="subtitle2" fontSize="0.9rem">
              {e?.text || ""}
            </Typography>
          </Stack>
        </Stack>

        <Stack direction="row" gap={1} alignItems="center" color={darkMode ? "white" : "GrayText"}>
          <Typography fontSize="0.9rem">24min</Typography>
          {isAdmin && (
            <IoIosMore
              size={is700 ? 28 : 20}
              className="image-icon"
              onClick={(ev) => setAnchorEl(ev.currentTarget)}
            />
          )}
          {!isAdmin && <IoIosMore size={is700 ? 28 : 20} color={darkMode ? "white" : "gray"} />}
        </Stack>
      </Stack>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleDeleteComment}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default Comments;