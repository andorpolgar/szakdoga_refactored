import http from "./http";

export const registerUser = async (payload) => {
  const { data } = await http.post("/users", payload);
  return data;
};

export const loginUser = async (payload) => {
  const { data } = await http.post("/users/auth/login", payload);
  return data;
};

export const getMe = async () => {
  const { data } = await http.get("/users/auth/me");
  return data;
};