import { Menu, MenuItem, IconButton } from "@mui/material";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";

const MyMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [postId] = useState("1"); // replace with your actual post id
  const [msg, setMsg] = useState({ text: "", type: "" });

  const handleClose = () => setAnchorEl(null);
  const handleOpen = (e) => setAnchorEl(e.currentTarget);

  const handleDeletePost = async () => {
    handleClose();
    try {
      const res = await fetch(`/api/post/${postId}`, { method: "DELETE" });
      const result = await res.json();
      if (res.ok) {
        setMsg({ text: result.msg, type: "success" });
      } else {
        setMsg({ text: result.msg, type: "error" });
      }
    } catch (err) {
      setMsg({ text: "Delete failed", type: "error" });
    } finally {
      setTimeout(() => setMsg({ text: "", type: "" }), 2500);
    }
  };

  return (
    <>
      {msg.text && (
        <p style={{ textAlign: "center", color: msg.type === "success" ? "green" : "red" }}>
          {msg.text}
        </p>
      )}

      <IconButton onClick={handleOpen}>
        <IoMenu size={28} color="gray" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={anchorEl !== null}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default MyMenu;