import { Stack, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      minHeight="50vh"
      width="100%"
    >
      <CircularProgress color="primary" />
    </Stack>
  );
};

export default Loading;