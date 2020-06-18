import { Observable } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<any>;
  useremail: any;
  currentUser: any;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.user$ = this.afAuth.authState;
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    return this.updateUserData(await this.afAuth.signInWithPopup(provider));
  }

  async signOut() {
    await this.afAuth.signOut();
    return this.router.navigate(['/']);
  }

  private updateUserData(credential) {
    this.currentUser = credential.user;
  }
  getUser() {
    return this.currentUser;
  }
}
