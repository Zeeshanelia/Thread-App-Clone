import { Button, Stack, TextField, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useLoginMutation, useSigninMutation } from "../redux/service";
import { Bounce, toast } from "react-toastify";
import Loading from "../components/common/Loading";

const Register = () => {
  const _700 = useMediaQuery("(min-width:700px)");

  const [signinUser, signinUserData] = useSigninMutation();
  const [loginUser, loginUserData] = useLoginMutation();

  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleLogin = () => setLogin(prev => !prev);

  const handleLogin = async () => {
    if (!email || !password) return toast.error("Please enter all fields");
    await loginUser({ email, password });
  };

  const handleRegister = async () => {
    if (!userName || !email || !password) return toast.error("Please enter all fields");
    await signinUser({ userName, email, password });
  };

  useEffect(() => {
    if (signinUserData.isSuccess) {
      toast.success(signinUserData.data?.msg || "Registered successfully!", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    } else if (signinUserData.isError) {
      toast.error(signinUserData.error?.data?.msg || "Registration failed", {
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
  }, [signinUserData.isSuccess, signinUserData.isError]);

  useEffect(() => {
    if (loginUserData.isSuccess) {
      toast.success(loginUserData.data?.msg || "Logged in successfully!", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    } else if (loginUserData.isError) {
      toast.error(loginUserData.error?.data?.msg || "Login failed", {
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
  }, [loginUserData.isSuccess, loginUserData.isError]);

  if (signinUserData.isLoading || loginUserData.isLoading) {
    return (
      <Stack height="90vh" alignItems="center" justifyContent="center">
        <Loading />
      </Stack>
    );
  }

  return (
    <Stack
      width="100%"
      height="100vh"
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={
        _700
          ? {
              backgroundImage: 'url("/register-bg.webp")',
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 600px",
            }
          : null
      }
    >
      <Stack flexDirection="column" width={_700 ? "40%" : "90%"} gap={2} mt={_700 ? 20 : 0}>
        <Typography
          variant="h5"
          fontSize={_700 ? "1.5rem" : "1rem"}
          fontWeight="bold"
          alignSelf="center"
        >
          {login ? "Login with Email" : "Register with Email"}
        </Typography>

        {!login && (
          <TextField
            variant="outlined"
            placeholder="Enter your UserName..."
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        )}
        <TextField
          variant="outlined"
          placeholder="Enter your Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          placeholder="Enter your Password..."
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          size="large"
          sx={{
            width: "100%",
            height: 52,
            bgcolor: "green",
            color: "white",
            fontSize: "1rem",
            ":hover": {
              bgcolor: "blue",
              cursor: "pointer",
            },
          }}
          onClick={login ? handleLogin : handleRegister}
        >
          {login ? "Login" : "Sign Up"}
        </Button>

        <Typography
          variant="subtitle2"
          fontSize={_700 ? "1.3rem" : "1rem"}
          alignSelf="center"
        >
          {login ? "Don't have an account?" : "Already have an account?"}
          <span className="login-link" onClick={toggleLogin}>
            {login ? " Sign Up" : " Login"}
          </span>
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Register;