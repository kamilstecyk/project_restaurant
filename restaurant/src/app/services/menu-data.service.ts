import { Injectable } from '@angular/core';
import { Subject,BehaviorSubject, ReplaySubject } from 'rxjs';
import { dishes, Dish } from '../dishes';

@Injectable({
  providedIn: 'root'
})
export class MenuDataService {

  private menu_dishes: Array<Dish> = dishes;
  private current_menu_dishes = new ReplaySubject(1);

  // filtering data
  private types_of_cuisine: Array<string> = []
  private max_price: number = -10000;
  private min_price: number = 10000;
  private categories_of_dishes: Array<string> = []

  constructor() 
  {
    this.getCuisineTypes();
    this.getMaxAndMinPrice();
    this.getCategories();

    this.current_menu_dishes.next(this.menu_dishes);
    console.log(this.menu_dishes);
  }

  private getCuisineTypes()
  {
    this.menu_dishes.forEach( dish => 
      {
        if(!this.types_of_cuisine.includes(dish.cuisine_type))
        {
          this.types_of_cuisine.push(dish.cuisine_type);
        }
      } );
  }

  private getMaxAndMinPrice()
  {
    this.menu_dishes.forEach( dish => 
      {
        
        if(dish.price > this.max_price)
        {
          this.max_price = dish.price;
        }

        if(dish.price < this.min_price )
        {
          this.min_price = dish.price;
        }

      } );

      console.log("max: " + this.max_price);
      console.log("min: " + this.min_price);
  }

  private getCategories()
  {
    this.menu_dishes.forEach( dish => 
      {
        if(!this.categories_of_dishes.includes(dish.category))
        {
          this.categories_of_dishes.push(dish.category);
        }
      } );

      console.log(this.categories_of_dishes);
  }

  public getTypesCuisine()
  {
    return this.types_of_cuisine;
  }

  public getDishesCategories()
  {
    return this.categories_of_dishes;
  }

  public getMaxDishPrice()
  {
    return this.max_price;
  }
  
  public getMinDishPrice()
  {
    return this.min_price;
  }

  getDishes()
  {
    return this.current_menu_dishes.asObservable();
  }

  getAllDishes()
  {
    return this.menu_dishes;
  }

  removeDishFromMenu(dish_to_delete: Dish)
  {
    this.menu_dishes.forEach( (item, index) => {
      if(item === dish_to_delete) 
      {
        this.menu_dishes.splice(index,1);
        console.log("Usunieto!");
      }
    });

    this.current_menu_dishes.next(this.menu_dishes);
  }

  addDishToMenu(dish_to_add: Dish)
  {
    this.menu_dishes.push(dish_to_add);
    console.log("Dishes all: ");
    console.log(this.menu_dishes);
    this.current_menu_dishes.next(this.menu_dishes);
  }

  getLastId() 
  {
    if(this.menu_dishes.length > 0)
    {
      return this.menu_dishes[this.menu_dishes.length-1].id;
    }

    return -1;
  }

  getDishWithId(id: number):Dish | null
  {
      for(var dish of dishes)
      {
        if(dish.id === id )
        {
          return dish as Dish;
        }
      }
      
      return null;
  }

}
