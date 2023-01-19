import { Injectable } from '@angular/core';
import { User } from './user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireList } from '@angular/fire/compat/database';
import { Role } from './user';
import { map } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  userData: any;
  private dbPath = '/users';
  usersRef: AngularFireList<User>;

  constructor(private fbAuthService: AngularFireAuth, private fbDbService: AngularFireDatabase, private router: Router) 
  {
    this.usersRef = fbDbService.list(this.dbPath);

    this.userData = this.fbAuthService.authState.subscribe((user) => {
      if (user) {
        // this.userData = user.toJSON();
        console.log(this.userData);
        // localStorage.setItem('user', JSON.stringify(this.userData));
        // JSON.parse(localStorage.getItem('user')!);
        if(this.userData != null)
        {
          this.usersRef.snapshotChanges().pipe(
              map(changes =>
                changes.map(c =>
                  ({ key: c.payload.key, ...c.payload.val() })
                )
              )
            ).subscribe(data => 
              {
                data.forEach((userDetails) => 
                {
                  if(userDetails.uid == user.uid)
                  {
                    console.log("Atuhroization: ");
                    setTimeout(()=>{console.log(this.userData), 1000});
                    this.userData = userDetails as User;
                  }
                });
              }
            );
          }
          else 
          {
            this.userData = null;
          }
        } 
    });
    
  }

   // determines if user has matching role
   public checkAuthorization(allowedRoles: string[]): boolean {
    if (!this.userData) return false
    for (const role of allowedRoles) {
      console.log(role + " vs " + this.userData.role)
      if ( this.userData.role == role ) {
        return true
      }
    }
    return false
  }
}
