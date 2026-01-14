import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000/code",
  headers: {
    "Content-Type": "application/json",
  },
});
