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
  private currently_all_ordered_dishes = new ReplaySubject(1);

  constructor(){}

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
    this.currently_all_ordered_dishes.next(this.getAllOrdersCount());
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
    this.currently_all_ordered_dishes.next(this.getAllOrdersCount());
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
    this.currently_all_ordered_dishes.next(this.getAllOrdersCount());
  }

  getDishAvailableCountFromId(id: number)
:number  {
    for(var record of this.ordered_dishes)
    {
      if(record.dish.id == id)
      {
        console.log(record.dish.available_count - record.ordered_amount +  " passing value");
        console.log("hellllllo")
        return record.dish.available_count - record.ordered_amount;
      }
    }

    return -1;
  }

  getHowManyOrderedFromId(id: number):number
  {
    for(var record of this.ordered_dishes)
    {
      if(record.dish.id == id)
      {
        return record.ordered_amount;
      }
    }

    return 0;
  }

  deleteFromShoppingCartDish(id:number)
  {
    this.ordered_dishes.forEach((record,index)=>
    {
      if(record.dish.id == id)
      {
        this.ordered_dishes.splice(index,1);
        this.dishes_in_shopping_cart.next(this.ordered_dishes);
        this.currently_all_ordered_dishes.next(this.getAllOrdersCount());
        console.log("Removed from cart")
        console.log(this.ordered_dishes);
      }
    });
  }

  private getAllOrdersCount()
  {
    return this.ordered_dishes.reduce(
      (accumulator, currentValue) => accumulator + currentValue.ordered_amount, 0);
  }

  resetShoppingCart()
  {
    this.ordered_dishes.splice(0);
    this.dishes_in_shopping_cart.next(this.ordered_dishes);
    this.currently_all_ordered_dishes.next(this.getAllOrdersCount());
  }

  getAllCurrenlyOrderedDishesCount()
  {
    return this.currently_all_ordered_dishes;
  }
}
