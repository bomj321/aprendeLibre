import { Component, OnInit, Injectable, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralFunctionsService } from '@app/services/general-functions.service'
import { CourseService } from "../../services/course.service";

declare var jQuery: any;
declare var $: any;


@Component({
  selector: 'app-courses-modal',
  templateUrl: './courses-modal.component.html',
  styleUrls: ['./courses-modal.component.scss'],
  providers: [
    CourseService
  ]
})
export class CoursesModalComponent implements OnInit {

  @Output() onSaveTask = new EventEmitter();
  @Input() taskInformation = null;
  public titleModal: any = 'Gestionar cursos';


  /*******variables to task**** */
  public title: any;
  public content: any;
  public objectRequest: any;
  public loading: boolean;


  constructor(
    public activeModal: NgbActiveModal,
    private generalFunctionsService: GeneralFunctionsService,
    private courseService: CourseService
  ) { }



  ngOnInit() {
    if (this.taskInformation) {
      this.editTask(this.taskInformation);
    }

  }


  close() {
    this.activeModal.dismiss('close');
  }

  /********************CRUD SERVICES******************* */

  saveTask() {


    $("#title").removeClass("is-invalid");
    $("#content").removeClass("is-invalid");


    if (this.title == null || this.title == '') {
      this.generalFunctionsService.notifications('Debe ingresar un nombre', 'error');
      let element = document.getElementById("title");
      $("#title").addClass("is-invalid");
      if (element) {
        element.focus();
      }
      return;
    }


    if (this.content == null || this.content == '') {
      this.generalFunctionsService.notifications('Debe ingresar un contenido', 'error');
      let element = document.getElementById("content");
      $("#content").addClass("is-invalid");
      if (element) {
        element.focus();

      }
      return;
    }

    this.loading = true;
    this.eventToSaveEdit();

  }



  eventToSaveEdit() {
    this.objectRequest =
    {
      "title": this.title.toString(),
      "content": this.content,
    };

    if (this.taskInformation) {
      this.editContentService(this.objectRequest, this.taskInformation);
    } else {
      this.saveContentService(this.objectRequest);
    }
  }


  saveContentService(objectRequest) {
    this.courseService.saveCourse(objectRequest).subscribe(
      data => {
        if (data && data['message'] == 'DATA_INCOMPLETE') {
          this.generalFunctionsService.notifications('Disculpa pero tienes datos faltantes', 'error');
        } else if (data && data['message'] == 'NOT_VALID_VALIDATION') {
          this.generalFunctionsService.notifications('Disculpa pero tienes datos faltantes', 'error');
        } else {
          this.generalFunctionsService.notifications('Curso añadido con éxito', 'success');
          this.close();
          this.onSaveTask.emit('SAVED');
        }
        this.loading = false;
      },
      error => {
        this.generalFunctionsService.notifications('Ha ocurrido un error al guardar el curso, por favor contacte con el administrador', 'error');
        this.loading = false;

      }
    );
  }

  editContentService(objectRequest, taskInformation) {
    this.courseService.updateCourse(objectRequest, taskInformation._id).subscribe(data => {

      if (data && data['message'] == 'DATA_INCOMPLETE') {
        this.generalFunctionsService.notifications('Disculpa pero tienes datos faltantes', 'error');
      } else if (data && data['message'] == 'NOT_VALID_VALIDATION') {
        this.generalFunctionsService.notifications('Disculpa pero tienes datos faltantes', 'error');
      } else {
        this.generalFunctionsService.notifications('Curso editado con éxito', 'success');
        this.close();
        this.onSaveTask.emit('UPDATED');
      }
      this.loading = false;
    }, error => {
      this.generalFunctionsService.notifications('Ha ocurrido un error al editar el curso, por favor contacte con el administrador', 'error');
      this.loading = false;

    })

  }


  deleteFields() {
    this.objectRequest = null;
    this.taskInformation = null;
    this.title = null;
    this.content = null;
  }
  /******************PERCENTAGE***************** */

  editTask(taskContent) {
    this.title = taskContent.title;
    this.content = taskContent.content;
  }

}
