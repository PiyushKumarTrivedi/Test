import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService implements CanActivate {
   constructor(private route: Router , private userService: UsersService) { }
  async canActivate() {
    if (await this.userService.isAuthenticated()) { return true; }
    this.route.navigate(['/login']);
    return false;
  }
}
