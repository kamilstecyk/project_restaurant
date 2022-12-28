import { Component } from '@angular/core';
import { ShoppingCartService, DishRecord } from 'src/app/services/shopping-cart.service';
import { PriceTransformingService } from 'src/app/services/price-transforming.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.sass']
})

export class ShoppingCartComponent {
  is_shopping_cart_extended = false;
  ordered_dishes_subscription: any;
  ordered_dishes: DishRecord[] = []
  full_cost_of_order = 0;

  constructor(private shopping_cart_service: ShoppingCartService,public price_transforming_service: PriceTransformingService)
  {
    this.ordered_dishes_subscription = shopping_cart_service.getDishesInShoppingCart().subscribe((value)=>
    {
      this.ordered_dishes = Object.assign([], value) as DishRecord[];
      let total = this.ordered_dishes.reduce((accumulator, currentValue) => accumulator + (currentValue.dish.price * currentValue.ordered_amount), 0);
      console.log("Cost of order: " + total + " PLN");
      this.full_cost_of_order = price_transforming_service.getPriceInUSD(total);
    });
  }

  handleExtendingBtn()
  {
    this.is_shopping_cart_extended = !this.is_shopping_cart_extended;
  }

  ngOnDestroy() {
    //prevent memory leak when component destroyed
    this.ordered_dishes_subscription.unsubscribe();
   }
}
