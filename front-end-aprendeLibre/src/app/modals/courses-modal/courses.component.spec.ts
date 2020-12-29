import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoursesModalComponent } from './courses-modal.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthenticationService } from "../../services/authentication.service";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


describe('CoursesModalComponent', () => {
  let component: CoursesModalComponent;
  let fixture: ComponentFixture<CoursesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesModalComponent],
      providers:
        [
          AuthenticationService,
          NgbActiveModal
        ],
      imports: [HttpClientTestingModule,
        NgbModule.forRoot(),
        RouterTestingModule,
        ToastrModule.forRoot({
          positionClass: 'toast-top-right'
        })
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
