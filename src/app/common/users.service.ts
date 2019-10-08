import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
private user: User;
  constructor(private afAuth: AngularFireAuth) { }

  setUser(user: User) {
  this.user = user;
  }
 async isAuthenticated() {
   if (this.user) {
     return true;
   }
   const user = await this.afAuth.authState.pipe(first()).toPromise();
   if (user) {
     this.setUser({
       username: user.email.split('@')[0],
       uid: user.uid
     });
     return true;
   }
   return false;
  }
  getUserName() {
    return this.user.username;
  }
  getUID() {
    if (!this.user) {
      if (!this.afAuth.auth.currentUser) {
    const user = this.afAuth.auth.currentUser;
    console.log(user);
    this.setUser(
      {

        username : user.email.split('@')[0],
        uid: user.uid
    });
    return user.uid;
  } else {
   throw console.error('error found during login');
  }
} else {
    return this.user.uid;
  }
  }
}




