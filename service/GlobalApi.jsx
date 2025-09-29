import axios from "axios";

// Base URL and API key from environment variables
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:1337";
const API_KEY = import.meta.env.VITE_STRAPI_API_KEY || "";

// Axios instance
const axiosClient = axios.create({
  baseURL: BASE_URL + "/api/",
  headers: {
    "Content-Type": "application/json",
    "Authorization": API_KEY ? `Bearer ${API_KEY}` : undefined,
  },
});

// Safe API calls
const CreateNewResume = async (data) => {
  try {
    const res = await axiosClient.post("/user-resumes", data);
    return res.data;
  } catch (err) {
    console.error("CreateNewResume error:", err?.response?.data || err.message);
    return null;
  }
};

const GetUserResumes = async (userEmail) => {
  if (!userEmail) return null;
  try {
    const res = await axiosClient.get(
      `/user-resumes?filters[userEmail][$eq]=${encodeURIComponent(userEmail)}`
    );
    return res.data;
  } catch (err) {
    console.error("GetUserResumes error:", err?.response?.data || err.message);
    return null;
  }
};

const UpdateResumeDetail = async (id, data) => {
  if (!id) return null;
  try {
    const res = await axiosClient.put(`/user-resumes/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("UpdateResumeDetail error:", err?.response?.data || err.message);
    return null;
  }
};

const GetResumeById = async (id) => {
  if (!id) return null;
  try {
    const res = await axiosClient.get(`/user-resumes/${id}?populate=*`);
    return res.data;
  } catch (err) {
    console.error("GetResumeById error:", err?.response?.data || err.message);
    return null;
  }
};

const DeleteResumeById = async (id) => {
  if (!id) return null;
  try {
    const res = await axiosClient.delete(`/user-resumes/${id}`);
    return res.data;
  } catch (err) {
    console.error("DeleteResumeById error:", err?.response?.data || err.message);
    return null;
  }
};

export {
  CreateNewResume,
  GetUserResumes,
  UpdateResumeDetail,
  GetResumeById,
  DeleteResumeById,
};
