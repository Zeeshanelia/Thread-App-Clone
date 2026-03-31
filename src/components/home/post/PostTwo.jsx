import { Stack, Typography, useMediaQuery } from "@mui/material";
import { FaRegHeart, FaRegComment, FaRetweet, FaHeart } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const PostTwo = ({ e, darkMode = false }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [repostMsg, setRepostMsg] = useState({ text: "", type: "" });

  const _300 = useMediaQuery("(min-width:300px)");
  const _400 = useMediaQuery("(min-width:400px)");
  const _500 = useMediaQuery("(min-width:500px)");
  const _700 = useMediaQuery("(min-width:700px)");

  const handleLike = () => {};
  const handleRepost = () => {};

  return (
    <>
      {repostMsg.text && (
        <Typography
          textAlign={"center"}
          color={repostMsg.type === "success" ? "green" : "red"}
          fontSize={"0.9rem"}
        >
          {repostMsg.text}
        </Typography>
      )}
      <Stack flexDirection={"column"} justifyContent={"space-between"}>
        <Stack flexDirection={"column"} gap={2}>
          <Stack flexDirection={"column"}>
            <Typography
              variant="h6"
              fontSize={_300 ? "1rem" : "0.8rem"}
              fontWeight={"bold"}
            >
              {e ? e.admin.userName : ""}
            </Typography>
            <Link to={`/post/${e?._id}`} className="link">
              <Typography
                variant="h5"
                fontSize={
                  _700 ? "1.2rem" : _400 ? "1rem" : _300 ? "0.9rem" : "0.8rem"
                }
                className={darkMode ? "mode" : ""}
              >
                {e ? e.text : ""}
              </Typography>
            </Link>
          </Stack>
          {e ? (
            e.media ? (
              <img
                src="/error-bg.png"
                alt={e?.media}
                loading="lazy"
                width={
                  _700
                    ? "400px"
                    : _500
                    ? "350px"
                    : _400
                    ? "250px"
                    : _300
                    ? "180px"
                    : "150px"
                }
                height={"auto"}
              />
            ) : null
          ) : null}
        </Stack>

        <Stack flexDirection={"column"} gap={1}>
          <Stack flexDirection={"row"} gap={2} m={1}>
            {isLiked ? (
              <FaHeart size={_700 ? 32 : _300 ? 28 : 24} onClick={handleLike} />
            ) : (
              <FaRegHeart size={_700 ? 32 : _300 ? 28 : 24} onClick={handleLike} />
            )}
            <Link to={`/post/${e?._id}#comment`} className="link">
              <FaRegComment size={_700 ? 32 : _300 ? 28 : 24} />
            </Link>
            <FaRetweet
              size={_700 ? 32 : _300 ? 28 : 24}
              onClick={handleRepost}
            />
            <IoMdSend size={_700 ? 32 : _300 ? 28 : 24} />
          </Stack>
          <Stack
            flexDirection={"row"}
            gap={1}
            position={"relative"}
            top={-3}
            left={4}
          >
            {e ? (
              e.likes.length > 0 ? (
                <Typography
                  variant="caption"
                  color={darkMode ? "white" : "GrayText"}
                  fontSize={_700 ? "1.1rem" : "1rem"}
                >
                  {e.likes.length} likes .
                </Typography>
              ) : (
                ""
              )
            ) : (
              ""
            )}
            {e ? (
              e.comments.length > 0 ? (
                <Typography
                  variant="caption"
                  color={darkMode ? "white" : "GrayText"}
                  fontSize={_700 ? "1.1rem" : "1rem"}
                >
                  {e.comments.length} comment
                </Typography>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default PostTwo;