import sleep from "../utils/sleep";
import { UserState } from "../features/user/userSlice";
import handleErrors from "./middleWare";
import baseUrl from "./configs";

const userInit: UserState = {
  id: "",
  fname: "unauth",
  lname: "unauth",
  email: "unauth@studentcompass.com",
  role: "unauth",
  jwt: "",
};

class AuthService {
  //unauth
  static async login(email: String, password: String) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ email: email, password: password }),
    };

    const response = await fetch(baseUrl + "/api/users/login", requestOptions);
    await handleErrors(response);
    const jsonResponse = await response.json();
    return jsonResponse;
  }

  static async logout() {
    await sleep(1000);
    return userInit;
  }
}

export default AuthService;
