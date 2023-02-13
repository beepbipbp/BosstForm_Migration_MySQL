import React from "react";
import { useNavigate } from "react-router-dom";
import FormLayout from "components/template/Layout";
import axios from "axios";

export default function Redirect() {
  const navigate = useNavigate();

  const code = window.location.search.split("=")[1];
  axios
    .get(`${process.env.REACT_APP_SERVER_ORIGIN_URL}/api/users/login?code=${code}`, { withCredentials: true })
    .then((res) => {
      if (res.data.success) {
        navigate("/myforms");
      }
    });

  return <div />;
}
