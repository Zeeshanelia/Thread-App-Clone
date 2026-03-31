import { Avatar, Box, Button, Dialog, DialogContent, DialogTitle, Stack, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useParams } from "react-router-dom";
import Loading from "../common/Loading";

const EditProfile = ({ open = false, onClose = () => { }, myInfo = null, onUpdated = () => { } }) => {
  const _700 = useMediaQuery("(min-width:700px)");

  const [pic, setPic] = useState(null);
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState({ text: "", type: "" });

  const params = useParams();
  const imgRef = useRef();

  const handlePhoto = () => {
    imgRef.current.click();
  };

  const handleClose = () => {
    onClose();
  };

  const handleUpdate = async () => {
    if (pic || bio) {
      setIsLoading(true);
      try {
        const data = new FormData();
        if (bio) data.append("text", bio);
        if (pic) data.append("media", pic);

        const res = await fetch(`/api/user/${params?.id}/update`, {
          method: "PUT",
          body: data,
        });
        const result = await res.json();
        if (res.ok) {
          setMsg({ text: result.msg, type: "success" });
          onUpdated();
        } else {
          setMsg({ text: result.msg, type: "error" });
        }
      } catch (err) {
        setMsg({ text: "Update failed", type: "error" });
      } finally {
        setIsLoading(false);
        setTimeout(() => setMsg({ text: "", type: "" }), 2500);
      }
    }
  };

  return (
    <>
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
          ( <>
              <Box position={"absolute"} top={20} right={20} onClick={handleClose}>
                <RxCross2 size={28} className="image-icon" />
              </Box>
              <DialogTitle textAlign={"center"} mb={5}>
                Edit Profile
              </DialogTitle>
              <DialogContent>
                {msg.text && (
                  <Typography
                    textAlign={"center"}
                    color={msg.type === "success" ? "green" : "red"}
                    fontSize={"0.9rem"}
                    mb={2}>
                    {msg.text}
                  </Typography>
                )}
                <Stack flexDirection={"column"} gap={1}>
                  <Avatar
                    src={pic ? URL.createObjectURL(pic) : myInfo ? myInfo.profilePic : ""}
                    alt={myInfo ? myInfo.userName : ""}
                    sx={{ width: 96, height: 96, alignSelf: "center" }}/>
                  <Button
                    size="large"
                    sx={{
                      border: "2px solid gray",
                      borderRadius: "10px",
                      width: 96,
                      height: 40,
                      alignSelf: "center",
                      my: 2,
                      ":hover": { cursor: "pointer" },
                    }}
                    onClick={handlePhoto}>
                    Change
                  </Button>
                  <input
                    type="file"
                    className="file-input"
                    accept="image/*"
                    ref={imgRef}
                    onChange={(e) => setPic(e.target.files[0])}/>
                  <Typography variant="subtitle1" fontWeight={"bold"} fontSize={"1.2rem"} my={2}>
                    Username
                  </Typography>
                  <input
                    type="text"
                    value={myInfo ? myInfo.userName : ""}
                    readOnly
                    className="text1"/>
                </Stack>
                <Stack flexDirection={"column"} gap={1}>
                  <Typography variant="subtitle1" fontWeight={"bold"} fontSize={"1.2rem"} my={2}>
                    Email
                  </Typography>
                  <input
                    type="text"
                    value={myInfo ? myInfo.email : ""}
                    readOnly
                    className="text1"/>
                </Stack>
                <Stack flexDirection={"column"} gap={1}>
                  <Typography variant="subtitle1" fontWeight={"bold"} fontSize={"1.2rem"} my={2}>
                    Bio
                  </Typography>
                  <input
                    type="text"
                    className="text1"
                    placeholder={myInfo ? myInfo.bio : ""}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </Stack>
                <Button
                  size="large"
                  sx={{
                    border: "2px solid gray",
                    borderRadius: "10px",
                    bgcolor: "GrayText",
                    color: "white",
                    width: "100%",
                    my: 2,
                    fontSize: "1.2rem",
                    ":hover": { cursor: "pointer", bgcolor: "gray" },
                  }}
                  onClick={handleUpdate}
                >
                  Update
                </Button>
              </DialogContent>
            </>
          )}
      </Dialog>
    </>
  );
};

export default EditProfile;