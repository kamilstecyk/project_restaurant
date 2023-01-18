import { Component } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.sass']
})
export class ForgotPasswordComponent {
  constructor(private authService: AuthService) { }

  onSubmit(event: Event, username: string)
  {
    this.authService.ForgotPassword(username);
  }
}
