import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LikeComponent } from './like.component';

@NgModule({
  imports: [ CommonModule, FormsModule,IonicModule,],
  declarations: [LikeComponent],
  exports: [LikeComponent]
})
export class LikeComponentModule {}
