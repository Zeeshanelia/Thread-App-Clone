import { Avatar, AvatarGroup, Badge, Stack, Stepper, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";

const PostOne = ({ e }) => {
  const is700 = useMediaQuery("(min-width:700px)");

  if (!e) return null; // early return if no post data

  const comments = e.comments || [];

  return (
    <Stack direction="column" alignItems="center" justifyContent="space-between">
      {/* Admin Avatar with Badge */}
      <Link to={`/profile/threads/${e?.admin?._id}`}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <Avatar
              sx={{
                width: is700 ? 20 : 14,
                height: is700 ? 20 : 14,
                bgcolor: "green",
                fontSize: is700 ? 12 : 8,
              }}>
              +
            </Avatar>
          }>
          <Avatar
            alt={e?.admin?.userName || ""}
            src={e?.admin?.profilePic || ""}
            sx={{ width: is700 ? 40 : 32, height: is700 ? 40 : 32 }} />
        </Badge>
      </Link>

      {/* Comments Stepper + Avatars */}
      <Stack direction="column" alignItems="center" gap={2} height="100%">
        <Stepper
          orientation="vertical"
          activeStep={0}
          sx={{
            border: "0.1rem solid gray",
            width: 0,
            height: "100%",
          }}/>

        {comments.length > 0 && (
          <AvatarGroup
            total={comments.length}
            sx={{
              "& .MuiAvatar-root": {
                width: is700 ? 24 : 16,
                height: is700 ? 24 : 16,
                fontSize: is700 ? 12 : 8,
              },
            }}>
            {comments.slice(0, 2).map((c) => (
              <Avatar
                key={c._id}
                src={c?.admin?.profilePic || ""}
                alt={c?.admin?.userName || ""}/>
            ))}
          </AvatarGroup>
        )}
      </Stack>
    </Stack>
  );
};

export default PostOne;