import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { RegistrationModel } from '../models/registrationModel';
import { switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.baseApi;
  constructor(private afAuth: AngularFireAuth, private router: Router, private http: HttpClient) { }


  register(userRegistration: RegistrationModel) {

    const registerUrl: string = `${this.baseUrl}users`;
    return this.http.post<RegistrationModel>(registerUrl, userRegistration)
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  resetPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }


  logout() {
    this.afAuth.signOut()
      .then(() => {
        // Logout successful
      })
      .catch((error) => {
        // An error occurred
      });
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(user => user !== null)
    );
  }

  // Method to get the currently logged-in user's email
  getCurrentUserEmail(): Observable<string | null> {
    return this.afAuth.authState.pipe(
      map(user => user ? user.email : null)
    );
  }


}