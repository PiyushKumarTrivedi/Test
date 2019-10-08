import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
postId = '';
postDetails: any;

rating3: number;
  constructor(private activatedroute: ActivatedRoute, private afs: AngularFirestore) {
  }

   ngOnInit() {
    this.postId = this.activatedroute.snapshot.params.id;
    console.log('Post Page:' + this.postId);
    this.afs.doc(`posts/${this.postId}`).valueChanges().subscribe(
      x => {
      this.postDetails = x;
      console.log(this.postDetails);
      }
    );

    console.log(this.postId);
  }

}
