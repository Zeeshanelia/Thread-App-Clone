import { Stack, Typography, useMediaQuery } from "@mui/material";
import Post from "../../../components/home/Post";
import { useSelector } from "react-redux";

const Threads = () => {
  const { user } = useSelector((state) => state.service);
  const _700 = useMediaQuery("(min-width:700px)");

  const threads = user?.user?.threads || [];

  return threads.length > 0 ? (
    <Stack
      flexDirection="column"
      gap={2}
      mb={10}
      width={_700 ? "800px" : "90%"}
      mx="auto"
    >
      {threads.map((e) => (
        <Post key={e._id} e={e} />
      ))}
    </Stack>
  ) : (
    <Typography textAlign="center" variant="h6">
      No Thread yet!
    </Typography>
  );
};

export default Threads;