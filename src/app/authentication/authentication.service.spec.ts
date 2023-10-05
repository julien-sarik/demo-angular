import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { AuthenticationService } from "./authentication.service";
import { of } from "rxjs";

describe('authentication service - test suite', () => {

    let authenticationService: AuthenticationService
    let httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('HttpClient', ['post']);

    beforeEach(() => {
      const windowMock = { location: { href: '' } };
      TestBed.configureTestingModule({providers: [
        {provide: HttpClient, useValue: httpClientSpy},
        { provide: Window, useValue: windowMock }
      ]})
      authenticationService = TestBed.inject(AuthenticationService)
    })

    // test a synchronous function
    it('test userName getter', () => {
        expect(authenticationService.userName).toBe('')
    })

    // test an asynchronous function
    it('test login', (done: DoneFn) => {
        httpClientSpy.post.and.returnValue(of({authorizationRequestUrl: ''}))

        authenticationService.login().subscribe({
            next: resp => {
                expect(resp).toBe('')
                done()
            },
            error: done.fail
        })

    })
})