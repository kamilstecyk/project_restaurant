import { Component } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent {
  currently_all_ordered_dishes_count_subscription: any;
  current_number_of_ordered_dishes = 0;

  constructor(private shopping_cart_service: ShoppingCartService)
  {
    this.currently_all_ordered_dishes_count_subscription = shopping_cart_service.getAllCurrenlyOrderedDishesCount().subscribe((value)=>
    {
      this.current_number_of_ordered_dishes = value as number;
    }
    );
  }

  ngOnDestroy()
  {
    this.currently_all_ordered_dishes_count_subscription.unsubscribe();
  }
}
