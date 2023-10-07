import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HomeComponent } from "./home.component";
import { AuthenticationService } from "../authentication/authentication.service";
import { HousingService } from "../housing.service";
import { of } from "rxjs";

describe('home component - unit test suite', () => {
  let fixture: ComponentFixture<HomeComponent>
  let component: HomeComponent
  let housingServiceSpy: jasmine.SpyObj<HousingService>
  let authenticationServiceSpy: jasmine.SpyObj<AuthenticationService>

  beforeEach(() => {
   housingServiceSpy = jasmine.createSpyObj('HousingService', ['getAllHousingLocations']);
   authenticationServiceSpy = jasmine.createSpyObj('AuthenticationService', ['login'], ['userName']);

   TestBed.configureTestingModule({providers: [
     {provide: AuthenticationService, useValue: authenticationServiceSpy},
     {provide: HousingService, useValue: housingServiceSpy}
   ]});
   // add the corresponding element into the test-runner DOM and returns a fixture
   // the ComponentFixture is a wrapper to access the compoent and its corresponding DOM elements
   fixture = TestBed.createComponent(HomeComponent);
   component = fixture.componentInstance;
   expect(component).toBeDefined();
  })


  it('should contain "Login"', () => {
    housingServiceSpy.getAllHousingLocations.and.returnValue(of([]));
    // this forces Angular to perform data-binding on the HTML template
    fixture.detectChanges()
 
    const htmlElement: HTMLElement = fixture.nativeElement
    expect(htmlElement.querySelector('button')?.textContent).toContain('Login')
  })


  it('should contain "Logout"', () => {
    housingServiceSpy.getAllHousingLocations.and.returnValue(of([]));
    (Object.getOwnPropertyDescriptor(authenticationServiceSpy, "userName")?.get as jasmine.Spy<() => string>).and.returnValue('foo-user');
    // this forces Angular to perform data-binding on the HTML template
    fixture.detectChanges()
 
    const htmlElement: HTMLElement = fixture.nativeElement
    expect(htmlElement.querySelector('button')?.textContent).toContain('Logout')
  })
})