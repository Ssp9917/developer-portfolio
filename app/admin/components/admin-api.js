import axios from "axios";

const api = axios.create({
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export async function adminGet(url) {
  const res = await api.get(url);
  if (!res.data.success) throw new Error(res.data.message || "Request failed");
  return res.data.data;
}

export async function adminPost(url, body) {
  const res = await api.post(url, body);
  if (!res.data.success) throw new Error(res.data.message || "Request failed");
  return res.data.data;
}

export async function adminPut(url, body) {
  const res = await api.put(url, body);
  if (!res.data.success) throw new Error(res.data.message || "Request failed");
  return res.data.data;
}

export async function adminDelete(url) {
  const res = await api.delete(url);
  if (!res.data.success) throw new Error(res.data.message || "Request failed");
  return res.data.data;
}

export { api };
