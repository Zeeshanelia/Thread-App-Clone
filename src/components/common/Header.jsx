import { Grid, Stack, useMediaQuery } from "@mui/material";
import Navbar from "./Navbar";
import { IoMenu } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toggleMainMenu } from "../../redux/slice";

const Header = () => {
  // correct state path + correct property
  const { darkMode } = useSelector((state) => state.service);

  const _700 = useMediaQuery("(min-width:700px)");
  const dispatch = useDispatch();

  const handleOpenMenu = (e) => {
    dispatch(toggleMainMenu(e.currentTarget));
  };

  return (
    <>
      {_700 ? (
        <Stack
          flexDirection="row"
          height={52}
          justifyContent="space-around"
          alignItems="center"
          position="sticky"
          top={0}
          py={1}
          zIndex={10}
          bgcolor={darkMode ? "#000" : "#fff"}
        >
          {/*  Logo */}
          <img
            src={
              darkMode
                ? "/Threads-logo-black-bg.webp"
                : "/Threads-logo-white-bg.png"
            }
            alt="logo"
            width={60}
            height={darkMode ? 50 : 35}
          />

          {/*  Navbar */}
          <Stack
            justifyContent="center"
            width="550px"
            bgcolor={darkMode ? "" : "aliceblue"}
            zIndex={2}
            height={96}
          >
            <Navbar />
          </Stack>

          {/*  Menu Icon */}
          <IoMenu
            size={36}
            className="image-icon"
            color="gray"
            onClick={handleOpenMenu}
          />
        </Stack>
      ) : (
        <>
          {/*  Bottom Navbar (Mobile) */}
          <Stack
            position="fixed"
            bottom={0}
            justifyContent="center"
            width="100%"
            height={52}
            p={1}
            bgcolor={darkMode ? "#000" : "aliceblue"}
            zIndex={10}
          >
            <Navbar />
          </Stack>

          {/*  Top Header (Mobile) */}
          <Grid
            container
            height={60}
            justifyContent="space-between"
            alignItems="center"
            p={1}
          >
            <Grid item>
              <img
                src="/Threads-logo-white-bg.png"
                alt="logo"
                width={60}
                height={35}
              />
            </Grid>

            <Grid item>
              <IoMenu
                size={36}
                className="image-icon"
                color="gray"
                onClick={handleOpenMenu}
              />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Header;