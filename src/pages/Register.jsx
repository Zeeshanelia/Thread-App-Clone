import { Button, Stack, TextField, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";

const Register = () => {
  const _700 = useMediaQuery("(min-width:700px)");

  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" }); // type: "success" | "error"

  const toggleLogin = () => {
    setLogin((pre) => !pre);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ text: data.msg, type: "success" });
      } else {
        setMessage({ text: data.msg, type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Something went wrong", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ text: data.msg, type: "success" });
      } else {
        setMessage({ text: data.msg, type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Something went wrong", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  // auto clear message after 2.5s
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ text: "", type: "" }), 2500);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (isLoading) {
    return (
      <Stack height={"90vh"} alignItems={"center"} justifyContent={"center"}>
        <Typography>Loading...</Typography>
      </Stack>
    );
  }

  return (
    <>
      <Stack
        width={"100%"}
        height={"100vh"}
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"center"}
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
        <Stack flexDirection={"column"} width={_700 ? "40%" : "90%"} gap={2} mt={_700 ? 20 : 0}>
          <Typography
            variant="h5"
            fontSize={_700 ? "1.5rem" : "1rem"}
            fontWeight={"bold"}
            alignSelf={"center"}
          >
            {login ? "Login with email" : "Register with email"}
          </Typography>

          {/* toast message */}
          {message.text && (
            <Typography
              alignSelf={"center"}
              color={message.type === "success" ? "green" : "red"}
              fontSize={"0.9rem"}>

              {message.text}

            </Typography>
          )}

          {login ? null : (
            <TextField
              variant="outlined"
              placeholder="Enter your userName..."
              onChange={(e) => setUserName(e.target.value)}
            />
          )}
          <TextField
            variant="outlined"
            placeholder="Enter your Email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            placeholder="Enter your Password..."
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
            onClick={login ? handleLogin : handleRegister}>
            {login ? "Login" : "Sign Up"}

          </Button>
          <Typography variant="subtitle2"
            fontSize= {_700 ?  "1.3rem"  :  "1rem" }
            alignSelf={"center"}>

            {login ? "Don't have an account?" : "Already have an account?"}

            <span className="login-link" onClick={toggleLogin}>

              {" "}

              {login ? "Sign up" : "Login"}

            </span>
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default Register;