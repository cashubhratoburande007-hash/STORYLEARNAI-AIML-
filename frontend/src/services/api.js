import axios from "axios";

const API = axios.create({
    baseURL: "https://storylearnai-aiml.onrender.com",
});

export default API;