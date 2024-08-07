import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useChecktoken = (path) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token =
      JSON.parse(localStorage.getItem("userToken")) &&
      JSON.parse(localStorage.getItem("user"));
    !token ? navigate("/login") : path && navigate(path);
  }, [navigate]);
};

export default useChecktoken;
