import axios from "axios"

const base = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

export default base
