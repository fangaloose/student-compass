import handleErrors from "./middleWare";
import baseUrl from "./configs";

class TermService {
  //admin + teacher
  static async getAllTerms() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const response = await fetch(baseUrl + "/api/terms", requestOptions);
    await handleErrors(response);
    const jsonResponse = await response.json();
    return jsonResponse;
  }

  //student
  static async getCurrentTerm() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const response = await fetch(
      baseUrl + "/api/terms/current",
      requestOptions
    );
    await handleErrors(response);
    const jsonResponse = await response.json();
    return jsonResponse;
  }

  //admin
  static async postTerm(name: string, startDate: string, endDate: string) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: name,
        startDate: startDate,
        endDate: endDate,
      }),
    };

    const response = await fetch(baseUrl + "/api/terms/", requestOptions);

    await handleErrors(response);

    const jsonResponse = await response.json();
    return jsonResponse;
  }

  //admin
  static async patchTerm(
    id: string,
    name: string,
    startDate: string,
    endDate: string
  ) {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: name,
        startDate: startDate,
        endDate: endDate,
      }),
    };

    const response = await fetch(baseUrl + "/api/terms/" + id, requestOptions);
    await handleErrors(response);
    const jsonResponse = await response.json();
    return jsonResponse;
  }

  //admin
  static async deleteTerm(id: string) {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    const response = await fetch(baseUrl + "/api/terms/" + id, requestOptions);
    await handleErrors(response);
  }

  //teacher + student
  static async getTermName(id: string) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const response = await fetch(baseUrl + "/api/terms/" + id, requestOptions);
    await handleErrors(response);
    const jsonResponse = await response.json();
    return jsonResponse[0]["name"];
  }

  static async getTermsForCourse(courseId:string) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const response = await fetch(baseUrl + "/api/terms/course/"+courseId, requestOptions);
    await handleErrors(response);
    const jsonResponse = await response.json();
    return jsonResponse;
  }

}

export default TermService;
