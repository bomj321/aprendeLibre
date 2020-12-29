import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UrlAuthGuard } from "../_guards/url-auth.guard";

export const DashboardRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [UrlAuthGuard],
        data: {
          title: 'Curso principal',
          urls: [
            { title: 'Curso principal', url: '/dashboard' }
          ]
        }
      }

    ]
  }
];
