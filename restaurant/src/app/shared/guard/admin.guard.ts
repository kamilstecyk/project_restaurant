import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../services/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {
  constructor(private authorizationService: AuthorizationService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // if(this.authService.isLoggedIn !== true)
    // {
    //   this.router.navigate(['/login']);
    //   return false;
    // }
    const allowedRoles = ["Admin", "Manager"];
    console.log("Hello");
    if(!this.authorizationService.checkAuthorization(allowedRoles))
    {
      return false;
    }
    
    return true;
  }
  
}
