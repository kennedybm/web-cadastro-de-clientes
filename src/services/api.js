import axios from "axios";

export const cadastroAPI = axios.create({
  baseURL: "https://registerclientsapi.herokuapp.com/",
});
