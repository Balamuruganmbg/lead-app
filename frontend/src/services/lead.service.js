import api from "../api/axios";

export const getLeads = async () => {
  const res = await api.get("/leads");
  return res.data;
};

export const createLead = async (lead) => {
  const res = await api.post("/leads", lead);
  return res.data;
};

export const updateLead = async (id, lead) => {
  const res = await api.put(`/leads/${id}`, lead);
  return res.data;
};

export const deleteLead = async (id) => {
  await api.delete(`/leads/${id}`);
};
