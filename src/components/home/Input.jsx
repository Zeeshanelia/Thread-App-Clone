import { Avatar, Button, Stack, Typography, useMediaQuery } from "@mui/material";



const Input = ({ myInfo = null }) => {
  const _700 = useMediaQuery("(min-width:700px)");

  const handleAddPost = () => { };

  return (
    <>
      {_700
        ?
        (<Stack
          flexDirection={"row"}
          alignItems={"center"}
          width={"70%"}
          height={28}
          justifyContent={"space-between"}
          p={3}
          borderBottom={"2px solid gray"}
          my={5}
          mx={"auto"}
          onClick={handleAddPost}>
          <Stack flexDirection={"row"} alignItems={"center"} gap={2}>


            <Avatar src={myInfo ? myInfo.profilePic : ""}
              alt={myInfo ? myInfo.userName : ""} />


            <Typography color={"GrayText"}>Start a thread...</Typography>
          </Stack>
          <Button
            size="medium"
            sx={{
              bgcolor: "gray",
              color: "aliceblue",
              ":hover": {
                bgcolor: "black",
                cursor: "pointer",
              },
            }}>

            POST

          </Button>
        </Stack>

        )

        :


        null
      }
      <Stack flexDirection={"row"}
        alignItems={"center"}
        width={"70%"}
        justifyContent={"cente"}>

      </Stack>


    </>
  );
};

export default Input;