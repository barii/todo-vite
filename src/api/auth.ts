import axios from "axios";

export function login(email: string, password: string) {
  return axios.post(`api/auth/login`, {
      "email": email,
      "password": password,
  });
}
