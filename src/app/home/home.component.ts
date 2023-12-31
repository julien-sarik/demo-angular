import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HousingLocationComponent
  ],
  template: `

  <div *ngIf="authenticationService.userName">
    <p>Hello {{ authenticationService.userName }}</p>
    <p>
      <button (click)="authenticationService.logout().subscribe()">Logout</button>
    </p>
  </div>
  <div *ngIf="!authenticationService.userName">      
    <p>
      <button (click)="authenticationService.login().subscribe()">Login</button>
    </p>
  </div>

  <section>
    <form>
      <!-- 
        the '#var' syntax allows to refer to the 'filter' variable further down the template
        i.e. as parameter of the search button event handler
      -->
      <input type="text" placeholder="Filter by city" #filter>
      <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
    </form>
  </section>
  <section class="results">
    <!-- the [attribute]="value" syntax is the Angular property binding.
      The left handside is the property from the inner component.
      The right handside is the name of the instance to assign from the outter component 
    --> 
    <app-housing-location
      *ngFor="let housingLocation of filteredLocationList"
      [housingLocation]="housingLocation">
    </app-housing-location>
  </section>
`,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];
  
  constructor(private housingService: HousingService, readonly authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    if (!this.authenticationService.isAuthenticated) {
      return
    }
    this.housingService.getAllHousingLocations().subscribe((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
    }
  
    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}