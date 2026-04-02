import { Stack, Typography, useMediaQuery } from "@mui/material";
import Comments from "../../../components/home/post/Comments";
import { useSelector } from "react-redux";

const Replies = () => {
  const { user } = useSelector((state) => state.service);
  const _700 = useMediaQuery("(min-width:700px)");

  const replies = user?.user?.replies || [];

  return (
    <Stack
      flexDirection="column"
      gap={2}
      width={_700 ? "800px" : "90%"}
      mx="auto"
    >
      {replies.length > 0 ? (
        replies.map((e) => <Comments key={e._id} e={e} postId={e.post} />)
      ) : (
        <Typography textAlign="center" variant="h6">
          No Replies yet!
        </Typography>
      )}
    </Stack>
  );
};

export default Replies;