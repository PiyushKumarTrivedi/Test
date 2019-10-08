import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { UsersService } from '../common/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
username = '';
password = '';
  constructor(public afAuth: AngularFireAuth,
              public alert: AlertController,
              public userService: UsersService, public router: Router) { }

  ngOnInit() {
  }

  async login() {

    try {
      const  name = this.username + '@Crodal.com';
      console.log(name);
      const res = await this.afAuth.auth.signInWithEmailAndPassword(name, this.password);
      if (res.user) {
                      this.userService.setUser({
                        username: name,
                        uid: res.user.uid
                      });
                      this.showAlert('Welcome abroad!!', 'Success');
                      this.router.navigate(['/tabs']);
      }

  } catch (error) {
    console.dir(error);
    this.showAlert(error.message, 'Error!');
  }
}

async showAlert(message: string, header: string) {
 const alert = await this.alert.create({
    header,
    message,
    buttons: ['Ok']
  });
 await alert.present();
}
}
