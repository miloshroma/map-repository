import axios from "axios";

export const login = async (login: string, password: string) => {
  return axios.get("https://213.184.245.66:5010/login", {
    headers: {
      "Content-Type": "application/json",
    },
    auth: {
      username: login,
      password: password,
    },
  });
};

export const usersList = async (token: string, page: number) => {
  return axios.get(
    `https://213.184.245.66:5010/api/get_all_people?page=${page}&page_len=3`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
};

export const getImage = async (token: string, url: string) => {
  return axios.get(`https://213.184.245.66:5010${url}`, {
    headers: {
      Authorization: token,
      "Content-type": "image/jpg",
    },
    responseType: "blob",
  });
};
