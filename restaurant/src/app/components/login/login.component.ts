import { Component } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  constructor(private authService: AuthService){}

  onSubmit(event: Event, username: string, password: string)
  {
    event.preventDefault();
    this.authService.SignIn(username, password);
  }
}
