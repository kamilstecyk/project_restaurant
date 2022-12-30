import { Injectable } from '@angular/core';
import { DishRecord } from './shopping-cart.service';

export interface HistoryRecord
{
  dish_info: DishRecord
  date: string
}

@Injectable({
  providedIn: 'root'
})
export class BuyingService {
  order_history: HistoryRecord[] = [];

  constructor() {}

  buyDishes(ordered_dishes:DishRecord[], date_of_order: string)
  { 
    ordered_dishes.forEach((record)=>
    {
      this.order_history.push({dish_info: record, date: date_of_order});
    });

    console.log(this.order_history);
  }

  getWholeOrdersHistory()
  {
    return this.order_history;
  }
}
