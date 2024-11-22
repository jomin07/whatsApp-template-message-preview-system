import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const parseTemplate = async (template, data) => {
  const response = await axios.get(`${API_URL}/parse`, {
    template,
    data,
  });
  return response.data;
};

export const validateTemplate = async (template) => {
  const response = await axios.get(`${API_URL}/validate`, {
    params: { template },
  });
  return response.data;
};

export const previewTemplate = async (template, sampleData) => {
  const response = await axios.post(`${API_URL}/preview`, {
    template,
    sampleData,
  });
  return response.data;
};
