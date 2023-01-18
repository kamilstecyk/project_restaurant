import { Component } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent {
  constructor(private authService: AuthService){}

  onSubmit(event: Event, username: string, password: string)
  {
    event.preventDefault();
    this.authService.SignUp(username, password);
  }
}
