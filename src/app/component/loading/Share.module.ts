import { ModelPage } from './../../model/model.page';
 
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoadingComponent } from './loading.component';
import { UcWidgetModule } from 'ngx-uploadcare-widget';
 
@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, UcWidgetModule],
    declarations: [LoadingComponent, ModelPage],
    exports: [LoadingComponent, ModelPage]
})
export class SharePageModule {
}
