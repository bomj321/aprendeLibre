import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardRoutes } from './dashboard.routing';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../_interceptors/auth.interceptor';
import { UrlAuthGuard } from "../_guards/url-auth.guard";
import { AuthenticationService } from "../services/authentication.service";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgbModule,
    RouterModule.forChild(DashboardRoutes)
  ],
  declarations: [
    DashboardComponent,
  ],
  providers:
    [
      UrlAuthGuard,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
      },
      AuthenticationService

    ]
})
export class DashboardModule { }
