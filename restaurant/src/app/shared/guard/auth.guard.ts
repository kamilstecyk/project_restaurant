import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // console.log(state.url);
    // console.log("Auth guard");

    console.log("Loggged in status2: " + this.authService.isLoggedIn);


    if(this.authService.isLoggedIn !== true)
    {
      this.router.navigate(['/']);
      return false;
    }
    
    return true;
  }
  
}
