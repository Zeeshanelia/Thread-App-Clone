import { Stack, TextField, Typography } from "@mui/material";
import Post from "../../components/home/Post";
import Comments from "../../components/home/post/Comments";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SinglePost = () => {
  const params = useParams();

  const [comment, setComment] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState({ text: "", type: "" });

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/post/${params?.id}`); // adjust URL
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error("Failed to fetch post:", err);
    }
  };

  const handleAddComment = async (e) => {
    if (data && e.key === "Enter") {
      try {
        const res = await fetch(`/api/post/${data.post._id}/comment`, { // adjust URL
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: comment }),
        });
        const result = await res.json();
        if (res.ok) {
          setComment("");
          setMsg({ text: result.msg, type: "success" });
          fetchPost();
        } else {
          setMsg({ text: result.msg, type: "error" });
        }
      } catch (err) {
        setMsg({ text: "Comment failed", type: "error" });
      } finally {
        setTimeout(() => setMsg({ text: "", type: "" }), 2500);
      }
    }
  };

  useEffect(() => {
    fetchPost();
  }, [params?.id]);

  return (
    <>
      <Stack flexDirection={"column"} my={5} gap={2}>
        {msg.text && (
          <Typography
            textAlign={"center"}
            color={msg.type === "success" ? "green" : "red"}
            fontSize={"0.9rem"}
          >
            {msg.text}
          </Typography>
        )}
        <Post e={data?.post} />
        <Stack flexDirection={"column"} gap={2} width={"80%"} mx={"auto"}>
          {data
            ? data.post?.comments?.length > 0
              ? data.post.comments.map((e) => {
                  return <Comments key={e._id} e={e} postId={data?.post._id} />;
                })
              : null
            : null}
        </Stack>
        <TextField
          variant="outlined"
          autoFocus
          placeholder="Comment here..."
          id="comment"
          sx={{ width: "50%", mx: "auto", my: 5, p: 1 }}
          onChange={(e) => setComment(e.target.value)}
          onKeyUp={handleAddComment}
          value={comment}
        />
      </Stack>
    </>
  );
};

export default SinglePost;