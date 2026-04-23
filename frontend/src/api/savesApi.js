import http from "./http";

export const getMySaves = async () => {
  const { data } = await http.get("/users/me/saves");
  return data;
};

export const createMySave = async (payload) => {
  const { data } = await http.post("/users/me/saves", payload);
  return data;
};

export const getMySaveResumeSummary = async (saveId) => {
  const { data } = await http.get(`/users/me/saves/${saveId}/resume-summary`);
  return data;
};

export const deleteMySave = async (saveId) => {
  const { data } = await http.delete(`/users/me/saves/${saveId}`);
  return data;
};

export const getBaseTeamsWithPlayers = async () => {
  const { data } = await http.get("/users/base/teams-with-players");
  return data;
};