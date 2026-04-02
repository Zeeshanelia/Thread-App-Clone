import { Stack, Typography, useMediaQuery } from "@mui/material";
import { FaRegHeart, FaRegComment, FaRetweet, FaHeart } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLikePostMutation, useRepostMutation } from "../../../redux/service";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";

const PostTwo = ({ e }) => {
  const { darkMode, myInfo } = useSelector((state) => state.service);

  const [likePost] = useLikePostMutation();
  const [repost, repostData] = useRepostMutation();

  const [isLiked, setIsLiked] = useState(false);

  const is300 = useMediaQuery("(min-width:300px)");
  const is400 = useMediaQuery("(min-width:400px)");
  const is500 = useMediaQuery("(min-width:500px)");
  const is700 = useMediaQuery("(min-width:700px)");

  // Like/unlike handler
  const handleLike = async () => {
    if (!e?._id) return;
    await likePost(e._id);
    setIsLiked((prev) => !prev);
  };

  // Check if the current user liked this post
  useEffect(() => {
    if (e?.likes?.some((like) => like._id === myInfo?._id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [e, myInfo]);

  // Repost handler
  const handleRepost = async () => {
    if (!e?._id) return;
    await repost(e._id);
  };

  // Handle repost success/error
  useEffect(() => {
    if (repostData.isSuccess) {
      toast.success(repostData.data.msg, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    }
    if (repostData.isError) {
      toast.error(repostData.error?.data?.msg || "Error occurred", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    }
  }, [repostData.isSuccess, repostData.isError]);

  if (!e) return null; // Early return if no post data

  return (
    <Stack direction="column" justifyContent="space-between" gap={2}>
      {/* Post Content */}
      <Stack direction="column" gap={1}>
        <Typography
          variant="h6"
          fontSize={is300 ? "1rem" : "0.8rem"}
          fontWeight="bold"
        >
          {e?.admin?.userName || ""}
        </Typography>
        <Link to={`/post/${e?._id}`} className="link">
          <Typography
            variant="h5"
            fontSize={
              is700 ? "1.2rem" : is400 ? "1rem" : is300 ? "0.9rem" : "0.8rem"
            }
            className={darkMode ? "mode" : ""}
          >
            {e?.text || ""}
          </Typography>
        </Link>
        {e?.media && (
          <img
            src={e.media}
            alt="post media"
            loading="lazy"
            width={
              is700
                ? 400
                : is500
                ? 350
                : is400
                ? 250
                : is300
                ? 180
                : 150
            }
            height="auto"
          />
        )}
      </Stack>

      {/* Post Actions */}
      <Stack direction="column" gap={1}>
        <Stack direction="row" gap={2} m={1}>
          {isLiked ? (
            <FaHeart
              size={is700 ? 32 : is300 ? 28 : 24}
              color="red"
              onClick={handleLike}
              className="image-icon"
            />
          ) : (
            <FaRegHeart
              size={is700 ? 32 : is300 ? 28 : 24}
              onClick={handleLike}
              className="image-icon"
            />
          )}

          <Link to={`/post/${e?._id}#comment`} className="link">
            <FaRegComment size={is700 ? 32 : is300 ? 28 : 24} />
          </Link>

          <FaRetweet
            size={is700 ? 32 : is300 ? 28 : 24}
            onClick={handleRepost}
            className="image-icon"
          />
          <IoMdSend size={is700 ? 32 : is300 ? 28 : 24} />
        </Stack>

        {/* Likes and Comments Count */}
        <Stack direction="row" gap={1} pl={1}>
          {e?.likes?.length > 0 && (
            <Typography
              variant="caption"
              color={darkMode ? "white" : "GrayText"}
              fontSize={is700 ? "1.1rem" : "1rem"}
            >
              {e.likes.length} like{e.likes.length > 1 ? "s" : ""}.
            </Typography>
          )}
          {e?.comments?.length > 0 && (
            <Typography
              variant="caption"
              color={darkMode ? "white" : "GrayText"}
              fontSize={is700 ? "1.1rem" : "1rem"}
            >
              {e.comments.length} comment{e.comments.length > 1 ? "s" : ""}
            </Typography>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PostTwo;