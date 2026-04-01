import { Menu, MenuItem, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";

const MainMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [myInfo] = useState({ _id: "123" });
  const [msg, setMsg] = useState({ text: "", type: "" });

  const handleClose = () => setAnchorEl(null);
  const handleOpen = (e) => setAnchorEl(e.currentTarget);

  const handleToggleTheme = () => {
    handleClose();
  };

  const handleLogout = async () => {
    handleClose();
    try {
      const res = await fetch("/api/logout", { method: "POST" });
      const result = await res.json();
      if (res.ok) {
        setMsg({ text: result.msg, type: "success" });
      } else {
        setMsg({ text: result.msg, type: "error" });
      }
    } catch (err) {
      setMsg({ text: "Logout failed", type: "error" });
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
        <MenuItem onClick={handleToggleTheme}>Toggle Theme</MenuItem>
        <Link to={`/profile/threads/${myInfo?._id}`} className="link">
          <MenuItem>My Profile</MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default MainMenu;