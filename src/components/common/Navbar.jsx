import { Stack, useMediaQuery } from "@mui/material";
import { GoHome } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { TbEdit } from "react-icons/tb";
import { CiHeart } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPostModal } from "../../redux/slice";
import { useEffect, useState } from "react";

const Navbar = () => {
  //  FIX: correct state + correct property
  const { darkMode, myInfo } = useSelector((state) => state.service);

  const _300 = useMediaQuery("(min-width:300px)");
  const _700 = useMediaQuery("(min-width:700px)");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [showArrow, setShowArrow] = useState(false);

  //  FIX: don't use window.location directly
  useEffect(() => {
    if (location.pathname.includes("/post/") && _700) {
      setShowArrow(true);
    } else {
      setShowArrow(false);
    }
  }, [location.pathname, _700]);

  const handleAddPost = () => {
    dispatch(addPostModal(true));
  };

  const handleNavigate = () => {
    navigate(-1);
  };

  return (
    <Stack
      flexDirection="row"
      maxWidth="100%"
      justifyContent="space-around"
      alignItems="center"
    >
      {/*  Back Arrow */}
      {showArrow && (
        <FiArrowLeft
          size={_300 ? 32 : 24}
          className="image-icon"
          onClick={handleNavigate}
          color={darkMode ? "white" : "black"}
        />
      )}

      {/*  Home */}
      <Link to="/" className="link">
        <GoHome size={_300 ? 32 : 24} color={darkMode ? "white" : "black"} />
      </Link>

      {/*  Search */}
      <Link to="/search" className="link">
        <IoIosSearch
          size={_300 ? 32 : 24}
          color={darkMode ? "white" : "black"}
        />
      </Link>

      {/*  Add Post */}
      <TbEdit
        size={_300 ? 32 : 24}
        className="image-icon"
        color={darkMode ? "white" : "black"}
        onClick={handleAddPost}
      />

      {/*  Likes */}
      <CiHeart
        size={_300 ? 32 : 24}
        color={darkMode ? "white" : "black"}
      />

      <Link to={`/profile/${myInfo?._id}`} className="link">
        <RxAvatar
          size={_300 ? 32 : 24}
          color={darkMode ? "white" : "black"}
        />
      </Link>
    </Stack>
  );
};

export default Navbar;