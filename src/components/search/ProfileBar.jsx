import { Avatar, Button, Stack, Typography, useMediaQuery,} from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileBar = ({ e }) => {
  const { theme } = useSelector((state) => state.app);
  const isDark = theme === "dark";

  const _700 = useMediaQuery("(min-width:700px)");

  //  safe destructuring with fallback
  const {
    _id = "",
    userName = "",
    bio = "",
    profilePic = "",
    followers = [],
  } = e || {};

  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      px={1}
      py={2}
      mx="auto"
      boxShadow="5px 5px 5px gray"
      width={_700 ? "80%" : "90%"}
      maxWidth="700px"
      borderRadius="15px"
      sx={{ ":hover": { cursor: "pointer" } }}
    >
      {/* LEFT */}
      <Stack flexDirection="row" gap={2}>
        <Avatar src={profilePic} alt={userName} />

        <Stack>
          <Link to={`/profile/threads/${_id}`} className="link">
            <Typography
              fontWeight="bold"
              fontSize={_700 ? "1rem" : "0.9rem"}
            >
              {userName}
            </Typography>
          </Link>

          <Typography
            variant="caption"
            fontSize={_700 ? "1.1rem" : "0.75rem"}
            color="gray"
          >
            {bio}
          </Typography>

          <Typography
            variant="caption"
            fontSize={_700 ? "1rem" : "0.9rem"}
          >
            {followers.length} followers
          </Typography>
        </Stack>
      </Stack>

      {/* RIGHT */}
      <Link to={`/profile/threads/${_id}`} className="link">
        <Button
          size="medium"
          sx={{
            border: "1px solid gray",
            color: isDark ? "whitesmoke" : "black",
            borderRadius: "10px",
            px: 2,
            height: 40,
          }}
        >
          Follow
        </Button>
      </Link>
    </Stack>
  );
};

export default ProfileBar;