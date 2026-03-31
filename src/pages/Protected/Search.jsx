import { Stack, Typography } from "@mui/material";
import ProfileBar from "../../components/search/ProfileBar";
import SearchInput from "../../components/search/SearchInput";


const Search = () => {

  return (
    <>
      <SearchInput />
      <Stack flexDirection={"column"} gap={1} mb={5} width={"100%"} mx={"auto"}>

        <ProfileBar />;

        <Typography variant="h6" textAlign={"center"} mb={5}>
          Start searching...
        </Typography>
      </Stack>
    </>
  );
};
export default Search;
