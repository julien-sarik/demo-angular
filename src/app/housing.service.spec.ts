import { TestBed } from "@angular/core/testing"
import { HousingService } from "./housing.service"
import { HttpClient } from "@angular/common/http";
import { HousingLocation } from "./housinglocation";
import { of } from "rxjs";

describe('housing service - unit test suite', () => {
  const expectedHousingLocation : HousingLocation = {id: 0, name: 'foo-name', city: 'foo-city', state: 'foo-state', photo: '', availableUnits: 0, wifi: true, laundry: false}
  let housingService: HousingService
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({providers: [{provide: HttpClient, useValue: httpClientSpy}]})

    housingService = TestBed.inject(HousingService)
  })

  it('test getAllHousingLocations()', (done: DoneFn) => {
    const expectedLocations: HousingLocation[] = [expectedHousingLocation]
    httpClientSpy.get.and.returnValue(of(expectedLocations))

    housingService.getAllHousingLocations().subscribe({
      next: (locations :HousingLocation[]) => {
        expect(locations).toEqual(expectedLocations)
        done()
      },
      error: done.fail
      })
  })

})

