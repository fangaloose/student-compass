import handleErrors from "./middleWare";
import baseUrl from "./configs";

import  genpass  from "password-generator";

class UserService {
  //admin
  static async getAllUsers() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const response = await fetch(baseUrl + "/api/users", requestOptions);
    await handleErrors(response);
    const jsonResponse = await response.json();
    return jsonResponse;
  }

  //teacher
  static async getCourse(id: string) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const response = await fetch(
      baseUrl + "/api/users/" + id + "/courses",
      requestOptions
    );
    await handleErrors(response);
    const jsonResponse = await response.json();
    return jsonResponse;
  }

  //student
  static async getCourseStudent(id: string) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const response = await fetch(
      baseUrl + "/api/users/" + id + "/courses/current",
      requestOptions
    );
    await handleErrors(response);
    const jsonResponse = await response.json();
    return jsonResponse;
  }

  //admin
  static async postUser(
    fname: string,
    lname: string,
    email: string,
    role: string
  ) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        fname: fname,
        lname: lname,
        email: email,
        role: role,
        password: genpass(),
      }),
    };

    const response = await fetch(baseUrl + "/api/users/", requestOptions);
    await handleErrors(response);
    const jsonResponse = await response.json();
    return jsonResponse;
  }

  //admin
  static async deleteUser(id: string) {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    const response = await fetch(baseUrl + "/api/users/" + id, requestOptions);
    await handleErrors(response);
  }

  //admin+teacher+student
  static async changePassUser(id: string, password: string,oldpassword:string) {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ password: password,oldpassword:oldpassword }),
    };

    const response = await fetch(baseUrl + "/api/users/" + id, requestOptions);
    await handleErrors(response);
    const jsonResponse = await response.json();
    return jsonResponse;
  }
}

export default UserService;
