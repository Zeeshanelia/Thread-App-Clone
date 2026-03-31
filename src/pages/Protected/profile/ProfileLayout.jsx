import { Avatar, Button, Chip, Stack, Typography, useMediaQuery } from "@mui/material";
import { FaInstagram } from "react-icons/fa";
import { Link, Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EditProfile from "../../../components/modals/EditProfile";

const ProfileLayout = ({ myInfo = null, darkMode = false }) => {
  const params = useParams();

  const [data, setData] = useState(null);
  const [myAccount, setMyAccount] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [msg, setMsg] = useState({ text: "", type: "" });

  const _300 = useMediaQuery("(min-width:300px)");
  const _500 = useMediaQuery("(min-width:500px)");
  const _700 = useMediaQuery("(min-width:700px)");

  const fetchUserDetails = async () => {
    try {
      const res = await fetch(`/api/user/${params?.id}`);
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };

  const checkIsFollowing = () => {
    if (data && myInfo) {
      const isTrue = data.user.followers.filter((e) => e._id === myInfo._id);
      setIsFollowing(isTrue.length > 0);
    }
  };

  const checkIsMyAccount = () => {
    if (data && myInfo) {
      setMyAccount(data.user._id === myInfo._id);
    }
  };

  const handleFollow = async () => {
    if (data) {
      try {
        const res = await fetch(`/api/user/${data.user._id}/follow`, { method: "POST" });
        const result = await res.json();
        if (res.ok) {
          setMsg({ text: result.msg, type: "success" });
        } else {
          setMsg({ text: result.msg, type: "error" });
        }
      } catch (err) {
        setMsg({ text: "Follow failed", type: "error" });
      } finally {
        setTimeout(() => setMsg({ text: "", type: "" }), 2500);
      }
    }
  };

  const handleOpenEditModal = () => {
    setShowEditModal(true);
  };

  useEffect(() => {
    fetchUserDetails();
  }, [params?.id]);

  useEffect(() => {
    checkIsFollowing();
    checkIsMyAccount();
  }, [data]);

  return (
    <>
      {msg.text && (
        <Typography
          textAlign={"center"}
          color={msg.type === "success" ? "green" : "red"}
          fontSize={"0.9rem"}
        >
          {msg.text}
        </Typography>
      )}
      <Stack
        flexDirection={"column"}
        gap={2}
        p={2}
        m={2}
        width={_700 ? "800px" : "90%"}
        mx={"auto"}
      >
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Stack flexDirection={"column"} gap={1}>
            <Typography
              variant="h2"
              fontWeight={"bold"}
              fontSize={_300 ? "2rem" : "1rem"}>
              {data ? (data.user ? data.user.userName : "") : ""}
            </Typography>
            <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
              <Typography variant="h2" fontSize={_300 ? "1rem" : "0.8rem"}>
                {data ? (data.user ? data.user.email : "") : ""}
              </Typography>
              <Chip
                label="threads.net"
                size="small"
                sx={{ fontSize: _300 ? "0.8rem" : "0.6rem" }} />
            </Stack>
          </Stack>
          <Avatar
            src={data ? (data.user ? data.user.profilePic : "") : ""}
            alt={data ? (data.user ? data.user.userName : "") : ""}
            sx={{ width: _300 ? 60 : 40, height: _300 ? 60 : 40 }}
          />
        </Stack>
        <Typography variant="subtitle2">
          {data ? (data.user ? data.user.bio : "") : ""}
        </Typography>
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}>
          <Typography variant="subtitle2" color={"gray"}>
            {data
              ? data.user
                ? data.user.followers.length > 0
                  ? `${data.user.followers.length} followers`
                  : "No Followers"
                : ""
              :
              ""}
          </Typography>
          <FaInstagram size={_300 ? 40 : 24} />
        </Stack>
      </Stack>
      <Button
        size="large"
        sx={{
          color: darkMode ? "whitesmoke" : "black",
          width: _700 ? "800px" : "90%",
          mx: "auto",
          textAlign: "center",
          border: "1px solid gray",
          borderRadius: "10px",
          ":hover": { cursor: "pointer" },
        }}
        onClick={myAccount ? handleOpenEditModal : handleFollow}>
        {myAccount ? "Edit Profile" : isFollowing ? "Unfollow" : "Follow user"}
      </Button>

      <Stack
        flexDirection={"row"}
        justifyContent={"space-evenly"}
        my={5}
        pb={2}
        borderBottom={"2px solid gray"}
        fontSize={_500 ? "1.2rem" : _300 ? "1.1rem" : "0.9rem"}
        width={_700 ? "800px" : "90%"}
        mx={"auto"} >

        <Link
          to={`/profile/threads/${data?.user._id}`}
          className={`link ${darkMode ? "mode" : ""}`}>
          Threads
        </Link>

        <Link
          to={`/profile/replies/${data?.user._id}`}
          className={`link ${darkMode ? "mode" : ""}`}>
          Replies
        </Link>

        <Link
          to={`/profile/reposts/${data?.user._id}`}
          className={`link ${darkMode ? "mode" : ""}`}>
          Reposts
        </Link>
      </Stack>
      <Outlet />
      <EditProfile open={showEditModal} onClose={() => setShowEditModal(false)} />
    </>
  );
};

export default ProfileLayout;