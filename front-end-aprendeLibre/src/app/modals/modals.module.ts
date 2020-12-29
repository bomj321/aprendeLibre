import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxLoadingModule } from 'ngx-loading';
import { CoursesModalComponent } from './courses-modal/courses-modal.component';

@NgModule({
  declarations: [
    ModalComponent,
    CoursesModalComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    NgSelectModule,
    NgxLoadingModule.forRoot({}),
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
    })
  ],
  exports:
    [
      ModalComponent
    ],
  entryComponents:
    [
      ModalComponent,
      CoursesModalComponent
    ]
})
export class ModalsModule { }
