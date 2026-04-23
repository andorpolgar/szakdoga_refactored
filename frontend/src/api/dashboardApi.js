import http from "./http";

export const getDashboard = async (saveId) => {
  const { data } = await http.get(`/users/saves/${saveId}/dashboard`);
  return data;
};