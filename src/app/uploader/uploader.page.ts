import { ModelPage } from './../model/model.page';
import { UsersService } from './../common/users.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { firestore } from 'firebase/app';
import { ModalController } from '@ionic/angular'
// added /app as it was given in instruction.

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],
})


export class UploaderPage implements OnInit {
  busy = false;

public imageUrl  = '';
public desc = '';
@ViewChild('imgupload')  uploadbutton ;
  constructor(public http: Http, public user: UsersService, public afstore: AngularFirestore, private modalcontroller: ModalController) {

  }

  ngOnInit() {
  }


 async model() {
    const modal = await this.modalcontroller.create({
      component : ModelPage,
      componentProps: {
        firstName: 'Douglas',
        lastName: 'Adams',
        'middleInitial': 'N'
      }
    });
    return await modal.present();
  
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalcontroller.dismiss({
      'dismissed': true
    });
  }

  uploadFile() {
  this.uploadbutton.nativeElement.click();
  }
  createPost() {
    this.busy = true;
    const image = this.imageUrl;
    const desc = this.desc;
    console.log(this.user.getUID());
    console.log(desc);
    console.log(image);
    this.afstore.doc(`users/${this.user.getUID()}`).update(
      {
        posts: firestore.FieldValue.arrayUnion({image})
      }
    );
    console.log('setting: ' + image);
    this.afstore.doc(`posts/${image}`).set({
      desc,
      author: this.user.getUserName(),
      like: []
    });
    this.busy = false;
    this.imageUrl = '';
    this.desc = '';
  }

  fileChanged(event) {
  this.busy = true;
  const files = event.target.files;
  console.log(files[0]);
  const data = new FormData();
  data.append('UPLOADCARE_PUB_KEY', '9c96a97b3a776a411cef');
  data.append('UPLOADCARE_STORE', '1');
  data.append('file',  files[0]);

  this.http.post('https://upload.uploadcare.com/base/', data)
  .subscribe(e => {
    console.log(e.json().file);
    this.imageUrl = e.json().file;
    this.busy = false;
    // this.imageUrl = '';
    // this.desc = '';
  });
  }
}
