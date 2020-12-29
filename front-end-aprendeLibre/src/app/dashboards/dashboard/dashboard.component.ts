import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../services/authentication.service";
import { GeneralFunctionsService } from '../../services/general-functions.service'
import { differenceInDays } from 'date-fns';
@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [
    AuthenticationService
  ]
})
export class DashboardComponent implements OnInit {

  public currentUser: any;

  constructor(
    private authenticationService: AuthenticationService,
    public generalFunctionsService: GeneralFunctionsService) { }

  ngOnInit() {
  }



}
