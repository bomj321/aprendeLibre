import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../services/authentication.service";
import { GeneralFunctionsService } from '../../services/general-functions.service'
import { CourseService } from "../../services/course.service";
import swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


/******MODALS*** */
import { CoursesModalComponent } from '../../modals/courses-modal/courses-modal.component';


declare var require: any;

const data: any = require('./data.json');

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [
    CourseService,
    AuthenticationService
  ]
})
export class DashboardComponent implements OnInit {



  public searchParams: any;
  public loading: boolean = false;
  public pageSize: number = 10;
  public page: number = 1;
  public currentUser: any;
  public courses: any;

  constructor(
    private authenticationService: AuthenticationService,
    public generalFunctionsService: GeneralFunctionsService,
    private modal: NgbModal,
    private courseService: CourseService) { }

  ngOnInit() {

    this.currentUser = this.authenticationService.getCurrentUser();
    this.getCourses();
  }

  /********************CRUD****************************** */

  openModalTask(task = null) {
    const modal = this.modal.open(CoursesModalComponent);
    modal.componentInstance.taskInformation = task;
    modal.componentInstance.onSaveTask.subscribe(($e) => {
      this.getCourses(1);
    })
  }

  getCourses(page = 1, searchParams = false) {
    this.loading = true;
    this.page = page

    this.courseService.getCourses(this.currentUser._id, page, searchParams).subscribe((courses: any) => {
      this.courses = courses;
      this.loading = false;
    },
      error => {
        this.loading = false;
        this.generalFunctionsService.notifications('Ha ocurrido un error al obtener las tareas, por favor contacte con el administrador', 'error');
      })
  }


  deletecoursesFunction(id) {
    this.loading = true;
    this.courseService.deleteCourse(id).subscribe(
      data => {
        this.loading = false;
        this.generalFunctionsService.notifications('Tarea eliminada con éxito', 'success');
        this.getCourses(this.page);
      },
      error => {
        this.loading = false;
        this.generalFunctionsService.notifications('Ha ocurrido un error al eliminar la tarea, por favor contacte con el administrador', 'error');

      }
    );
  }

  deleteTask(id) {
    swal({
      title: 'Estás seguro?',
      text: "¿Estás seguro de eliminar?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.deletecoursesFunction(id);

      } else if (
        result.dismiss === swal.DismissReason.cancel
      ) {
      }
    })
  }

}
