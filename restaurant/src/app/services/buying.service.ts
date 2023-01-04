import { Injectable } from '@angular/core';
import { DishRecord } from './shopping-cart.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

export interface HistoryRecord
{
  dish_info: DishRecord
  date: string
}

@Injectable({
  providedIn: 'root'
})
export class BuyingService {
  private dbPath = '/orders_history';
  ordersHistoryRef: AngularFireList<HistoryRecord>;

  constructor(private db_service: AngularFireDatabase) 
  {
    this.ordersHistoryRef = db_service.list(this.dbPath);
  }

  buyDishes(ordered_dishes:DishRecord[], date_of_order: string)
  { 
    ordered_dishes.forEach((record)=>
    {
      this.ordersHistoryRef.push({dish_info: record, date: date_of_order});
    });
  }

  getOrdersHistory(): AngularFireList<HistoryRecord>
  {
    return this.ordersHistoryRef;
  }
}
