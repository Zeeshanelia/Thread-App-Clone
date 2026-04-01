import { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";

const Register = () => {
  const _700 = useMediaQuery("(min-width:700px)");

  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const toggleLogin = () => setLogin((pre) => !pre);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      setMessage({ text: data.msg, type: res.ok ? "success" : "error" });
    } catch {
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
      setMessage({ text: data.msg, type: res.ok ? "success" : "error" });
    } catch {
      setMessage({ text: "Something went wrong", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ text: "", type: "" }), 2500);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .reg-root {
          min-height: 100vh;
          display: flex;
          font-family: 'DM Sans', sans-serif;
          background: #0a0a0a;
          overflow: hidden;
        }

        /* Left panel — only on wide screens */
        .reg-left {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .reg-left-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%);
        }
        .reg-left-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.35;
        }
        .blob1 { width: 400px; height: 400px; background: #e94560; top: -80px; left: -80px; }
        .blob2 { width: 300px; height: 300px; background: #0f3460; bottom: 50px; right: -50px; }
        .blob3 { width: 200px; height: 200px; background: #533483; top: 50%; left: 50%; transform: translate(-50%,-50%); }

        .reg-left-content {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 40px;
          color: white;
        }
        .reg-brand {
          font-family: 'Syne', sans-serif;
          font-size: 3.5rem;
          font-weight: 800;
          letter-spacing: -2px;
          line-height: 1;
          margin-bottom: 16px;
        }
        .reg-brand span { color: #e94560; }
        .reg-tagline {
          font-size: 1rem;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .reg-dots {
          margin-top: 60px;
          display: flex;
          gap: 10px;
          justify-content: center;
        }
        .reg-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
        }
        .reg-dot.active { background: #e94560; width: 24px; border-radius: 4px; }

        /* Right panel */
        .reg-right {
          width: 100%;
          max-width: 480px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 32px;
          background: #111111;
          position: relative;
        }
        .reg-right::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 1px; height: 100%;
          background: linear-gradient(to bottom, transparent, #e94560 30%, #e94560 70%, transparent);
          opacity: 0.3;
        }

        .reg-form-wrap {
          width: 100%;
          max-width: 380px;
        }

        .reg-form-title {
          font-family: 'Syne', sans-serif;
          font-size: 2rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 6px;
          letter-spacing: -1px;
        }
        .reg-form-sub {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.4);
          margin-bottom: 36px;
        }

        .reg-tabs {
          display: flex;
          gap: 0;
          margin-bottom: 32px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          overflow: hidden;
        }
        .reg-tab {
          flex: 1;
          padding: 10px;
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.4);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        .reg-tab.active {
          background: #e94560;
          color: white;
        }

        .reg-field {
          margin-bottom: 16px;
        }
        .reg-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 500;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 8px;
        }
        .reg-input {
          width: 100%;
          padding: 14px 16px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          color: white;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .reg-input::placeholder { color: rgba(255,255,255,0.2); }
        .reg-input:focus {
          border-color: #e94560;
          background: rgba(233,69,96,0.05);
        }

        .reg-msg {
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 0.85rem;
          margin-bottom: 16px;
          text-align: center;
        }
        .reg-msg.success { background: rgba(34,197,94,0.1); color: #4ade80; border: 1px solid rgba(34,197,94,0.2); }
        .reg-msg.error   { background: rgba(233,69,96,0.1);  color: #e94560; border: 1px solid rgba(233,69,96,0.2); }

        .reg-btn {
          width: 100%;
          padding: 15px;
          background: #e94560;
          border: none;
          border-radius: 10px;
          color: white;
          font-family: 'Syne', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          cursor: pointer;
          margin-top: 8px;
          transition: background 0.2s, transform 0.1s;
          position: relative;
          overflow: hidden;
        }
        .reg-btn:hover { background: #c73652; }
        .reg-btn:active { transform: scale(0.98); }
        .reg-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .reg-footer {
          text-align: center;
          margin-top: 24px;
          font-size: 0.875rem;
          color: rgba(255,255,255,0.3);
        }
        .reg-footer span {
          color: #e94560;
          cursor: pointer;
          font-weight: 500;
        }
        .reg-footer span:hover { text-decoration: underline; }

        /* mobile full width */
        @media (max-width: 700px) {
          .reg-right { max-width: 100%; min-height: 100vh; }
          .reg-right::before { display: none; }
        }
      `}</style>

      <div className="reg-root">
        {_700 && (
          <div className="reg-left">
            <div className="reg-left-bg" />
            <div className="reg-left-blob blob1" />
            <div className="reg-left-blob blob2" />
            <div className="reg-left-blob blob3" />
            <div className="reg-left-content">
              <div className="reg-brand">thread<span>s</span></div>
              <div className="reg-tagline">say what's on your mind</div>
              <div className="reg-dots">
                <div className="reg-dot active" />
                <div className="reg-dot" />
                <div className="reg-dot" />
              </div>
            </div>
          </div>
        )}

        <div className="reg-right">
          <div className="reg-form-wrap">
            <div className="reg-form-title">{login ? "Welcome back" : "Create account"}</div>
            <div className="reg-form-sub">{login ? "Sign in to continue" : "Join the conversation today"}</div>

            <div className="reg-tabs">
              <button className={`reg-tab ${!login ? "active" : ""}`} onClick={() => setLogin(false)}>Sign Up</button>
              <button className={`reg-tab ${login ? "active" : ""}`} onClick={() => setLogin(true)}>Login</button>
            </div>

            {message.text && (
              <div className={`reg-msg ${message.type}`}>{message.text}</div>
            )}

            {!login && (
              <div className="reg-field">
                <label className="reg-label">Username</label>
                <input className="reg-input" placeholder="your_username" onChange={(e) => setUserName(e.target.value)} />
              </div>
            )}
            <div className="reg-field">
              <label className="reg-label">Email</label>
              <input className="reg-input" type="email" placeholder="you@example.com" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="reg-field">
              <label className="reg-label">Password</label>
              <input className="reg-input" type="password" placeholder="••••••••" onChange={(e) => setPassword(e.target.value)} />
            </div>

            <button
              className="reg-btn"
              disabled={isLoading}
              onClick={login ? handleLogin : handleRegister}
            >
              {isLoading ? "Please wait..." : login ? "Login" : "Create Account"}
            </button>

            <div className="reg-footer">
              {login ? "Don't have an account? " : "Already have an account? "}
              <span onClick={toggleLogin}>{login ? "Sign up" : "Login"}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;