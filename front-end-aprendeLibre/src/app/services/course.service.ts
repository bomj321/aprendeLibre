import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthenticationService } from "./authentication.service";
@Injectable({
  providedIn: 'root',
})
export class CourseService {

  private server: string = environment.API_URL;
  private services = {
    course: this.server + "/course",
    courses: this.server + "/courses"
  };

  constructor(
    private http: HttpClient,
    public authenticationService: AuthenticationService
  ) { }

  getCourses(idUser, page, searchParams) {

    if (searchParams) {
      return this.http.get(this.services.course + '/' + idUser + '/' + page + '/' + searchParams);
    } else {
      return this.http.get(this.services.course + '/' + idUser + '/' + page);
    }
  }

  getAllcourses(idUser) {
    return this.http.get(this.services.courses + '/' + idUser);
  }

  /*********************COURSES****************************** */

  saveCourse(data) {
    return this.http.post(this.services.course, data);
  }

  getCourse(id) {
    return this.http.get(this.services.course + '/' + id);
  }

  deleteCourse(id) {
    return this.http.delete(this.services.course + '/' + id);
  }

  updateCourse(data, id) {
    return this.http.put(this.services.course + '/' + id, data);
  }

}
