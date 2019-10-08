import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UploaderPage } from './uploader.page';
import { SharePageModule } from '../component/loading/Share.module';
import { UcWidgetModule } from 'ngx-uploadcare-widget';
import {uploadcare} from 'uploadcare-widget';

const routes: Routes = [
  {
    path: '',
    component: UploaderPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharePageModule,UcWidgetModule
  ],
  declarations: [UploaderPage]
})
export class UploaderPageModule {}
