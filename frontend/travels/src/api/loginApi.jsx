import axios from "axios";

export const LoginApi = async ({ email, password }) => {
  const url = "http://localhost:5000/api/users/login";
  try {
    const { data } = await axios.post(url, { email, password });
    return data;
  } catch (err) {
    console.error("Login error:", err);
    return null;
  }
};
