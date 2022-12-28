import { Injectable } from '@angular/core';
import {  ReplaySubject, BehaviorSubject } from 'rxjs';
import { Dish } from '../dishes';

export interface DishRecord 
{
  dish: Dish;
  ordered_amount: number
} 

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private ordered_dishes: DishRecord[] = []; 
  private dishes_in_shopping_cart = new ReplaySubject(1); // we only need last emmitted value when we aare not subscribed

  constructor() { }

  increaseDishOrder(dish: Dish)
  {
    if(this.ordered_dishes.length == 0)
    {
      this.ordered_dishes.push({dish: dish, ordered_amount: 1});
    }
    else 
    {
      var founded= false;

      this.ordered_dishes.forEach( record => 
        {
          if(record.dish.id == dish.id)
          {
            ++record.ordered_amount;
            founded = true;
          }
        } )

        if(founded == false)
        {
          this.ordered_dishes.push({dish: dish, ordered_amount: 1});
        }
    }

    console.log(this.ordered_dishes);
    this.dishes_in_shopping_cart.next(this.ordered_dishes);
  }

  decreaseDishOrder(dish: Dish)
  {
    if(this.ordered_dishes.length > 0)
    {
      this.ordered_dishes.forEach((record,index) => 
        {
          if(record.dish.id == dish.id)
          {
            --record.ordered_amount;
            if(record.ordered_amount < 1)
            {
              this.ordered_dishes.splice(index, 1);
            }
          }
        })
    }
    console.log(this.ordered_dishes);
    this.dishes_in_shopping_cart.next(this.ordered_dishes);
  }

  getDishesInShoppingCart()
  {
    return this.dishes_in_shopping_cart;
  }

  removeFromCartIfThisDishHasBeenRemovedFromMenu(dish:Dish)
  {
    if(this.ordered_dishes.length > 0)
    {
      this.ordered_dishes.forEach((record,index) => 
        {
          if(record.dish.id === dish.id)
          {
            this.ordered_dishes.splice(index, 1);
          }
        })
    }
    this.dishes_in_shopping_cart.next(this.ordered_dishes);
  }
}
