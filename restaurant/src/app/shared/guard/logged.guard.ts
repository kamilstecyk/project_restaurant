import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { delay, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // user can register and log only if write url link, then the page reftresh and here we will have null auth object 

    // console.log("Loggged in status: " + this.authService.isLoggedIn);

    // if(this.authService.isLoggedIn !== false)
    // {
    //   this.router.navigate(['/']);
    //   return false;
    // }
    
    return true;
  }
  
}
