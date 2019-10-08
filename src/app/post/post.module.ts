import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PostPage } from './post.page';
import { RatingComponentModule } from '../rating/rating.module';
import { LikeComponentModule } from '../like/like.module';
import { SharePageModule } from '../component/loading/Share.module';

const routes: Routes = [
  {
    path: '',
    component: PostPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    RatingComponentModule,
    LikeComponentModule,
    SharePageModule
  ],
  declarations: [PostPage]
})
export class PostPageModule {}
