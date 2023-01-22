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
    
    const allowedRoles = ["Admin"];
    if(!this.authorizationService.checkAuthorization(allowedRoles))
    {
      this.router.navigate(['/']);
      return false;
    }
    
    return true;
  }
  
}
