import { Stack, useMediaQuery } from "@mui/material";
import { GoHome } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { TbEdit } from "react-icons/tb";
import { CiHeart } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoMenuSharp } from "react-icons/io5";
import Navbar from "./Navbar";


const Header = () => {
  const _300 = useMediaQuery("(min-width:300px)");
  const _700 = useMediaQuery("(min-width:700px)");

  const navigate = useNavigate();
  const [showArrow, setShowArrow] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);

  const checkArrow = () => {
    if (window.location.pathname.includes("/post/") && _700) {
      setShowArrow(true);
      return;
    }
    setShowArrow(false);
  };

  const handleAddPost = () => {
    setShowPostModal(true);
  };

  const handleNavigate = () => {
    navigate(-1);
  };

  useEffect(() => {
    checkArrow();
  }, [window.location.pathname]);

  return (
    <>
      <Stack
        flexDirection={"row"}
        height={54}
        justifyContent={"space-around"}
        alignItems={"center"}
        py={1}
        top={0}
        position={"sticky"}>

        <img src="/Threads-logo-black-bg.webp" alt="" width={40} height={48} />

        <Stack
          flexDirection={"row"}
          width={'500px'}
          height={82}
          justifyContent={"center"}
          zIndex={2}
          bgcolor={"aliceblue"}>
          <Navbar />
          </Stack >

          <IoMenuSharp size={32} />
        </Stack>
      </>
      );
};

      export default Header;