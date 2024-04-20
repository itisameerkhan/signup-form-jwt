import { useEffect, useState } from "react";
import axios from "axios";
import "./Register.scss";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("Signup");
  const [passBtn, setPassBtn] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: null,
    email: null,
    password: null,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    setErrorMessage("");
    e.preventDefault();

    if (value === "Signup") {
      const data = await axios.post(
        "http://localhost:8080/api/signup",
        userInfo
      );
      console.log(data.data);

      if (!data.data.success) {
        setErrorMessage(data.data.errorMessage);
      } else {
        localStorage.setItem("jwtToken", data.data.jwtToken);
        navigate("/main");
      }
    } else if (value == "Login") {
      const data = await axios.post(
        "http://localhost:8080/api/login",
        userInfo
      );
      if (!data.data.success) {
        setErrorMessage(data.data.errorMessage);
      } else {
        localStorage.setItem("jwtToken", data.data.jwtToken);
        navigate("/main");
      }
    }
  };

  const isAuth = async () => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) return;
    try {
      const response = await axios.get("http://localhost:8080/api/auth", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      console.log(response.data);
      navigate("/main");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <div className="register-main">
      <div className="register">
        <p className="title">{value}</p>
        <form onSubmit={handleSubmit}>
          {value === "Signup" && (
            <div>
              <label>username</label>
              <input
                type="text"
                required
                name="username"
                onChange={(e) =>
                  setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
                }
              />
            </div>
          )}

          <div>
            <label>email</label>
            <input
              type="email"
              required
              name="email"
              onChange={(e) =>
                setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div>
            <label>password</label>
            <div className="password-div">
              <input
                type={passBtn ? "text" : "password"}
                name="password"
                required
                onChange={(e) =>
                  setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
                }
              />
              <span
                className="material-symbols-outlined"
                onClick={() => setPassBtn(!passBtn)}
              >
                {passBtn ? "visibility_off" : "visibility"}
              </span>
            </div>
          </div>
          <input type="submit" className="submit-btn" value={value} />
          <p className="error-message">{errorMessage}</p>
          {value === "Signup" ? (
            <p className="switch">
              Already having an Account?
              <span
                onClick={() => {
                  setErrorMessage("");
                  setValue("Login");
                }}
              >
                Login
              </span>
            </p>
          ) : (
            <p className="switch">
              Not having an Account?
              <span
                onClick={() => {
                  setErrorMessage("");

                  setValue("Signup");
                }}
              >
                Signup
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
