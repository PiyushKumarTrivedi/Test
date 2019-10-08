import { Router } from '@angular/router';
import { UsersService } from './../common/users.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userPosts;
  constructor(public afs: AngularFirestore, public userService: UsersService, private route: Router) {
  }

  ngOnInit() {
    const posts = this.afs.doc(`users/${this.userService.getUID()}`);
    posts.valueChanges().subscribe(x => {
      this.userPosts = x;
    });
  }

  goToPost(postId: string) {
    console.log(postId);
    console.log(postId);
    this.route.navigate(['tabs/post/' + postId]);
  }

}
