import { Injectable } from '@angular/core';
import { dishes, Dish } from '../dishes';

@Injectable({
  providedIn: 'root'
})
export class MenuDataService {

  menu_dishes: Array<Dish> = dishes;

  constructor() {}

  getDishes()
  {
    return this.menu_dishes;
  }

  removeDishFromMenu(dish_to_delete: Dish)
  {
    this.menu_dishes.forEach( (item, index) => {
      if(item === dish_to_delete) this.menu_dishes.splice(index,1);
    });
  }

  addDishToMenu(dish_to_add: Dish)
  {
    this.menu_dishes.push(dish_to_add);
    console.log("Dishes all: ");
    console.log(this.menu_dishes);
  }

  getLastId() 
  {
    if(this.menu_dishes.length > 0)
    {
      return this.menu_dishes[this.menu_dishes.length-1].id;
    }

    return -1;
  }

}
