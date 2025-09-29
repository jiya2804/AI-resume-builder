import axios from "axios";

// Base URL and API key from environment variables
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:1337";
const API_KEY = import.meta.env.VITE_STRAPI_API_KEY || "";

// Axios instance
const axiosClient = axios.create({
  baseURL: BASE_URL + "/api/",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${API_KEY}`,
  },
});

// API functions
const CreateNewResume = async (data) => {
  try {
    const res = await axiosClient.post("/user-resumes", data);
    return res.data;
  } catch (err) {
    console.error("CreateNewResume error:", err);
    return null;
  }
};

const GetUserResumes = async (userEmail) => {
  try {
    const res = await axiosClient.get(
      `/user-resumes?filters[userEmail][$eq]=${encodeURIComponent(userEmail)}`
    );
    return res.data;
  } catch (err) {
    console.error("GetUserResumes error:", err);
    return null;
  }
};

const UpdateResumeDetail = async (id, data) => {
  try {
    const res = await axiosClient.put(`/user-resumes/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("UpdateResumeDetail error:", err);
    return null;
  }
};

const GetResumeById = async (id) => {
  try {
    const res = await axiosClient.get(`/user-resumes/${id}?populate=*`);
    return res.data;
  } catch (err) {
    console.error("GetResumeById error:", err);
    return null;
  }
};

const DeleteResumeById = async (id) => {
  try {
    const res = await axiosClient.delete(`/user-resumes/${id}`);
    return res.data;
  } catch (err) {
    console.error("DeleteResumeById error:", err);
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
