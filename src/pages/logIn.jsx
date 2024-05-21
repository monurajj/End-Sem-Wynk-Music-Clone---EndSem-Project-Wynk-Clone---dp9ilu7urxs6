import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/styles.css";
import loginBackground from "../assets/Screenshot 2024-05-19 at 2.50.08 AM.png";

function SignIn({ setIsLogin, setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSignIn = async (e) => {
    e.preventDefault();
    const user = { email, password, appType: "music" };
    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            projectID: "f104bi07c490",
            accept: "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      const datas = await response.json();
      if (datas.status === "fail") {
        alert("Wrong email or password");
      } else {
        setIsLogin(true);
        setToken(datas.token);
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleOpenRegister = () => {
    navigate("/signup");
  };

  return (
    <>
      <form>
        <div className="loginPage">
          
          <div className="imageOfLoginPage">
            <img
              className="imgJ"
              src={loginBackground}
              alt="Login Background"
            />
          </div>
          <div className="contentOfLoginPage">
            <h1>Log In</h1>
            <p>Welcome back! Log in to access your account</p>

            <div className="inputField">
              <input
                id="email"
                type="email"
                placeholder="Enter Your Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                id="password"
                type="password"
                placeholder="Enter Your Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="login">
              <button type="submit" onClick={handleSignIn}>
                Login
              </button>
            </div>
            <div className="dontHaveAccount">
              <p>
                Don't have an account?{" "}
                <span onClick={() => navigate("/signup")}>Sign Up</span>
              </p>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default SignIn;
