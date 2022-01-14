import handleErrors from "./middleWare";
import baseUrl from "./configs";

class CategoryService {
  //admin + teacher + student
  static async getAllCategories() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const response = await fetch(baseUrl + "/api/categories", requestOptions);
    await handleErrors(response);
    const jsonResponse = await response.json();
    return jsonResponse;
  }

  //admin
  static async putCategory(id: string, name: string) {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ name: name }),
    };

    const response = await fetch(
      baseUrl + "/api/categories/" + id,
      requestOptions
    );
    await handleErrors(response);
    const jsonResponse = await response.json();
    return jsonResponse;
  }

  //admin
  static async postCategory(name: string) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ name: name }),
    };

    const response = await fetch(baseUrl + "/api/categories/", requestOptions);
    await handleErrors(response);
    const jsonResponse = await response.json();
    return jsonResponse;
  }

  //admin
  static async deleteCategory(id: string) {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    const response = await fetch(
      baseUrl + "/api/categories/" + id,
      requestOptions
    );
    await handleErrors(response);
  }
}
export default CategoryService;
