import axios from "axios";

export const api = axios.create({ 
  // If deployed to Render, use "/api". If running locally, use localhost.
  baseURL: import.meta.env.PROD ? "/api" : "http://localhost:8000/api" 
});
