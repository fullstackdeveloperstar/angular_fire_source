import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
// import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
interface User {
  uid: string;
  email: string;
  photoURL: string;
  catchPhrase?: string;
}

@Injectable()
export class AuthService {
  user: Observable<User>;
  authState: any = null;
  constructor(
    private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
      console.log(this.authState);
    });
  }

  loginWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
      })
      .catch(error => {
        console.log(error);
        throw error;
    });
  }
}
