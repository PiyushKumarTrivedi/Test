import { Router } from '@angular/router';
import { UsersService } from './../common/users.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username = '';
  password = '';
  cpassword = '';

  constructor(public afAuth: AngularFireAuth,
              public alert: AlertController, public router: Router,
              public afstore: AngularFirestore, public userService: UsersService) { }

  ngOnInit() {
  }

 async Register() {

  try {
   const{username, password, cpassword} = this;
   if (password === cpassword) {

   const res = await this.afAuth.auth.createUserWithEmailAndPassword(username + '@crodal.com', password);
   this.afstore.doc(`users/${res.user.uid}`).set({username});
   this.userService.setUser({
    username,
    uid: res.user.uid
  });
   console.log('password does match.');
   this.showAlert('Registration Sucessfull', 'Succeed!');
   this.router.navigate(['/tabs']);
  } else {
    console.log('password does not match.');
    this.showAlert('Confirm Password does not match', 'Error');
   }
  } catch (error) {
    this.showAlert(error.message, 'Error');
    console.dir(error);
  }
  }

 async showAlert(message: string, header: string) {
  const alert =  await this.alert.create({
      header,
      message,
      buttons: ['Ok']
    });
  await alert.present();
  }


}
