import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireList } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Role, User } from './user';
import { map } from 'rxjs'; 
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  userData: any;

  private dbPath = '/users';
  usersRef: AngularFireList<User>;
  session: any;

  constructor(private fbAuthService: AngularFireAuth, private fbDbService: AngularFireDatabase, public router: Router, private authorizationService: AuthorizationService) 
  {
    this.usersRef = fbDbService.list(this.dbPath);

    this.fbAuthService.authState.subscribe((user) => {
      if (user) {
        this.userData = user.toJSON();
        console.log(this.userData);
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    // none | session | local
    this.fbAuthService.setPersistence('session').then(()=>
    {
      return this.fbAuthService.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.fbAuthService.authState.subscribe((user) => {
          if (user && user.emailVerified === true) {
            window.alert("Zalogowano poprawnie!");
            this.updateEmailVerifiedState();
            this.router.navigate(['/']);
          }
          else if(user && user.emailVerified === false) 
          {
            window.alert("Nie zweryfikowano konta! Znajdź wiadomość na skrzynce mailowej i potwierdź weryfikację konta!");
          }
        });
      })
      .catch((error) => {
        window.alert("Nie mozna się zalogować, poniewaz uzytkownik z takimi danymi do logowania, nie istnieje! Sprobuj ponownie!");
      });
    });
  }
  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.fbAuthService
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        // /* Call the SendVerificaitonMail() function when new user sign 
        // up and returns promise */
        this.SendVerificationMail().then(()=>
        {
          this.SetUserData(result.user);
          window.alert("Zarejestrowano uzytkownika poprawnie! Na podany adres email został wysłany link aktywujący konto!");
          this.router.navigate(['/login']);
        })
        .catch((err)=>
        {
          alert("Podany adres email nie istnieje, spróbuj zarejestrować się ponownie z innym!");
          this.router.navigate(['/register']);
        });
      })
      .catch((error) => {
        window.alert("Email jest juz uzywany przez uzytkownika!");
      });
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.fbAuthService.currentUser
      .then((u: any) => u.sendEmailVerification());
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.fbAuthService
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Wiadomość do zresetowania twojego hasła została wysłana na podany adres email. Sprawdź skrzynkę pocztową!');
      })
      .catch((error) => {
        window.alert("Nie ma konta z podanym emailem! Zarejestruj się");
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    // const user = JSON.parse(localStorage.getItem('user')!);
    // console.log(user);
    if(this.userData && this.userData.emailVerified)
      return true;
    
    return false;
  }
   // Sign in with Google
  //  GoogleAuth() {
  //   return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
  //     this.router.navigate(['dashboard']);
  //   });
  //  }
 
  // // Auth logic to run auth providers
  // AuthLogin(provider: any) {
  //   return this.fbAuthService
  //     .signInWithPopup(provider)
  //     .then((result) => {
  //       this.router.navigate(['/']);
  //       this.SetUserData(result.user);
  //     })
  //     .catch((error) => {
  //       window.alert(error);
  //     });
  // }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in RealTimeDatabase  */

  SetUserData(user: any) {
      // console.log(user);
   
      const userData: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        role: Role.Client
      }

      this.usersRef.push(userData).then(()=> {return true;}).catch(() => {return false;});
  }

  // Sign out
  SignOut() {
    return this.fbAuthService.signOut().then(() => {
      localStorage.removeItem('user');

      this.router.navigate(['/login']);
      alert("Poprawnie wylogowano!");
      console.log("LoggedIn: " + this.isLoggedIn);
      document.location.reload();
    });
  }

  private updateEmailVerifiedState()
  {
    if(this.userData)
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
            if(userDetails.uid == this.userData.uid && userDetails.emailVerified == false)
            {
              if(userDetails.key)
                this.usersRef.update(userDetails.key, {emailVerified: true});
            }
          });
        }
      );
    }
  }

  private getLoggedUserDetails()
  {
    if(this.userData)
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
            if(userDetails.uid == this.userData.uid)
            {
              return userDetails as User;
            }
          });
        }
      );
    }

    return new User();
  }

}
