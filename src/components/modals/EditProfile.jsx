import { Avatar, Box, Button, Dialog, DialogContent, DialogTitle,Stack, Typography,useMediaQuery,} from "@mui/material";
import { useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { editProfileModal,updateProfileLocal,} from "../../redux/slice";
import Loading from "../common/Loading";
import { Bounce, toast } from "react-toastify";

const EditProfile = () => {
  const { openEditProfileModal, myInfo, loading } = useSelector(
    (state) => state.service
  );
  const _700 = useMediaQuery("(min-width:700px)");
  const [pic, setPic] = useState(null);
  const [bio, setBio] = useState(myInfo?.bio || "");
  const imgRef = useRef();
  const dispatch = useDispatch();

  const handlePhoto = () => imgRef.current.click();
  const handleClose = () => dispatch(editProfileModal(false));

  const handleUpdate = async () => {
    if (!pic && !bio) {
      toast.error("Nothing to update");
      return;
    }

    dispatch(setLoading(true));
    try {
      const formData = new FormData();
      if (bio) formData.append("bio", bio);
      if (pic) formData.append("profilePic", pic);

      //  Replace this with your real API
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/users/1",
        {
          method: "PUT",
          body: formData,
        }
      );
      if (!res.ok) throw new Error("Update failed");

      dispatch(
        updateProfileLocal({
          bio,
          profilePic: pic ? URL.createObjectURL(pic) : myInfo.profilePic,
        })
      );

      toast.success("Profile updated successfully", {
        position: "top-center",
        autoClose: 2500,
        theme: "colored",
        transition: Bounce,
      });

      dispatch(editProfileModal(false));
    } catch (error) {
      toast.error(error.message || "Error updating profile", {
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
    <Dialog open={openEditProfileModal} onClose={handleClose} fullWidth fullScreen={!_700}>
      {loading ? (
        <Stack height={"60vh"} justifyContent="center">
          <Loading />
        </Stack>
      ) : (
        <>
          <Box position={"absolute"} top={20} right={20} onClick={handleClose}>
            <RxCross2 size={28} className="image-icon" />
          </Box>

          <DialogTitle textAlign={"center"} mb={5}>
            Edit Profile
          </DialogTitle>

          <DialogContent>
            <Stack flexDirection={"column"} gap={1}>
              <Avatar
                src={pic ? URL.createObjectURL(pic) : myInfo?.profilePic || ""}
                alt={myInfo?.userName || ""}
                sx={{ width: 96, height: 96, alignSelf: "center" }}
              />

              <Button
                size="large"
                sx={{
                  border: "2px solid gray",
                  borderRadius: "10px",
                  width: 96,
                  height: 40,
                  alignSelf: "center",
                  my: 2,
                }}
                onClick={handlePhoto}
              >
                Change
              </Button>

              <input
                type="file"
                className="file-input"
                accept="image/*"
                ref={imgRef}
                onChange={(e) => setPic(e.target.files[0])}
              />

              <Typography fontWeight="bold" my={2}>
                Username
              </Typography>
              <input type="text" value={myInfo?.userName || ""} readOnly className="text1" />

              <Typography fontWeight="bold" my={2}>
                Email
              </Typography>
              <input type="text" value={myInfo?.email || ""} readOnly className="text1" />

              <Typography fontWeight="bold" my={2}>
                Bio
              </Typography>
              <input type="text" className="text1" value={bio} onChange={(e) => setBio(e.target.value)} />

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
                  ":hover": { bgcolor: "gray" },
                }}
                onClick={handleUpdate}
              >
                Update
              </Button>
            </Stack>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default EditProfile;