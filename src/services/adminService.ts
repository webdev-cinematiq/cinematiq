import axios from 'axios';

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ADMINS_API = `${REMOTE_SERVER}/api/admins`;

export const fetchAllAdmins = async () => {
  const { data } = await axios.get(ADMINS_API);
  return data;
};

export const findAdminByUserId = async (adminId: any) => {
  const { data } = await axios.get(`${ADMINS_API}/${adminId}`);
  return data;
};

export const createAdmin = async (admin: any) => {
  const response = await axios.post(ADMINS_API, admin);
  return response.data;
};

export const updateAdmin = async (admin: any) => {
  const response = await axios.put(`${ADMINS_API}/${admin._id}`, admin);
  return response.data;
};

export const deleteAdmin = async (adminId: string) => {
  const response = await axios.delete(`${ADMINS_API}/${adminId}`);
  return response.data;
};

export const addAdminAction = async (adminId: string, action: any) => {
  const response = await axios.post(`${ADMINS_API}/${adminId}/actions`, action);
  return response.data;
};

export const findAdminsByPermission = async (permission: string) => {
  const { data } = await axios.get(`${ADMINS_API}/permission/${permission}`);
  return data;
};

export const addPermissionToAdmin = async (adminId: string, permission: string) => {
  const response = await axios.post(`${ADMINS_API}/${adminId}/permissions`, { permission });
  return response.data;
};

export const removePermissionFromAdmin = async (adminId: string, permission: string) => {
  const response = await axios.delete(`${ADMINS_API}/${adminId}/permissions/${permission}`);
  return response.data;
};

export const fetchAdminPermissions = async (adminId: string) => {
  const response = await axios.get(`${ADMINS_API}/${adminId}/permissions`);
  return response.data;
};