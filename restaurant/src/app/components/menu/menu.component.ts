import { Component } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/services/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent {
  currently_all_ordered_dishes_count_subscription: any;

  currently_logged_user_mail: string | null;

  current_number_of_ordered_dishes = 0;

  constructor(private shopping_cart_service: ShoppingCartService, public authService: AuthService, private fbAuthService: AngularFireAuth)
  {
      this.currently_all_ordered_dishes_count_subscription = shopping_cart_service.getAllCurrenlyOrderedDishesCount().subscribe((value)=>
      {
        this.current_number_of_ordered_dishes = value as number;
      }
      );

      this.fbAuthService.authState.subscribe((user) => 
      {
        if(user)
        {
          this.currently_logged_user_mail = user.email;
        }
      });

  }

  ngOnDestroy()
  {
    if(this.currently_all_ordered_dishes_count_subscription)
    {
      this.currently_all_ordered_dishes_count_subscription.unsubscribe();
    }
  }
}
