import { Injectable } from '@angular/core';
import { DishRecord } from './shopping-cart.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';

export interface HistoryRecord
{
  dish_info: DishRecord
  date: string
  uid?: string
}

@Injectable({
  providedIn: 'root'
})
export class BuyingService {
  private dbPath = '/orders_history';
  ordersHistoryRef: AngularFireList<HistoryRecord>;
  uid: string | undefined = undefined;

  constructor(private db_service: AngularFireDatabase, private fbAuthService: AngularFireAuth) 
  {
    this.ordersHistoryRef = db_service.list(this.dbPath);

    this.fbAuthService.authState.subscribe((user) => {
      if(user)
      {
        this.uid =user.uid;
      }
      else 
      {
        this.uid = undefined;
      }
    });
  }

  buyDishes(ordered_dishes:DishRecord[], date_of_order: string)
  { 
    if(this.uid)
    {
      ordered_dishes.forEach((record)=>
      {
        this.ordersHistoryRef.push({dish_info: record, date: date_of_order, uid: this.uid});
      });
    }
  }

  getOrdersHistory(): AngularFireList<HistoryRecord>
  {
    return this.ordersHistoryRef;
  }
}
