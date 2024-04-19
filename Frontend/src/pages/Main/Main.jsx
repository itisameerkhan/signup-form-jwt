import "./Main.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Main = () => {
  const [userData, setUserData] = useState(localStorage.getItem("jwtToken"));
  const navigate = useNavigate();
  console.log(userData);

  const getData = async () => {
    if (userData == null) {
      localStorage.clear("jwtToken");
      navigate("/");
    }
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) return;
    try {
      const response = await axios.get("http://localhost:8080/api/auth", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      console.log(response.data);
      setUserData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="main">
      <h2>username: {userData?.data?.username}</h2>
      <h2>email: {userData?.data?.email}</h2>
      <h2>id: {userData?.data?._id}</h2>
    </div>
  );
};

export default Main;
