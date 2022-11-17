import axios from "axios";
import API from "./routes";

const authApi = {
  login: async () => {
    await axios.get(API.LOGIN, { withCredentials: true });
  },
  logout: async () => {
    await axios.delete(API.LOGOUT, { withCredentials: true });
  },
  getUserInfo: async () => {
    const data = await axios.get(API.USER_INFO, { withCredentials: true });
    return data;
  },
};

export default authApi;
