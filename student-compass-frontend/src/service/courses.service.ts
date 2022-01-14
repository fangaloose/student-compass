import handleErrors from "./middleWare";
import baseUrl from "./configs";

class CourseService {
  //teacher
  static async getTerms(id: string) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const response = await fetch(
      baseUrl + "/api/courses/" + id + "/terms",
      requestOptions
    );
    await handleErrors(response);
    const jsonResponse = await response.json();
    return jsonResponse;
  }

  //teacher
  static async getUsers(courseId: string, termId: string) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const response = await fetch(
      baseUrl + "/api/courses/" + courseId + "/" + termId + "/users",
      requestOptions
    );
    await handleErrors(response);
    const jsonResponse = await response.json();
    return jsonResponse;
  }

  //teacher + student
  static async getCourseName(id: string) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const response = await fetch(
      baseUrl + "/api/courses/" + id,
      requestOptions
    );
    await handleErrors(response);
    const jsonResponse = await response.json();
    return jsonResponse["name_Course"];
  }

  //teacher
  static async getCourseCategory(id: string) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const response = await fetch(
      baseUrl + "/api/courses/" + id,
      requestOptions
    );
    await handleErrors(response);
    const jsonResponse = await response.json();
    return jsonResponse["category"];
  }

  //teacher
  static async getReviews(courseId: string, termId: string) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const response = await fetch(
      baseUrl + "/api/courses/" + courseId + "/" + termId + "/reviews",
      requestOptions
    );
    await handleErrors(response);
    const jsonResponse = await response.json();
    return jsonResponse;
  }

  //student
  static async getChaptersStudent(
    idCourse: string,
    idStudent: string,
    idTerm: string
  ) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const response = await fetch(
      baseUrl +
        "/api/courses/" +
        idCourse +
        "/" +
        idTerm +
        "/" +
        idStudent +
        "/chapters/",
      requestOptions
    );
    await handleErrors(response);
    const jsonResponse = await response.json();
    return jsonResponse;
  }

  //student
  static async postReview(
    idChapter: string,
    idTerm:string,
    idStudent: string,
    note_review: string,
    text_review: string
  ) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ note_review: note_review, text_review: text_review }),
    };

    const response = await fetch(
      baseUrl + "/api/reviews/" + idChapter+"/"+idTerm + "/" + idStudent,
      requestOptions
    );
    await handleErrors(response);
    const jsonResponse = await response.json();
    return jsonResponse;
  }

  //teacher
  static async postChapter(course: string, name_Chapter: string) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ name_Chapter: name_Chapter, course: course }),
    };

    const response = await fetch(baseUrl + "/api/chapters/", requestOptions);
    await handleErrors(response);
    const jsonResponse = await response.json();
    return jsonResponse;
  }

  //teacher
  static async deleteChapter(chapterId: string) {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    const response = await fetch(
      baseUrl + "/api/chapters/" + chapterId,
      requestOptions
    );
    await handleErrors(response);
  }

  //teacher
  static async deleteUser(userId: string, courseId: string, termId: string) {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    const response = await fetch(
      baseUrl + "/api/courses/" + courseId + "/" + termId + "/" + userId,
      requestOptions
    );
    await handleErrors(response);
  }

  //teacher
  static async deleteTerm(courseId: string, termId: string) {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    const response = await fetch(
      baseUrl + "/api/semestercourses/" + courseId + "/" + termId,
      requestOptions
    );
    await handleErrors(response);
  }

  //teacher
  static async addCourse(
    name: string,
    description: string,
    categoryId: string,
    termId: string,
    teacherId: string
  ) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name_Course: name,
        description_Course: description,
        category: categoryId,
      }),
    };

    const response = await fetch(baseUrl + "/api/courses/", requestOptions);
    await handleErrors(response);
    const jsonResponse = await response.json();

    const requestOptions2 = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        course: jsonResponse.id,
        term: termId,
        teacher: teacherId,
      }),
    };

    const response2 = await fetch(
      baseUrl + "/api/semestercourses/",
      requestOptions2
    );
    await handleErrors(response2);
    const jsonResponse2 = await response2.json();
    return jsonResponse2;
  }

  //teacher
  static async patchCourseCategory(id: string, category: string) {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ category: category }),
    };

    const response = await fetch(
      baseUrl + "/api/courses/" + id,
      requestOptions
    );
    await handleErrors(response);
    const jsonResponse = await response.json();
    return jsonResponse;
  }

  //teacher
  static async addCourseToTerm(
    courseId: string,
    termId: string,
    teacherId: string
  ) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        course: courseId,
        term: termId,
        teacher: teacherId,
      }),
    };

    const response = await fetch(
      baseUrl + "/api/semestercourses",
      requestOptions
    );
    await handleErrors(response);
    const jsonResponse = await response.json();
    return jsonResponse;
  }

  //teacher
  static async addStudentsToCourse(
    courseId: string,
    termId: string,
    userArray: string[]
  ) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        course: courseId,
        term: termId,
        userArray: userArray,
      }),
    };

    const response = await fetch(
      baseUrl + "/api/courses/" + courseId + "/" + termId + "/users",
      requestOptions
    );
    await handleErrors(response);
    const jsonResponse = await response.json();
    return jsonResponse;
  }

  //teacher
  static async getUsersNotInCourse(courseId: string, termId: string) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    const response = await fetch(
      baseUrl + "/api/courses/" + courseId + "/" + termId + "/users/not",
      requestOptions
    );
    await handleErrors(response);
    const jsonResponse = await response.json();
    return jsonResponse;
  }
}

export default CourseService;
