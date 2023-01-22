import { Component } from '@angular/core';
import { AuthService, SessionState } from 'src/app/shared/services/auth.service';
import { map } from 'rxjs';
import { User } from 'src/app/shared/services/user';
import { Role } from 'src/app/shared/services/user';
import { SessionType } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.sass']
})
export class AdminPanelComponent {
  users: User[] = []
  session: SessionState; // defualt
  downloaded_count = 0;

  constructor(private authService: AuthService)
  {
     this.fetchSessionState()
     this.fetchUsers(); 
  }

  private fetchUsers()
  {
    this.authService.getAllUsers().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => 
      {
        this.users = [];
        console.log("Fetch users");
        data.forEach((userDetails) => 
        {
          this.users.push(userDetails as User);
        });
        console.log(this.users);
        this.downloaded_count += 1;
      }
    );
  }

  private fetchSessionState()
  {
    this.authService.getSessionState().snapshotChanges().pipe(
      map(c =>
          ({ key: c.payload.key, ...c.payload.val() }) 
      )
    ).subscribe(state =>
      {
        this.session = state as SessionState;
        console.log(state);
        this.downloaded_count += 1;
      });
  }

  updateUserRecord(key: string | undefined | null, new_role: string, isBanned: string)
  {
    console.log("key to update: " + key);
    if(key)
    {
      let banned_state;

      if(isBanned === 'TAK')
      {
        banned_state = true;
      }
      else 
      {
        banned_state = false;
      }
  
      const values_to_update = {
        role: new_role,
        banned: banned_state
      };

      this.authService.updateUser(key, values_to_update).then(()=>
      {
        alert("Zaaktualizowano dane o uzytkowniku!");
      })
      .catch((err)=>
      {
        alert("Nie mozna bylo zaaktualizowac uzytkownika!");
      });
    }
    else 
    {
      alert("Nie ma uzytkownika o takim kluczu!");
    }    
  }

  getRoles()
  {
    return Role;
  }

  getSessionStatesTypes()
  {
    return SessionType;
  }

  onSubmit(e:Event, new_session_state: string)
  { 
    e.preventDefault();

    this.authService.updateSessionState(new_session_state).then(()=>
    {
      alert("Zmieniono typ sesji logowania!");
      console.log("success changing session type");
    })
    .catch(err =>
      {
        alert("Nie mozna bylo zmienic typu sesji logowania!");
        console.log("error changing session type");
      });
  } 
}
