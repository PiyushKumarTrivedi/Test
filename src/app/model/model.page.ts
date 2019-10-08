import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Http } from '@angular/http';
import { UsersService } from '../common/users.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser/ngx';



@Component({
  selector: 'app-model',
  templateUrl: './model.page.html',
  styleUrls: ['./model.page.scss'],
})
export class ModelPage implements OnInit {

  busy = false;
  PComment = '';
  public imageUrl  = '';
  public desc = '';
  @ViewChild('imgupload') uploadbutton;


  @Input() firstName: string;
  @Input() lastName: string;
  @Input() middleInitial: string;

  constructor(navParams: NavParams,
              public http: Http, public user: UsersService, public afstore: AngularFirestore, private themeableBrowser: ThemeableBrowser) {
    // componentProps can also be accessed at construction time using NavParams
    console.log(navParams.get('firstName'));
  }

  ngOnInit() {
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
