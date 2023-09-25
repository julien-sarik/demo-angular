import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { bffConfig } from '../bff/bff.config';

@Component({
  selector: 'app-oauth-callback',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>completing user login</p>
  `,
  styleUrls: ['./oauth-callback.component.css']
})
export class OauthCallbackComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) {
  }

  ngOnInit(): void {
    // collect the authorization code
    const authCode = JSON.stringify({pageUrl: this.router.url});
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // send the auth code to the bff so it can perform the code exchange
    this.http.post<string>(`${bffConfig.url}/login/end`, authCode, {headers})
      .subscribe(resp => {
        // once the user is authenticated, request the ID tokens claims
        this.getUserDetails()
        this.router.navigate(['/']);
      });
  }

  getUserDetails() {
    this.http.get<string>(`${bffConfig.url}/claims`)
      // store the ID token claims
      .subscribe(resp => sessionStorage.setItem('claims', JSON.stringify(resp)))
  }

}
