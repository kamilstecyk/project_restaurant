import { Injectable } from '@angular/core';
import { User } from './user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireList } from '@angular/fire/compat/database';
import { Role } from './user';
import { map } from 'rxjs'; 
import { BuyingService } from 'src/app/services/buying.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  userData: any = null;
  private dbPath = '/users';
  usersRef: AngularFireList<User>;

  constructor(private fbAuthService: AngularFireAuth, private fbDbService: AngularFireDatabase, private router: Router, private buyingService: BuyingService) 
  {
    this.usersRef = fbDbService.list(this.dbPath);

    this.fbAuthService.authState.subscribe((user) => {

      if (user) {
        // this.userData = user.toJSON();
        console.log(this.userData);
        // localStorage.setItem('user', JSON.stringify(this.userData));
        // JSON.parse(localStorage.getItem('user')!);
        if(this.userData == null)
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

  public checkIsAuthorizedForManipulatingDb(): boolean
  {
    console.log("Check admin authorized: ");
    const authorized_for_removing: string[] = [Role.Admin, Role.Manager];
    console.log(this.checkAuthorization(authorized_for_removing));

    return this.checkAuthorization(authorized_for_removing);
  }

   // determines if user has matching role
   public checkAuthorization(allowedRoles: string[]): boolean {
    if (!this.userData) return false
    for (const role of allowedRoles) {
      if ( this.userData.role == role ) {
        return true
      }
    }
    return false
  }

  // this has to be as promise 
  public chechIfUserHasBoughtDish(dish_key: string | null | undefined): Promise<boolean>
  {
    const was_bought_earlier = new Promise<boolean>((resolve, reject) => 
    {
      if(!dish_key || this.userData.uid == null)
      {
          reject(false);
      }

      if(this.userData.role == Role.Admin || this.userData.role == Role.Manager)
      {
        resolve(true);
      }

        this.buyingService.getOrdersHistory().snapshotChanges().pipe(
          map(changes =>
            changes.map(c =>
              ({ key: c.payload.key, ...c.payload.val() })
            )
          )
        ).subscribe(data => 
          {
            for(let bought_dish_record of data)
            {

              if(bought_dish_record.dish_info?.dish.key === dish_key && bought_dish_record.uid === this.userData.uid)
              {
                resolve(true);
              }
            }

            resolve(false);
          });
      });

      return was_bought_earlier;
  }

  public checkIfUserIsAGuest(): boolean
  {
    if(this.userData == null)
    {
      return true;
    }

    return false;
  }

  getLoggedUser()
  {
    return this.userData;
  }

  getLoggedUserEmail()
  {
    return this.userData.email;
  }
}
