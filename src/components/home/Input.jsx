import { Avatar, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addPostModal } from "../../redux/slice";

const Input = () => {
  const { myInfo } = useSelector((state) => state.service);
  const is700 = useMediaQuery("(min-width:700px)");

  const dispatch = useDispatch();

  const handleAddPost = () => {
    dispatch(addPostModal(true));
  };

  if (!is700) return null; // Render only for screens >= 700px

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      width="70%"
      height={28}
      p={3}
      borderBottom="2px solid gray"
      my={5}
      mx="auto"
      onClick={handleAddPost}
      sx={{ cursor: "pointer" }} // indicate clickable
    >
      {/* Avatar + Input Text */}
      <Stack direction="row" alignItems="center" gap={2}>
        <Avatar
          src={myInfo?.profilePic || ""}
          alt={myInfo?.userName || ""}
        />
        <Typography color="GrayText">Start a thread...</Typography>
      </Stack>

      {/* POST Button */}
      <Button
        size="medium"
        sx={{
          bgcolor: "gray",
          color: "aliceblue",
          ":hover": {
            bgcolor: "black",
          },
        }}
      >
        POST
      </Button>
    </Stack>
  );
};

export default Input;