import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'Principal',
    icon: 'mdi mdi-gauge',
    class: 'has-arrow',
    label: '',
    labelClass: '',
    extralink: false,
    submenu: [
      {
        path: '/dashboard',
        title: 'Curso Principal',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/lists-courses',
        title: 'Listado de cursos',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      }
    ]
  }
];
