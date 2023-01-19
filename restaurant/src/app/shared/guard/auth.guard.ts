import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AngularFireList } from '@angular/fire/compat/database';
import { User } from '../services/user';
import { Role } from '../services/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private dbPath = '/users';
  usersRef: AngularFireList<User>;

  constructor(public authService: AuthService, public router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // console.log(state.url);
    // console.log("Auth guard");

    if(this.authService.isLoggedIn !== true)
    {
      this.router.navigate(['/']);
      console.log("Started path: ");
      console.log(state.url);
      return false;
    }
    
    return true;
  }
  
}
