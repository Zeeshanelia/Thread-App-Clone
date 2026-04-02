import { Avatar,Box,Button, Dialog, DialogContent, DialogTitle, Stack,Typography,useMediaQuery,} from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { FaImages } from "react-icons/fa";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPostModal,
  addPostLocal,
  setLoading,
} from "../../redux/slice";
import Loading from "../common/Loading";
import { Bounce, toast } from "react-toastify";

const AddPost = () => {
  const { openAddPostModal, myInfo, loading } = useSelector(
    (state) => state.app
  );

  const _700 = useMediaQuery("(min-width:700px)");
  const _500 = useMediaQuery("(min-width:500px)");
  const _300 = useMediaQuery("(min-width:300px)");

  const [text, setText] = useState("");
  const [media, setMedia] = useState(null);

  const mediaRef = useRef();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(addPostModal(false));
  };

  const handleMediaRef = () => {
    mediaRef.current.click();
  };

  //  Dummy API with FormData
  const handlePost = async () => {
    if (!text && !media) {
      toast.error("Post cannot be empty");
      return;
    }

    dispatch(setLoading(true));

    try {
      const formData = new FormData();
      if (text) formData.append("text", text);
      if (media) formData.append("media", media);

      // fake API
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Failed to create post");

      const data = await res.json();

      //  update redux
      dispatch(
        addPostLocal({
          id: Date.now(),
          text,
          media: media ? URL.createObjectURL(media) : null,
          user: myInfo,
        })
      );

      // reset UI
      setText("");
      setMedia(null);
      dispatch(addPostModal(false));

      toast.success("Post created successfully", {
        position: "top-center",
        autoClose: 2500,
        theme: "colored",
        transition: Bounce,
      });
    } catch (error) {
      toast.error(error.message || "Error creating post", {
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
    <Dialog
      open={openAddPostModal}
      onClose={handleClose}
      fullWidth
      fullScreen={!_700}
    >
      {loading ? (
        <Stack height={"60vh"}>
          <Loading />
        </Stack>
      ) : (
        <>
          <Box
            position={"absolute"}
            top={20}
            right={20}
            onClick={handleClose}
          >
            <RxCross2 size={28} className="image-icon" />
          </Box>

          <DialogTitle textAlign={"center"} mb={5}>
            New Thread...
          </DialogTitle>

          <DialogContent>
            <Stack flexDirection={"row"} gap={2} mb={5}>
              <Avatar
                src={myInfo?.profilePic || ""}
                alt={myInfo?.userName || ""}
              />

              <Stack>
                <Typography
                  variant="h6"
                  fontWeight={"bold"}
                  fontSize={"1rem"}
                >
                  {myInfo?.userName}
                </Typography>

                <textarea
                  cols={_500 ? 40 : 25}
                  rows={2}
                  className="text1"
                  placeholder="Start a Thread..."
                  autoFocus
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />

                {media && (
                  <img
                    src={URL.createObjectURL(media)}
                    alt="preview"
                    id="url-img"
                    width={_500 ? 300 : _300 ? 200 : 100}
                    height={_500 ? 300 : _300 ? 200 : 100}
                  />
                )}

                <FaImages
                  size={28}
                  className="image-icon"
                  onClick={handleMediaRef}
                />

                <input
                  type="file"
                  accept="image/*"
                  className="file-input"
                  ref={mediaRef}
                  onChange={(e) => setMedia(e.target.files[0])}
                />
              </Stack>
            </Stack>

            <Stack
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography
                variant="h6"
                fontSize={"1rem"}
                color={"gray"}
              >
                Anyone can reply
              </Typography>

              <Button
                size="large"
                sx={{
                  bgcolor: "GrayText",
                  color: "white",
                  borderRadius: "10px",
                  ":hover": { bgcolor: "gray" },
                }}
                onClick={handlePost}
              >
                Post
              </Button>
            </Stack>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default AddPost;