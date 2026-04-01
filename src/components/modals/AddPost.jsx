import { Avatar, Box, Button, Dialog, DialogContent, DialogTitle, Stack, Typography, useMediaQuery } from "@mui/material";
import { TbEdit } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { FaImages } from "react-icons/fa";
import { useRef, useState } from "react";
import Loading from "../common/Loading";

const AddPost = () => {
  const _700 = useMediaQuery("(min-width:700px)");
  const _500 = useMediaQuery("(min-width:500px)");
  const _300 = useMediaQuery("(min-width:300px)");

  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [media, setMedia] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState({ text: "", type: "" });
  const [myInfo] = useState({ profilePic: "", userName: "User" });

  const mediaRef = useRef();

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const handleMediaRef = () => {
    mediaRef.current.click();
  };

  const handlePost = async () => {
    setIsLoading(true);
    try {
      const data = new FormData();
      if (text) data.append("text", text);
      if (media) data.append("media", media);

      const res = await fetch("/api/post", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (res.ok) {
        setText("");
        setMedia(null);
        setMsg({ text: result.msg, type: "success" });
        setTimeout(() => {
          setMsg({ text: "", type: "" });
          handleClose();
        }, 1500);
      } else {
        setMsg({ text: result.msg, type: "error" });
        setTimeout(() => setMsg({ text: "", type: "" }), 2500);
      }
    } catch (err) {
      setMsg({ text: "Post failed", type: "error" });
      setTimeout(() => setMsg({ text: "", type: "" }), 2500);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={handleOpen}>
        <TbEdit
          size={ 32 }
          className="image-icon"
          color={"black"}/>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        fullScreen={_700 ? false : true}>
        {isLoading ? (
          <Stack height={"60vh"}>
            <Loading />
          </Stack>)
          :
          (<>
            <Box position={"absolute"} top={20} right={20} onClick={handleClose}>
              <RxCross2 size={28} className="image-icon" />
            </Box>
            <DialogTitle textAlign={"center"} mb={5}>
              New Thread...
            </DialogTitle>
            <DialogContent>

              {msg.text && (
                <Typography
                  textAlign={"center"}
                  color={msg.type === "success" ? "green" : "red"}
                  fontSize={"0.9rem"}
                  mb={2}>

                  {msg.text}
                </Typography>)
              }

              <Stack flexDirection={"row"} gap={2} mb={5}>
                <Avatar
                  src={myInfo.profilePic}
                  alt={myInfo.userName} />
                <Stack>

                  <Typography variant="h6" fontWeight={"bold"} fontSize={"1rem"}>
                    {myInfo.userName}
                  </Typography>

                  <textarea
                    cols={_500 ? 40 : 25}
                    rows={2}
                    className="text1"
                    placeholder="Start a Thread..."
                    autoFocus
                    value={text}
                    onChange={(e) => setText(e.target.value)} />

                  {media ? (
                    <img
                      src={URL.createObjectURL(media)}
                      alt=""
                      id="url-img"
                      width={_500 ? 300 : _300 ? 200 : 100}
                      height={_500 ? 300 : _300 ? 200 : 100} />)
                    :
                    null}
                  <FaImages
                    size={28}
                    className="image-icon"
                    onClick={handleMediaRef} />
                  <input
                    type="file"
                    accept="image/*"
                    className="file-input"
                    ref={mediaRef}
                    onChange={(e) => setMedia(e.target.files[0])} />
                </Stack>
              </Stack>
              <Stack
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}>
                <Typography variant="h6" fontSize={"1rem"} color={"gray"}>
                  Anyone can reply
                </Typography>

                <Button
                  size="large"
                  sx={{
                    bgcolor: "GrayText",
                    color: "white",
                    borderRadius: "10px",
                    ":hover": { bgcolor: "gray", cursor: "pointer" },
                  }}
                  onClick={handlePost}>
                  Post
                </Button>
              </Stack>
            </DialogContent>
          </>
          )}
      </Dialog>
    </>
  );
};

export default AddPost;