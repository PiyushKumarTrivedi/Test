import { AuthServiceService } from './common/auth-service.service';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
 

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
 { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthServiceService] },
  { path: 'modal1', loadChildren: './modal1/modal1.module#Modal1PageModule' },
 
   // { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  // { path: 'uploader', loadChildren: './uploader/uploader.module#UploaderPageModule' },
  // { path: 'feed', loadChildren: './feed/feed.module#FeedPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
