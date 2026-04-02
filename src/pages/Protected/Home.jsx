import { Button, Stack, Typography } from "@mui/material";
import Input from "../../components/home/Input";
import Post from "../../components/home/Post";
import Loading from "../../components/common/Loading";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAllPostQuery } from "../../redux/service";

const Home = () => {
  const [page, setPage] = useState(1);
  const [showMore, setShowMore] = useState(true);

  const { darkMode, allPosts } = useSelector((state) => state.service);

  //  Fetch posts from API
  const { data, isLoading } = useAllPostQuery(page);

  const handleClick = () => {
    setPage((prev) => prev + 1);
  };

  //  Control "Load More"
  useEffect(() => {
    if (data?.posts?.length < 3) {
      setShowMore(false);
    }
  }, [data]);

  return (
    <>
      <Input />

      <Stack flexDirection="column" gap={2} mb={10}>
        {isLoading && page === 1 ? (
          <Loading />
        ) : allPosts?.length > 0 ? (
          allPosts.map((e) => <Post key={e._id} e={e} />)
        ) : (
          <Typography variant="caption" textAlign="center">
            No post yet !
          </Typography>
        )}
      </Stack>

      {/*  Load More Button */}
      {showMore ? (
        <Button
          size="large"
          sx={{
            my: 5,
            p: 3,
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={handleClick}
        >
          {isLoading ? "Loading..." : "Load More"}
        </Button>
      ) : (
        allPosts?.length > 0 && (
          <Typography variant="h6" textAlign="center" mb={5}>
            You have reached the end !
          </Typography>
        )
      )}
    </>
  );
};

export default Home;